import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { TreeNode } from 'primeng/components/common/api';
import { TreeDragDropService } from 'primeng/api';

import { CrudService } from '../../shared/servicios/crud.service';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mayor',
  templateUrl: './mayor.component.html',
  styles: []
})
export class MayorComponent implements OnInit {
  selectedValue: string = '';
  res: any = {};
  filesTree0: TreeNode[];
  filesDrag: TreeNode[];
  selectedFile: any;
  sNodeDrag: any;
  selectedFile_2: any = undefined;



  list: any = false;

  Modelos: any = [];
  Cuentas: any[];
  public items: any[];
  public getItemSub: Subscription;
  constructor(
    private dialog: MatDialog,
    private httpClient: HttpClient,
    private snack: MatSnackBar,
    private crudService: CrudService,
  ) {
    /* this.crudService.ListarDatos('combomodelo', 'All', 0).map((response) => {
       return response.json() as ModeloPlanContable[];
     }).toPromise().then(x => {
       this.Modelos = x;
     });*/

  }

  async CargarCombo() {
    this.Modelos = await this.crudService.SeleccionarAsync("combomodelo");
  }

  ngOnInit() {
    this.CargarCombo();
  }

  CargarPlan() {
    this.crudService.Seleccionar('plancontable', { id: this.selectedValue }).map((response) => {
      return response.json();
    }).toPromise().then(x => {
      this.filesTree0 = JSON.parse(x[0].data) as TreeNode[];
    });

  }

  loadCuentas() {
    this.list = true;
    this.crudService.Seleccionar('dragcuentacontable', { id: this.selectedValue }).map((response) => {
      return response.json();
    }).toPromise().then(x => {
      this.filesDrag = x as TreeNode[];
    });

  }

  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe();
    }
  }

  
  nodeSelect(event) {
    if (this.selectedFile_2 == null)
      this.selectedFile_2 = this.selectedFile;
    else if (this.selectedFile_2.data == this.selectedFile.data) {
      this.selectedFile_2 = {};
      this.selectedFile = undefined;
    }
    else
      this.selectedFile_2 = this.selectedFile;
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



