import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TreeNode } from 'primeng/components/common/api';
import { CrudService } from '../../../../shared/servicios/crud.service';

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
  filesTree0: any = [{
    data:[]
  }];
  selectedFile: TreeNode;

  constructor(private _activateRoute: ActivatedRoute,
    private crudService: CrudService) {
    this._activateRoute.params.subscribe(async params => {
      this.filesTree0 = await this.crudService.SeleccionarAsync('plancontable', { Modelo: params['id'] });
      this.filesTree0[0].data = await JSON.parse(this.filesTree0[0].data);
    });
  }

  ngOnInit() {

  }
  expandAll() {
    this.filesTree0[0].data.forEach(node => {
      this.expandRecursive(node, true);
    });
  }

  collapseAll($Etiqueta) {
    $Etiqueta.scrollIntoView();
    this.filesTree0[0].data.forEach(node => {
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
