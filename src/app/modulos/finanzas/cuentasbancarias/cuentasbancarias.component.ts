import {Component, OnInit, OnDestroy} from '@angular/core';
import {MatDialogRef, MatDialog, MatSnackBar} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';
import {AppLoaderService} from '../../../shared/servicios/app-loader/app-loader.service';
import {AppConfirmService} from '../../../shared/servicios/app-confirm/app-confirm.service';
import {PopupComponentCB} from './popup/popup.component';
import {CrudService} from '../../../shared/servicios/crud.service';
import { ToolsService } from '../../../shared/servicios/tools.service';

@Component({
  selector: 'app-cuentasbancarias',
  templateUrl: './cuentasbancarias.component.html',
  styles: []
})
export class CuentasbancariasComponent implements OnInit, OnDestroy {
  pageSize = this.toolsService.getPaginas(); 
  selPageSize: any = this.pageSize[0];
  selEmpresa : any;
  items: any = {
    data: [],
    page: 1,
    total: 0,
    per_page: 0
  };
  empresas: any;


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
    this.empresas =  this.crudService.SeleccionarAsync('comboempresa');
  }

  ngOnDestroy() {

  }

  async getItems(indice = 1) {
    this.items = await this.crudService.SeleccionarAsync('cuentabancaria', { page: indice, psize: this.selPageSize, empresa: this.selEmpresa });
    this.items.data = this.crudService.SetBool(this.items.data);
  }

  openPopUp(data: any = {}, isNew?) {

    let title = isNew ? 'Agregar' : 'Actualizar';
    let dialogRef: MatDialogRef<any> = this.dialog.open(PopupComponentCB, {
      width: '720px',
      disableClose: true,
      data: {title: title, payload: data}
    });
    dialogRef.afterClosed()
      .subscribe(response => {
        if (!response) {
          return;
        }
        this.loader.open();
        if (isNew) {
          response.IDEmpresa = this.selEmpresa;
          console.log(response);
          this.crudService.Insertar(response, 'cuentabancaria/')
            .subscribe(data => {
              this.getItems();
              this.loader.close();
              this.snack.open('Agregado!', 'OK', { duration: 4000 })
            });
        } else {
          this.crudService.Actualizar(data.ID, response, 'cuentabancaria/')
            .subscribe(data => {
              this.getItems();
              this.loader.close();
              this.snack.open('Actualizado!', 'OK', { duration: 4000 })
            });
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

  async setPage(event) {
    this.getItems(event.offset + 1);
  }
}
