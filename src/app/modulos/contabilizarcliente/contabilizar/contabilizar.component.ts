import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { AppLoaderService } from '../../../shared/servicios/app-loader/app-loader.service';
import { AppConfirmService } from '../../../shared/servicios/app-confirm/app-confirm.service';
import { ContabilizarService } from './contabilizar.service';
import { CrudService } from '../../../shared/servicios/crud.service';


@Component({
  selector: 'app-contabilizar',
  templateUrl: './contabilizar.component.html',
  styleUrls: []
})
export class ContabilizarCComponent implements OnInit {
  pageSize = [3, 5, 10, 20];
  selPageSize: any = this.pageSize[0];
  items: any = {
    data: [],
    page: 1,
    total: 0,
    per_page: 0
  };
  public getItemSub: Subscription;
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: CrudService,
    private loader: AppLoaderService,
    private confirmService: AppConfirmService,
  ) { }

  ngOnInit() {
    this.getItems();

  }

  async getItems(indice = 1) {
    //this.items = await this.crudService.SeleccionarAsync('transaccion', { page: indice, psize: this.selPageSize, Estado: 'INA' });
    let data: any = await this.crudService.SeleccionarAsync('transaccion', { page: indice, psize: this.selPageSize, Estado: 'INA' });
    this.items = data.data;
    this.items.data = this.crudService.SetBool(this.items.data);
  }

  async setPage(event) {
    this.getItems(event.offset + 1);
  }

  Guardar() {
    this.items.data.map(i => {
      if (i.Estado) {
        this.crudService.Actualizar(i.ID, i, 'transaccion/').subscribe(async data => {
          this.snack.open('Transacción Finalizada!', 'OK', { duration: 4000 });
          this.getItems();
        }, error => {
          this.snack.open(error._body, 'OK', { duration: 4000 });
        });
      }
    });

  }

}
