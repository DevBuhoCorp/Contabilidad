import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CrudService} from '../../../shared/servicios/crud.service';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {AppLoaderService} from '../../../shared/servicios/app-loader/app-loader.service';
import {PopupComponentEstacion} from './popup/popup.component';
import {AppConfirmService} from '../../../shared/servicios/app-confirm/app-confirm.service';
import {TokenComponent} from './token/token.component';
import { ToolsService } from '../../../shared/servicios/tools.service';

@Component({
  selector: 'app-estacion',
  templateUrl: './estacion.component.html',
  styles: []
})
export class EstacionComponent implements OnInit {

  pageSize = this.toolsService.getPaginas(); 
  selPageSize: any = this.pageSize[0];
  app: any;
  estacions: any = {
    data: [],
    page: 1,
    total: 0,
    per_page: 0
  };

  constructor(
    private router: ActivatedRoute,
    private crudService: CrudService,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private loader: AppLoaderService,
    private confirmService: AppConfirmService,
    private toolsService: ToolsService
  ) {
  }

  async ngOnInit() {
    this.router.params.subscribe((data) => {
      this.app = data.app;
    });
    this.app = await this.crudService.SeleccionarAsync('aplicacion/' + this.app);
    this.getItems();
  }

  async getItems(indice = 1) {
    this.estacions = await this.crudService.SeleccionarAsync('estacion', { app: this.app.ID, page: indice, psize: this.selPageSize});
    // this.estacions.data = this.crudService.SetBool(this.estacions.data);
  }

  openPopUp(data: any = {}, isNew?) {
    let title = isNew ? 'Agregar' : 'Actualizar';
    let dialogRef: MatDialogRef<any> = this.dialog.open(PopupComponentEstacion, {
      width: '420px',
      disableClose: true,
      data: {title: title, payload: data}
    });
    dialogRef.afterClosed().subscribe(response => {
      if (!response)
        return;
      this.loader.open();
      if (isNew) {
        response.IDAplicacion = this.app.ID;
        this.crudService.Insertar(response, 'estacion/').subscribe(data => {
          this.getItems();
          this.loader.close();
          this.snack.open('Agregado!', 'OK', {duration: 4000});
        });
      }
      else {
        this.crudService.Actualizar(data.ID, response, 'estacion/')
          .subscribe(response2 => {
            this.getItems();
            this.loader.close();
            this.snack.open('Actualizado!', 'OK', {duration: 4000});
          });
      }

    });
  }

  deleteItem(item) {
    this.confirmService.confirm({message: `Eliminar ${item.Nmaquina}?`})
      .subscribe(res => {
        if (res) {
          this.loader.open();
          this.crudService.Eliminar(item.ID, 'estacion/').subscribe(data => {
            this.getItems();
            this.loader.close();
            this.snack.open('Eliminado!', 'OK', {duration: 4000});
          });
        }
      });
  }

  async viewToken( item ){
    let dialogRef: MatDialogRef<any> = this.dialog.open(TokenComponent, {
      width: '720px',
      // disableClose: true,
      data: item.Token
    });
  }

  async setPage(event) {
    this.getItems(event.offset + 1);
  }

}
