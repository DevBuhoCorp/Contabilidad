import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TreeNode} from 'primeng/components/common/api';
import {CrudService} from '../../shared/servicios/crud.service';
import {getMatFormFieldMissingControlError} from '@angular/material';
import {ToolsService} from '../../shared/servicios/tools.service';

@Component({
  selector: 'app-mayor',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './mayor.component.html',
  styleUrls: [
    './mayor.component.css',
  ]
})
export class MayorComponent implements OnInit {
  datos: any = {};
  filesTree0: TreeNode[];
  data: TreeNode[];

  // filesTree0: any = [{
  //   data: []
  // }];
  selectedFile: TreeNode;

  constructor(private crudService: CrudService, private toolsService: ToolsService) {
  }

  ngOnInit() {
    this.getItems();
  }

  async getItems() {
    this.crudService.Seleccionar('plancontable', {Empresa: this.toolsService.getEmpresaActive().IDEmpresa})
      .map((response) => {
        return response.json();
      }).toPromise().then(x => {
      this.data = JSON.parse(x[0].data) as TreeNode[];
      this.filesTree0 = this.data.slice(0);
    });
    // this.filesTree0[0].data = await JSON.parse(this.filesTree0[0].data);
  }

  nodeSelect(event) {
  }


  onKeydown(text) {
    text = text.target.value.toLowerCase();
    if (text != '')
      this.filesTree0 = this.filterData(this.data, function (subject) {
        return subject.label.toLowerCase().includes(text);
      });
    else {
      this.filesTree0 = this.data.slice(0);
      this.collapseAll();
    }
  }

  filterData(data, predicate) {

    // if no data is sent in, return null, otherwise transform the data
    return !!!data ? null : data.reduce((list, entry) => {

      let clone = null;
      if (predicate(entry)) {
        // if the object matches the filter, clone it as it is
        clone = Object.assign({}, entry);
      }
      if (entry.children != null) {
        // if the object has childrens, filter the list of children
        let children = this.filterData(entry.children, predicate);
        if (children.length > 0) {
          // if any of the children matches, clone the parent object, overwrite
          // the children list with the filtered list
          clone = Object.assign({}, entry, {children: children});
          clone.expanded = true;
        }
      }

      // if there's a cloned object, push it to the output list
      clone && list.push(clone);
      return list;
    }, []);

  }


  expandAll() {
    this.filesTree0.forEach(node => {
      this.expandRecursive(node, true);
    });
  }

  collapseAll() {

    this.filesTree0.forEach(node => {
      this.expandRecursive(node, false);
    });
  }

  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach(childNode => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }

}
