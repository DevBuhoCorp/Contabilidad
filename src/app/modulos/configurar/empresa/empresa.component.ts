import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {CrudService} from '../../../shared/servicios/crud.service';
import {AppLoaderService} from '../../../shared/servicios/app-loader/app-loader.service';
import {PopupComponentEmpresa} from './popup/popup.component';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styles: []
})
export class EmpresaComponent implements OnInit {
  public items: any;
  public getItemSub: any;

  constructor(private dialog: MatDialog,
              private snack: MatSnackBar,
              private crudService: CrudService,
              private loader: AppLoaderService,) { }

  ngOnInit() {
    this.getItems();
  }

  async getItems() {
    this.items = await this.crudService._listParams("empresa", { op: 'ALL' });
    console.log(this.items);
  }

  async openPopUp(data: any = {}, isNew?) {
    let title = isNew ? 'Agregar' : 'Actualizar';
    let dialogRef: MatDialogRef<any> = this.dialog.open(PopupComponentEmpresa, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: data }
    });

  }

  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe();
    }
  }
  deleteItem(item){

  }

}
