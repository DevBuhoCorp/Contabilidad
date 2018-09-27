import {Component, OnInit, OnDestroy} from '@angular/core';
import {MatDialogRef, MatDialog, MatSnackBar} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';
import {AppLoaderService} from '../../../shared/servicios/app-loader/app-loader.service';
import {AppConfirmService} from '../../../shared/servicios/app-confirm/app-confirm.service';
import {PopupComponentCB} from './popup/popup.component';
import {CrudService} from '../../../shared/servicios/crud.service';

@Component({
  selector: 'app-cuentasbancarias',
  templateUrl: './cuentasbancarias.component.html',
  styles: []
})
export class CuentasbancariasComponent implements OnInit, OnDestroy {
  public items: any[];
  public getItemSub: Subscription;

  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: CrudService,
    private loader: AppLoaderService,
    private confirmService: AppConfirmService,
  ) {
  }

  ngOnInit() {
    this.getItems();
  }

  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe();
    }
  }

  getItems() {

  }

  openPopUp(data: any = {}, isNew?) {
    let title = isNew ? 'Agregar' : 'Actualizar';
    let dialogRef: MatDialogRef<any> = this.dialog.open(PopupComponentCB, {
      width: '720px',
      disableClose: true,
      data: {title: title, payload: data}
    });
    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          return;
        }
        console.log(res);
        // this.loader.open();
        if (isNew) {
          // this.crudService.addItem(res)
          //   .subscribe(data => {
          //     this.items = data;
          //     this.loader.close();
          //     this.snack.open('Agregado!', 'OK', { duration: 4000 })
          //   })
        } else {
          // this.crudService.updateItem(data.ID, res)
          //   .subscribe(data => {
          //     this.items = data;
          //     this.loader.close();
          //     this.snack.open('Actualizado!', 'OK', { duration: 4000 })
          //   })
        }
      });
  }

  deleteItem(row) {
    this.confirmService.confirm({message: `Eliminar ${row.Etiqueta}?`})
      .subscribe(res => {
        if (res) {
          this.loader.open();
          // this.crudService.removeItem(row)
          //   .subscribe(data => {
          //     this.items = data;
          //     this.loader.close();
          //     this.snack.open('Eliminado!', 'OK', {duration: 4000});
          //   });
        }
      });
  }
}
