import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { AppLoaderService } from '../../shared/servicios/app-loader/app-loader.service';
import { AppConfirmService } from '../../shared/servicios/app-confirm/app-confirm.service';
import { PopupLibroMayor } from './popup/popup.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../../shared/servicios/crud.service';
import { ExcelService } from '../../shared/servicios/excel.service';
import {ToolsService} from '../../shared/servicios/tools.service';

@Component({
  selector: 'app-libromayor',
  templateUrl: './libromayor.component.html',
  styles: []
})

export class LibromayorComponent implements OnInit {
  pageSize = [3, 5, 10, 20];
  selPageSize: any = this.pageSize[0];
  items: any = {
    data: [],
    page: 1,
    total: 0,
    per_page: 0
  };
  selEmpresa: any;
  empresas: any;
  selTCuenta: any;
  selTTransaccion: any;

  dtpInicio: any;
  dtpFin: any;
  tcuentas: any[] = [
    { 'Descripcion': 'Todos', 'Cod': 'ALL' },
    { 'Descripcion': 'Acredora', 'Cod': 'ACRE' },
    { 'Descripcion': 'Adeudora', 'Cod': 'ADEU' }
  ];
  ttransacions: any[] = [
    { 'Descripcion': 'Todos', 'Cod': 'ALL' },
    { 'Descripcion': 'Manual', 'Cod': 'manual' },
    { 'Descripcion': 'Aplicación', 'Cod': 'app' }
  ];



  selApp: any;
  aplicacions: any;

  checked = false;
  public Debe: number = 0;
  public Haber: number = 0;
  public TotalDebe: number = 0;
  public TotalHaber: number = 0;
  public VienenDebe: number = 0;
  public VienenHaber: number = 0;
  public Totales: any = [];
  public ListaDetalles: any = [];
  public Transaccion: any = [{
    'Cabecera': [],
    'Detalle': [],
  }];
  public Cabecera: any = [];
  public creado: Boolean = false;
  public trans: Boolean = false;
  public itemForm: FormGroup;
  public getItemSub: Subscription;

  constructor(
    private crudService: CrudService,
    private excelService: ExcelService,
    private toolsService: ToolsService,
    private fb: FormBuilder) {
    this.buildItemForm();
  }

  ngOnInit() {
    this.selApp = this.selTTransaccion = this.selTCuenta = 'ALL';
    this.aplicacions = this.crudService.SeleccionarAsync('comboaplicacion', { empresa: this.toolsService.getEmpresaActive().IDEmpresa });
    // this.getItems();
  }

  async getItems(indice = 1) {
    let params = {
      page: indice,
      psize: this.selPageSize,
      //empresa: this.selEmpresa,
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


    let data: any = await this.crudService.SeleccionarAsync('transaccion', params);
    this.items = data.data;
    this.Totales = null;
    this.Totales = data.totales;
    this.items.data.map(i => {
      this.TotalDebe = this.TotalDebe + Number(i.Debe);
      this.TotalHaber = this.TotalHaber + Number(i.Haber);
    })

  }

  buildItemForm() {
    this.itemForm = this.fb.group({
      Fecha: ['', Validators.required],
      SerieDocumento: ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
      Etiqueta: [''],
    });

  }



  async setPage(event) {
    if (event.offset == 0) {
      this.VienenDebe = 0;
      this.VienenHaber = 0;
    }
    else {
      this.VienenDebe = this.TotalDebe;
      this.VienenHaber = this.TotalHaber;
    }
    this.TotalDebe = 0;
    this.TotalHaber = 0;
    this.getItems(event.offset + 1);

  }

  exportar(): void {

    this.crudService.Seleccionar('export_librodiario').map((response) => {
      return response.json();
    }).toPromise().then(x => {
      this.excelService.exportAsExcelFile(x, 'Libro Diario');
    });

    

  }
}
