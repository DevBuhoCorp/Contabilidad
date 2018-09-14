import { Component, OnInit } from '@angular/core';
import {CrudService} from '../../../shared/servicios/crud.service';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {PopupComponentEmpresa} from '../empresa/popup/popup.component';
import {AppLoaderService} from '../../../shared/servicios/app-loader/app-loader.service';
import {AppConfirmService} from '../../../shared/servicios/app-confirm/app-confirm.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-aplicacion',
  templateUrl: './aplicacion.component.html',
  styles: []
})
export class AplicacionComponent implements OnInit {

  empresas : any;
  apps : any;
  selEmpresa : any;

  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService : CrudService,
    private loader: AppLoaderService,
    private confirmService: AppConfirmService,
    private router:Router
  ) { }

  ngOnInit() {
    this.empresas =  this.crudService._listParams('empresa',{ op: 'ALL' });
  }

  async loadApp(){
    this.apps = await this.crudService._listParams('aplicacion', { op: 'ALL', empresa : this.selEmpresa });
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
  listEstacion(item){
    this.router.navigate(['estacion', item.ID ]);
  }

  async openPopUp(data: any = {}, isNew?){
    let title = isNew ? 'Agregar' : 'Actualizar';
    let dialogRef: MatDialogRef<any> = this.dialog.open(PopupComponentEmpresa, {
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
