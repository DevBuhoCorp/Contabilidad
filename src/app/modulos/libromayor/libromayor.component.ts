import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { LibroMayorService } from './libromayor.service';
import { AppLoaderService } from '../../shared/servicios/app-loader/app-loader.service';
import { AppConfirmService } from '../../shared/servicios/app-confirm/app-confirm.service';
import { PopupLibroMayor } from './popup/popup.component';


@Component({
  selector: 'app-libromayor',
  templateUrl: './libromayor.component.html',
  styles: []
})
export class LibromayorComponent implements OnInit, OnDestroy {
  
  public items: any[];
  public getItemSub: Subscription;
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: LibroMayorService,
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
    try {
      this.getItemSub = this.crudService.getItems()
        .subscribe(data => {
          this.items = data;
        })
    }
    catch{ }
  }
  openPopUp(data: any = {}, isNew?) {
    let title = isNew ? 'Agregar' : 'Actualizar';
    let dialogRef: MatDialogRef<any> = this.dialog.open(PopupLibroMayor, {
      width: '850px',
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