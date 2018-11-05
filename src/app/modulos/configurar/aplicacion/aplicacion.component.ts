import { Component, OnInit } from '@angular/core';
import {CrudService} from '../../../shared/servicios/crud.service';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import { PopupComponentAplicacion } from '../aplicacion/popup/popup.component';
import {AppLoaderService} from '../../../shared/servicios/app-loader/app-loader.service';
import {AppConfirmService} from '../../../shared/servicios/app-confirm/app-confirm.service';
import {Router} from '@angular/router';
import { ToolsService } from '../../../shared/servicios/tools.service';

@Component({
  selector: 'app-aplicacion',
  templateUrl: './aplicacion.component.html',
  styles: []
})
export class AplicacionComponent implements OnInit {
 
  pageSize = this.toolsService.getPaginas(); 
  empresas : any;
  selEmpresa : any;
  selPageSize : any = this.pageSize[0];
  paginate: any={
    data: [],
    page: 1,
    total: 0,
    per_page: 0
  };

  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService : CrudService,
    private loader: AppLoaderService,
    private confirmService: AppConfirmService,
    private router:Router,
    private toolsService: ToolsService,
  ) { }

  ngOnInit() {
    this.empresas =  this.crudService.SeleccionarAsync('comboempresa');
  }

  async loadApp(){
    this.paginate = await this.crudService.SeleccionarAsync('aplicacion', { page: 1 , empresa : this.selEmpresa, psize: this.selPageSize });
  }

  async setPage(event){
    this.paginate = await this.crudService.SeleccionarAsync('aplicacion', { page: event.offset + 1 , empresa : this.selEmpresa, psize: this.selPageSize });
  }

  deleteItem(item){
    this.confirmService.confirm({ message: `Eliminar ${ item.Descripcion }?` })
      .subscribe(res => {
        if (res) {
          this.loader.open();
          this.crudService.Eliminar(item.ID, 'aplicacion/').subscribe(data => {
            this.loadApp();
            this.loader.close();
            this.snack.open('Eliminado!', 'OK', { duration: 4000 });
          });
        }
      });
  }

  async openPopUp(data: any = {}, isNew?){
    let title = isNew ? 'Agregar' : 'Actualizar';
    let dialogRef: MatDialogRef<any> = this.dialog.open(PopupComponentAplicacion, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: data }
    });

    dialogRef.afterClosed().subscribe(response => {
      if(!response)
        return;

      this.loader.open();
      if(isNew){
        response.IDEmpresa = this.selEmpresa;
        this.crudService.Insertar(response, 'aplicacion/').subscribe(data => {
          this.loadApp();
          this.loader.close();
          this.snack.open('Agregado!', 'OK', { duration: 4000 });
        });
      }
      else{
        this.crudService.Actualizar(data.ID, response, 'aplicacion/')
          .subscribe(response2 => {
            this.loadApp();
            this.loader.close();
            this.snack.open('Actualizado!', 'OK', {duration: 4000});
          });
      }
    });
  }

}
