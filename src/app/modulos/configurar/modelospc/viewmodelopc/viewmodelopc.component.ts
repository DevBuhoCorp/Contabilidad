import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TreeNode} from 'primeng/components/common/api';
import {CrudService} from '../../../../shared/servicios/crud.service';

@Component({
  selector: 'app-viewmodelopc',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './viewmodelopc.component.html',
  styleUrls: [
    './viewmodelopc.component.css',
  ]
})
export class ViewmodelopcComponent implements OnInit {
  datos: any = {};
  filesTree0: TreeNode[];
  data: TreeNode[];

  constructor(private _activateRoute: ActivatedRoute,
              private crudService: CrudService) {
    this._activateRoute.params.subscribe(params => {

      this.crudService.Seleccionar('plancontable', {Modelo: params['id']})
        .map((response) => {
          return response.json();
        }).toPromise().then(x => {
        this.data = JSON.parse(x[0].data) as TreeNode[];
        this.filesTree0 = this.data.slice(0);
      });

    });
  }

  ngOnInit() {}

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
