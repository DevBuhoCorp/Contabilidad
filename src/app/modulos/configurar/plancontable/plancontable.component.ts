import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';import { TreeNode } from 'primeng/components/common/api';

import { TreeDragDropService } from 'primeng/api';

import { PopupComponentPC } from './popup/popup.component';
import { AppLoaderService } from '../../../shared/servicios/app-loader/app-loader.service';
import { AppConfirmService } from '../../../shared/servicios/app-confirm/app-confirm.service';
import { CrudService } from '../../../shared/servicios/crud.service';

import { HttpClient } from '@angular/common/http';
import { ExcelService } from '../../../shared/servicios/excel.service';

@Component({
  selector: 'app-plancontable', 
  encapsulation: ViewEncapsulation.None,
  templateUrl: './plancontable.component.html',
  styleUrls: [
    './plancontable.component.css',
  ],
  providers: [
    TreeDragDropService
  ]
})
export class PlancontableComponent implements OnInit, OnDestroy {
  selEmpresa: any;
  empresas: any;


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
    private loader: AppLoaderService,
    private confirmService: AppConfirmService,
    private excelService: ExcelService,
  ) { }

  async loadModelos() {
    this.Modelos = await this.crudService.SeleccionarAsync("combomodelo", { IDEmpresa: this.selEmpresa });
    this.filesTree0 = null;
  }

  ngOnInit() {
    this.empresas = this.crudService.SeleccionarAsync(`usuario/empresa`);
  }

  CargarPlan() {
    this.crudService.Seleccionar('plancontable', { Modelo: this.selectedValue }).map((response) => {
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

  async openPopUp(data: any = {}, isNew?) {
    let title = isNew ? 'Agregar' : 'Actualizar';
    if (!isNew) {
      data.promise = await this.crudService.SeleccionarAsync("cuentacontable/" + data.data);
    }
    else if (!data.data) {
      data.promise = null;
      data.promise2 = await this.crudService.SeleccionarAsync("cuentapadre", { Modelo: this.selectedValue });
    }
    else {
      data.promise = null;
      data.promise2 = await this.crudService.SeleccionarAsync("numerocuenta", { padre: data.data, plancontable: this.selectedValue });
    }
    let dialogRef: MatDialogRef<any> = this.dialog.open(PopupComponentPC, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: data, PlanContable: this.selectedValue }
    });
    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          data.payload = []; 
          return;
        }
        this.loader.open();
        if (isNew) {
          this.crudService.Insertar(res, 'cuentacontable/').subscribe(data => {
            this.CargarPlan();
            this.loader.close();
            this.snack.open('Agregado!', 'OK', { duration: 4000 });
            //this.selectedFile = null;
            this.selectedFile_2 = null;
          });
        } else {
          this.crudService.Actualizar(data.data, res, 'cuentacontable/').subscribe(data => {
            this.CargarPlan();
            this.loader.close();
            this.snack.open('Actualizado!', 'OK', { duration: 4000 });
            this.selectedFile = undefined;
            this.selectedFile_2 = undefined;
          });
        }
      });
  }

  deleteItem(row) {
    this.confirmService.confirm({ message: `Eliminar ${row.Etiqueta}?` })
      .subscribe(res => {
        if (res) {
          this.loader.open();
          this.crudService.Eliminar(row.ID, 'modeloplancontable/').subscribe(data => {
            // this.getItems("All", 0);
            this.loader.close();
            this.snack.open('Eliminado!', 'OK', { duration: 4000 });
          });
        }
      });

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

  async onNDrop(event) {
    this.res = {};
    let cuenta = await this.crudService.SeleccionarAsync("numerocuenta", { padre: event.dropNode.data, plancontable: this.selectedValue });
    this.res.Estado = "ACT";
    this.res.Etiqueta = event.dragNode.label;
    this.res.IDDiario = event.dropNode.diario;
    this.res.IDGrupoCuenta = 2;
    this.res.IDPadre = event.dropNode.data;
    this.res.IDPlanContable = this.selectedValue;
    this.res.NumeroCuenta = event.dropNode.numerocuenta + '.' + cuenta[0].ncuenta;
    this.crudService.Insertar(this.res, 'cuentacontable/').subscribe(data => {
      this.CargarPlan();
      this.loader.close();
      this.snack.open('Agregado!', 'OK', { duration: 4000 });
    });

  }

  expandAll() {
    this.filesTree0.forEach(node => {
      this.expandRecursive(node, true);
    });
  }

  collapseAll($Etiqueta) {
    window.scrollTo(0, 0);
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



