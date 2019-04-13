import {Component, OnInit, OnDestroy} from '@angular/core';
import {MatDialogRef, MatDialog, MatSnackBar} from '@angular/material';
import {PopupComponentDC} from './popup/popup.component';
import {AppLoaderService} from '../../../shared/servicios/app-loader/app-loader.service';
import {AppConfirmService} from '../../../shared/servicios/app-confirm/app-confirm.service';
import {CrudService} from '../../../shared/servicios/crud.service';
import {ToolsService} from '../../../shared/servicios/tools.service';

@Component({
  selector: 'app-diarioscontables',
  templateUrl: './diarioscontables.component.html',
  styles: []
})
export class DiarioscontablesComponent implements OnInit {
  pageSize = this.toolsService.getPaginas();
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
    private toolsService: ToolsService
  ) {
  }

  ngOnInit() {
    this.getItems(1);
  }

  async getItems(indice = 0) {
    this.items = await this.crudService.SeleccionarAsync('diarios', {page: indice, psize: this.selPageSize});
    this.items.data = this.crudService.SetBool(this.items.data);
  }

  async openPopUp(data: any = {}, isNew?) {

    let title = isNew ? 'Agregar' : 'Actualizar';
    if (!isNew) {
      data = await this.crudService.SeleccionarAsync('diarios/' + data.ID);
    }
    let dialogRef: MatDialogRef<any> = this.dialog.open(PopupComponentDC, {
      width: '720px',
      disableClose: true,
      data: {title: title, payload: data}
    });
    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          // If user press cancel
          return;
        }
        this.loader.open();
        if (isNew) {
          this.crudService.Insertar(res, 'diarios').subscribe(data => {
            this.getItems(1);
            this.loader.close();
            this.snack.open('Agregado!', 'OK', {duration: 4000});
          });
        } else {
          this.crudService.Actualizar(data[0].ID, res, 'diarios/').subscribe(data => {
            this.getItems(1);
            this.loader.close();
            this.snack.open('Actualizado!', 'OK', {duration: 4000});
          });
        }
      });
  }

  deleteItem(row) {
    this.confirmService.confirm({message: `Eliminar ${row.Etiqueta}?`})
      .subscribe(res => {
        if (res) {
          this.loader.open();
          this.crudService.Eliminar(row.ID, 'diarios/').subscribe(data => {
            this.getItems(1);
            this.loader.close();
            this.snack.open('Eliminado!', 'OK', {duration: 4000});
          });
        }
      });

  }

  setPage(event) {
    this.getItems(event.offset + 1);
  }


}
