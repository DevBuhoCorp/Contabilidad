import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { PopupComponentDC } from './popup/popup.component';
import { AppLoaderService } from '../../../shared/servicios/app-loader/app-loader.service';
import { AppConfirmService } from '../../../shared/servicios/app-confirm/app-confirm.service';
import { DiarioContable } from './diarioscontables.model';
import { CrudService } from '../../../shared/servicios/crud.service';

@Component({
  selector: 'app-diarioscontables',
  templateUrl: './diarioscontables.component.html',
  styles: []
})
export class DiarioscontablesComponent implements OnInit, OnDestroy {
  public items: any[];
  public getItemSub: any;
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: CrudService,
    private loader: AppLoaderService,
    private confirmService: AppConfirmService,
  ) { }

  ngOnInit() {
    this.getItems("All", 0)
  }
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe()
    }
  }
  getItems(opt, id) {
    this.crudService.ListarDatos("diarios", opt, id).map((response) => {
      return response.json() as DiarioContable[];
    }).toPromise().then(x => {
      this.items = x;
      let index = 0;
      for (let i of this.items) {
        
        if (i.Estado == 'ACT') {
          this.items[index].Estado = true;
        }
        else{
          this.items[index].Estado = false;
        }
        index++;
      }
    })

  }
  openPopUp(data: any = {}, isNew?) {

    let title = isNew ? 'Agregar' : 'Actualizar';

    let dialogRef: MatDialogRef<any> = this.dialog.open(PopupComponentDC, {
      width: '720px',
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
          this.crudService.Insertar(res, "diarios/").subscribe(data => {
            this.getItems("All", 0);
            this.loader.close();
            this.snack.open('Agregado!', 'OK', { duration: 4000 })
          })
        } else {
          this.crudService.Actualizar(data.ID, res, "diarios/").subscribe(data => {
            this.getItems("All", 0);
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
          this.crudService.Eliminar(row.ID, "diarios/").subscribe(data => {
            this.getItems("All", 0);
            this.loader.close();
            this.snack.open('Eliminado!', 'OK', { duration: 4000 })
          })
        }
      })

  }


}