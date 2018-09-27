import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { PopupComponentMPC } from './popup/popup.component';
import { AppLoaderService } from '../../../shared/servicios/app-loader/app-loader.service';
import { AppConfirmService } from '../../../shared/servicios/app-confirm/app-confirm.service';
import { CrudService } from '../../../shared/servicios/crud.service';
import { ModeloPlanContable } from './modelopc.model';
import {ViewmodelopcComponent} from './viewmodelopc/viewmodelopc.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modelospc',
  templateUrl: './modelospc.component.html',
  styles: []
})
export class ModelospcComponent implements OnInit {
  pageSize = [3, 5, 10, 20];
  selPageSize: any = this.pageSize[0];
  items: any = {
    data: [],
    page: 1,
    total: 0,
    per_page: 0
  };
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: CrudService,
    private loader: AppLoaderService,
    private confirmService: AppConfirmService,
  ) { }

  ngOnInit() {
    this.getItems(1);
  }
  async getItems(indice) {
    this.items = await this.crudService.SeleccionarAsync("modeloplancontable", { page: indice, psize: this.selPageSize });
    this.items.data = this.crudService.SetBool(this.items.data);
  }
  async openPopUp(data: any = {}, isNew?) {

    const title = isNew ? 'Agregar' : 'Actualizar'; 
    if (!isNew)
    {
      data = await this.crudService.SeleccionarAsync("modeloplancontable/" + data.ID);
    }
    const dialogRef: MatDialogRef<any> = this.dialog.open(PopupComponentMPC, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: data }
    });
    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          // If user press cancel
          return;
        } 
        this.loader.open();
        if (isNew) {
          this.crudService.Insertar(res, 'modeloplancontable/').subscribe(data => {
            this.getItems(1);
            this.loader.close();
            this.snack.open('Agregado!', 'OK', { duration: 4000 });
          })
        } else {
          this.crudService.Actualizar(data.ID, res, 'modeloplancontable/').subscribe(data => {
            this.getItems(1);
            this.loader.close();
            this.snack.open('Actualizado!', 'OK', { duration: 4000 });
          });
        }
      });
  }
  deleteItem(row) {
    this.confirmService.confirm({ message: `Eliminar ${row.Etiqueta}?` })
      .subscribe(res => {
        if (res) {
          this.loader.open();
          this.crudService.Eliminar(row.ID, "modeloplancontable/").subscribe(data => {
            this.getItems(1);
            this.loader.close();
            this.snack.open('Eliminado!', 'OK', { duration: 4000 })
          })
        }
      })

  }

  setPage(event) {
    this.getItems(event.offset + 1);
  } 


}
