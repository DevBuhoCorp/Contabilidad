import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { AppLoaderService } from '../../../../shared/servicios/app-loader/app-loader.service';
import { AppConfirmService } from '../../../../shared/servicios/app-confirm/app-confirm.service';
import { GPersonalizadoService } from '../grupospersonalizados.service';
import { PopupComponentGP } from '../popup/popup.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: []
})
export class ListaComponent implements OnInit, OnDestroy {
  selectedValueG: string = '';
  selectedValueC: string = '';
  Grupos = [
    { value: 1, viewValue: 'Ingresos de productos / servicios (Ejemplo: 7xxxxx)' },
    { value: 2, viewValue: 'Gastos de productos / servicios (Ejemplo: 6xxxxx)' },
  ];
  Cuentas = [
    { value: 1, viewValue: '1. (ACTIVO)' },
    { value: 2, viewValue: '1.01. (ACTIVO CORRIENTE)' },
    { value: 3, viewValue: '1.01.01. (EFECTIVO Y EQUIVALENTES AL EFECTIVO)' }, 
    { value: 4, viewValue: '1.01.02. (ACTIVOS FINANCIEROS)' },
    { value: 5, viewValue: '1.01.02.01 (ACTIVOS FINANCIEROS A VALOR RAZONABLE CON CAMBIOS EN RESULTADOS)' },
    { value: 6, viewValue: '1.01.02.02 (ACTIVOS FINANCIEROS DISPONIBLES PARA LA VENTA)' },
  ];
  public items: any[];
  public getItemSub: Subscription;
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: GPersonalizadoService,
    private loader: AppLoaderService,
    private confirmService: AppConfirmService,
  ) { }

  ngOnInit() {
    this.getItems()
  }
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe()
    }
  }
  getItems() {
    this.getItemSub = this.crudService.getItems()
      .subscribe(data => {
        this.items = data;
      })
  }
  openPopUp(data: any = {}, isNew?) {
    let title = isNew ? 'Agregar' : 'Actualizar';
    let dialogRef: MatDialogRef<any> = this.dialog.open(PopupComponentGP, {
      width: 'auto',
      height: 'auto',
      disableClose: true,
      data: { title: title, payload: data }
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          // If user press cancel
          return;
        }
        this.loader.open();
        if (isNew) {
          this.crudService.addItem(res)
            .subscribe(data => {
              this.items = data;
              this.loader.close();
              this.snack.open('Agregado!', 'OK', { duration: 4000 })
            })
        } else {
          this.crudService.updateItem(data.ID, res)
            .subscribe(data => {
              this.items = data;
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
          this.crudService.removeItem(row)
            .subscribe(data => {
              this.items = data;
              this.loader.close();
              this.snack.open('Eliminado!', 'OK', { duration: 4000 })
            })
        }
      })
  }
}
