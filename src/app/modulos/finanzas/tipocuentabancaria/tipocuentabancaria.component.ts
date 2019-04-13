import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {CrudService} from '../../../shared/servicios/crud.service';
import {AppLoaderService} from '../../../shared/servicios/app-loader/app-loader.service';
import {AppConfirmService} from '../../../shared/servicios/app-confirm/app-confirm.service';
import {PopupComponentTCBancaria} from './popup/popup.component';
import { ToolsService } from '../../../shared/servicios/tools.service';

@Component({
  selector: 'app-tipocuentabancaria',
  templateUrl: './tipocuentabancaria.component.html',
  styles: []
})
export class TipocuentabancariaComponent implements OnInit {

  pageSize = this.toolsService.getPaginas(); 
  selPageSize: any = this.pageSize[0];
  items: any = {
    data: [],
    page: 1,
    total: 0,
    per_page: 0
  };

  constructor(private dialog: MatDialog,
              private snack: MatSnackBar,
              private crudService: CrudService,
              private loader: AppLoaderService,
              private confirmService: AppConfirmService,
              private toolsService: ToolsService) { }

  ngOnInit() {
    this.getItems(1);
  }

  async getItems(indice = 1) {
    this.items = await this.crudService.SeleccionarAsync('tipocuentabancaria', {page: indice, psize: this.selPageSize});
    this.items.data = this.crudService.SetBool(this.items.data);
  }

  async openPopUp(data: any = {}, isNew?) {
    if (!isNew) {
      data = await this.crudService.SeleccionarAsync('tipocuentabancaria/' + data.ID);
    }
    let title = isNew ? 'Agregar' : 'Actualizar';
    let dialogRef: MatDialogRef<any> = this.dialog.open(PopupComponentTCBancaria, {
      width: '720px',
      disableClose: true,
      data: {title: title, payload: data}
    });
    dialogRef.afterClosed()
      .subscribe(response => {
        if (!response)
          return;

        this.loader.open();
        if (isNew) {
          this.crudService.Insertar(response, 'tipocuentabancaria').subscribe(data => {
            this.getItems(1);
            this.loader.close();
            this.snack.open('Agregado!', 'OK', {duration: 4000});
          });
        }
        else {
          this.crudService.Actualizar(data.ID, response, 'tipocuentabancaria/')
            .subscribe(response2 => {
              this.getItems(1);
              this.loader.close();
              this.snack.open('Actualizado!', 'OK', {duration: 4000});
            });
        }
      });

  }

  deleteItem(item) {
    this.confirmService.confirm({message: `Eliminar ${item.Descripcion}?`})
      .subscribe(res => {
        if (res) {
          this.loader.open();
          this.crudService.Eliminar(item.ID, 'tipocuentabancaria/').subscribe(data => {
            this.getItems(1);
            this.loader.close();
            this.snack.open('Eliminado!', 'OK', {duration: 4000});
          });
        }
      });
  }

  async setPage(event) {
    this.getItems(event.offset + 1);
  }


}
