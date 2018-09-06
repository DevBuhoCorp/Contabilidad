import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { TreeNode } from 'primeng/components/common/api';
import { PopupComponentPC } from './popup/popup.component';
import { AppLoaderService } from '../../../shared/servicios/app-loader/app-loader.service';
import { AppConfirmService } from '../../../shared/servicios/app-confirm/app-confirm.service';
import { CrudService } from '../../../shared/servicios/crud.service';
import { PlanContable } from './plancontable.model';
import { ModeloPlanContable } from '../modelospc/modelopc.model';

@Component({
  selector: 'app-plancontable',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './plancontable.component.html',
  styleUrls: [
    './plancontable.component.css',
  ]
})
export class PlancontableComponent implements OnInit, OnDestroy {
  selectedValue: string = '';
  filesTree0: TreeNode[];
  selectedFile: any;

  Modelos: ModeloPlanContable[];
  Cuentas: any[];
  public items: any[];
  public getItemSub: Subscription;
  Nhijos: any;
  NumeroCuenta: string;
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: CrudService,
    private loader: AppLoaderService,
    private confirmService: AppConfirmService,
  ) {
    this.crudService.ListarDatos("modeloplancontable", "All", 0).map((response) => {
      return response.json() as ModeloPlanContable[];
    }).toPromise().then(x => {
      this.Modelos = x;
    })
  }

  ngOnInit() {

  }
  CargarPlan() {
    this.crudService.ListarDatos('plancontable', 'ALL', this.selectedValue).map((response) => {
      return response.json();
    }).toPromise().then(x => {
      this.filesTree0 = JSON.parse(x[0].data) as TreeNode[];
    });
  }
  CargarHijo() {
    this.crudService.ListarDatos("numerocuenta", this.selectedFile.data, this.selectedValue).map((response) => {
      return response.json();
    }).toPromise().then(x => {
      this.Nhijos = JSON.parse(x[0].data);
      this.NumeroCuenta = this.selectedFile.numerocuenta + "." + this.Nhijos.ncuenta;
      
    })
  }
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe();
    }
  }

  openPopUp(data: any = {}, isNew?) {
   // this.CargarHijo();
    let title = isNew ? 'Agregar' : 'Actualizar';
    /*this.CargarCuenta(data.data);
    console.log(this.Cuentas);*/
    let dialogRef: MatDialogRef<any> = this.dialog.open(PopupComponentPC, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: data, Modelo: this.selectedValue }
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          // If user press cancel
          return;
        }
        this.loader.open();
        if (isNew) {
          this.crudService.Insertar(res, "modeloplancontable/").subscribe(data => {
            // this.getItems("All", 0);
            this.loader.close();
            this.snack.open('Agregado!', 'OK', { duration: 4000 })
          })
        } else {
          this.crudService.Actualizar(data.ID, res, "modeloplancontable/").subscribe(data => {
            //  this.getItems("All", 0);
            this.loader.close();
            this.snack.open('Actualizado!', 'OK', { duration: 4000 })
          })
        }
      })
  }

  deleteItem(row) {
    this.confirmService.confirm({ message: `Eliminar ${row.Etiqueta}?` })
      .subscribe(res => {
        if (res) {
          this.loader.open();
          this.crudService.Eliminar(row.ID, "modeloplancontable/").subscribe(data => {
            // this.getItems("All", 0);
            this.loader.close();
            this.snack.open('Eliminado!', 'OK', { duration: 4000 })
          })
        }
      })

  }
  nodeSelect(event) {
    console.log(event.node);
  }

  nodeUnselect(event) {
    //console.log(event.node);
  }


}



