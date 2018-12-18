import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { CrudService } from '../../../shared/servicios/crud.service';
import {ToolsService} from '../../../shared/servicios/tools.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';


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
  selectedTransacciones: any = [];
  @ViewChild("MyDatatableComponent") ngxDatatable: DatatableComponent;
  public getItemSub: Subscription;
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: CrudService,
    private toolsService: ToolsService
  ) { }

  ngOnInit() {
    this.getItems();

  }

  async getItems(indice = 1) {
    //this.items = await this.crudService.SeleccionarAsync('transaccion', { page: indice, psize: this.selPageSize, Estado: 'INA' });
    let data: any = await this.crudService.SeleccionarAsync('transaccion', { page: indice, psize: this.selPageSize, Estado: 'INA', Empresa: this.toolsService.getEmpresaActive().IDEmpresa });
    this.items = data.data;
    this.items.data = this.crudService.SetBool(this.items.data);
  }

  async setPage(event) {
    this.getItems(event.offset + 1);
  }

  getID(row) {
    return row.ID;
  }

  Guardar() {
    let selected = this.ngxDatatable.selected.map(row => row);
    console.log(this.selectedTransacciones);
    selected.map(i => {
     try {
        i.Estado = true;
        this.crudService.Actualizar(i.ID, i, 'transaccion/').subscribe(async data => {
          this.snack.open('Transacción Finalizada!', 'OK', { duration: 4000 });
          this.getItems();
        }, error => {
          this.snack.open(error._body, 'OK', { duration: 4000 });
        });
      }
      catch{
        this.snack.open("Error al Contabilizar", 'OK', { duration: 4000 });
      }
    }); 
    this.selectedTransacciones = [];
    /* this.items.data.map(i => {
      if (i.Estado) {
        this.crudService.Actualizar(i.ID, i, 'transaccion/').subscribe(async data => {
          this.snack.open('Transacción Finalizada!', 'OK', { duration: 4000 });
          this.getItems();
        }, error => {
          this.snack.open(error._body, 'OK', { duration: 4000 });
        });
      }
    }); */

  }


}
