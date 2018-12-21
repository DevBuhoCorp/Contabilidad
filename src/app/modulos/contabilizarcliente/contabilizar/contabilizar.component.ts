import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';
import {CrudService} from '../../../shared/servicios/crud.service';
import {ToolsService} from '../../../shared/servicios/tools.service';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {ListaDetallesComponent} from '../../libromayor/lista/lista.component';
import { PopUpAjusteComponent } from '../ajuste/ajuste.component';


@Component({
  selector: 'app-contabilizar',
  templateUrl: './contabilizar.component.html',
  styleUrls: []
})
export class ContabilizarCComponent implements OnInit {
  pageSize = [5, 10, 20];
  selPageSize: any = this.pageSize[0];
  items: any = {
    data: [],
    page: 1,
    total: 0,
    per_page: 0
  };
  selectedTransacciones: any = [];
  selTCuenta: any;
  selTTransaccion: any;

  dtpInicio: any;
  dtpFin: any;
  tcuentas: any[] = [
    {'Descripcion': 'Todos', 'Cod': 'ALL'},
    {'Descripcion': 'Acredora', 'Cod': 'ACRE'},
    {'Descripcion': 'Adeudora', 'Cod': 'ADEU'}
  ];
  ttransacions: any[] = [
    {'Descripcion': 'Todos', 'Cod': 'ALL'},
    {'Descripcion': 'Manual', 'Cod': 'manual'},
    {'Descripcion': 'Aplicación', 'Cod': 'app'}
  ];


  selApp: any;
  aplicacions: any;
  @ViewChild('MyDatatableComponent') ngxDatatable: DatatableComponent;
  public getItemSub: Subscription;

  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: CrudService,
    private toolsService: ToolsService
  ) {
  }

  async ngOnInit() {
    this.selApp = this.selTTransaccion = this.selTCuenta = 'ALL';
    this.aplicacions = await this.crudService.SeleccionarAsync('comboaplicacion', {empresa: this.toolsService.getEmpresaActive().IDEmpresa});
    //this.getItems();

  }

  async getItems(indice = 1) {
    let params = {
      page: indice,
      psize: this.selPageSize,
      Empresa: this.toolsService.getEmpresaActive().IDEmpresa,
      Estado: 'ACT'
    };
    if (this.selTTransaccion !== 'ALL') {
      params['ttransaccion'] = this.selTTransaccion;
      if (this.selTTransaccion == 'app' && this.selApp != 'ALL')
        params['app'] = this.selApp;
    }
    if (this.selTCuenta !== 'ALL')
      params['tcuenta'] = this.selTCuenta;

    if (this.dtpInicio)
      params['FInicio'] = this.dtpInicio.toDateString();
    if (this.dtpFin)
      params['FFin'] = this.dtpFin.toDateString();

    let data: any = await this.crudService.SeleccionarAsync('transaccion',params);
    this.items = data.data;
  //  this.items.data = this.crudService.SetBool(this.items.data);
  }

  async setPage(event) {
    this.getItems(event.offset + 1);
  }

  getID(row) {
    return row.ID;
  }


  viewAsientos(row: any) {
    let params = {
      id: row.ID,
      etiqueta: row.Etiqueta
    };

    let dialogRef: MatDialogRef<any> = this.dialog.open(ListaDetallesComponent, {
      width: '1080px',
      minHeight: '20px',
      data: params
    });
  }

  Guardar() {
    let selected = this.ngxDatatable.selected.map(row => row.ID);

    this.crudService.Insertar(selected, 'transaccion_contabilizar/')
      .subscribe(async data => {
        this.snack.open(data.message, 'OK', {duration: 4000});
        this.getItems();
      }, error => {
        this.snack.open(error._body, 'OK', {duration: 4000});
      });
    this.selectedTransacciones = [];


  }

  async openPopUp(data: any = {}) {

    let title = 'Ajustar Transacción';
    let ID = data.ID;
    data = await this.crudService.SeleccionarAsync("transaccion/" + data.ID);
    let dialogRef: MatDialogRef<any> = this.dialog.open(PopUpAjusteComponent, {
      width: '1080px',
      minHeight: '20px',
      disableClose: true,
      data: { title: title, payload: data }
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          // If user press cancel
          return;
        }
        this.crudService.Actualizar(ID, res,"transaccion_ajuste/").subscribe(async data => {
          this.getItems();
          this.snack.open(data, 'OK', { duration: 4000 });
          //this.snack.open('Transacción Finalizada!', 'OK', { duration: 4000 });
        });
      })
  }


}
