import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {CrudService} from '../../../shared/servicios/crud.service';
import {AppLoaderService} from '../../../shared/servicios/app-loader/app-loader.service';
import {PopupComponentEmpresa} from './popup/popup.component';
import {AppConfirmService} from '../../../shared/servicios/app-confirm/app-confirm.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styles: []
})
export class EmpresaComponent implements OnInit {
  pageSize = [3, 5, 10, 20]; 
  selPageSize : any = this.pageSize[0];
  paginate: any={
    data: [],
    page: 1,
    total: 0,
    per_page: 0
  };
  public items: any;
  public getItemSub: any;

  constructor(private dialog: MatDialog,
              private snack: MatSnackBar,
              private crudService: CrudService,
              private loader: AppLoaderService,
              private confirmService: AppConfirmService) { }

  ngOnInit() {
    this.getItems();
  }

  async getItems() {
    this.items = await this.crudService._listParams("empresa", { op: 'ALL' });
  }

  async openPopUp(data: any = {}, isNew?) {
    let title = isNew ? 'Agregar' : 'Actualizar';
    let dialogRef: MatDialogRef<any> = this.dialog.open(PopupComponentEmpresa, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: data }
    });


    dialogRef.afterClosed()
      .subscribe(response => {
        if(!response)
          return;

        this.loader.open();
        if(isNew){
          this.crudService.Insertar(response, 'empresa/').subscribe(data => {
            this.getItems();
            this.loader.close();
            this.snack.open('Agregado!', 'OK', { duration: 4000 });
          });
        }
        else{
          this.crudService.Actualizar(data.ID, response, 'empresa/')
            .subscribe(response2 => {
              this.getItems();
              this.loader.close();
              this.snack.open('Actualizado!', 'OK', {duration: 4000});
            });
        }
      });

  }

  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe();
    }
  }

  deleteItem(item){
    this.confirmService.confirm({ message: `Eliminar ${ item.Descripcion }?` })
      .subscribe(res => {
        if (res) {
          this.loader.open();
          this.crudService.Eliminar(item.ID, 'empresa/').subscribe(data => {
            this.getItems();
            this.loader.close();
            this.snack.open('Eliminado!', 'OK', { duration: 4000 });
          });
        }
      });
  }

}
