
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../../../shared/servicios/crud.service';

@Component({
  selector: 'app-balancecomprobacion',
  templateUrl: './balancecomprobacion.component.html',
  styles: []
})
export class BalancecomprobacionComponent implements OnInit {
  pageSize = [3, 5, 10, 20];
  selPageSize: any = this.pageSize[0];
  items: any = [];
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


  public TotalDebe: number = 0;
  public TotalHaber: number = 0;
  public TotalDeudor: number = 0;
  public TotalAcreedor: number = 0;

  constructor(private crudService: CrudService) {
  }

  ngOnInit() {
    this.getItems();
    //this.selApp = this.selTTransaccion = this.selTCuenta = 'ALL';
    //this.aplicacions = this.crudService.SeleccionarAsync('comboaplicacion', { empresa: 2 });
    // this.getItems();
  }

  async getItems() {
    /*let params = {
      page: indice,
      psize: this.selPageSize,
      //empresa: this.selEmpresa,
      Estado: 'ACT'
    };
    if (this.selTTransaccion !== 'ALL') {
      params['ttransaccion']= this.selTTransaccion;
      if(this.selTTransaccion == 'app' && this.selApp != 'ALL')
        params['app']= this.selApp;
    }
    if (this.selTCuenta !== 'ALL')
      params['tcuenta']= this.selTCuenta;

    if( this.dtpInicio )
      params['FInicio']= this.dtpInicio.toDateString();
    if( this.dtpFin )
      params['FFin']= this.dtpFin.toDateString();


    let data: any = await this.crudService.SeleccionarAsync('transaccion', params);*/
    this.items = await this.crudService.SeleccionarAsync('balance_comprobacion/' + 11); 
    this.items.map(i => {
      this.TotalDebe = this.TotalDebe + Number(i.Debe);
      this.TotalHaber = this.TotalHaber + Number(i.Haber);
      this.TotalDeudor = this.TotalDeudor + Number(i.Deudor);
      this.TotalAcreedor = this.TotalAcreedor + Number(i.Acreedor);
    })   
    /*this.crudService.Seleccionar('balance_comprobacion/' + 11).map((response) => {
      return response.json();
    }).toPromise().then(x => {
      this.items = x;
      this.items.map(i => {
        this.TotalDebe = this.TotalDebe + Number(i.Debe);
        this.TotalHaber = this.TotalHaber + Number(i.Haber);
        this.TotalDeudor = this.TotalDeudor + Number(i.Deudor);
        this.TotalAcreedor = this.TotalAcreedor + Number(i.Acreedor);
      })
    });*/
    //this.items = [{"ID":137,"Etiqueta":"1.1.1.1 Caja","Debe":"664000.00","Haber":"182000.00","Deudor":"482000.0000","Acreedor":"0.0000"},{"ID":138,"Etiqueta":"1.1.1.2 Banco","Debe":"800000.00","Haber":"7000.00","Deudor":"793000.0000","Acreedor":"0.0000"},{"ID":140,"Etiqueta":"1.1.2.1 Mercaderia","Debe":"1145000.00","Haber":"0.00","Deudor":"1145000.0000","Acreedor":"0.0000"},{"ID":142,"Etiqueta":"1.1.3.1 Cuentas por Cobrar","Debe":"5500.00","Haber":"0.00","Deudor":"5500.0000","Acreedor":"0.0000"},{"ID":143,"Etiqueta":"1.1.3.2 Documentos por cobrar","Debe":"296000.00","Haber":"2000.00","Deudor":"294000.0000","Acreedor":"0.0000"},{"ID":146,"Etiqueta":"1.2.1.1 Equipo de oficina","Debe":"51000.00","Haber":"0.00","Deudor":"51000.0000","Acreedor":"0.0000"},{"ID":147,"Etiqueta":"1.2.1.2 Muebles de Oficina","Debe":"46000.00","Haber":"0.00","Deudor":"46000.0000","Acreedor":"0.0000"},{"ID":172,"Etiqueta":"1.3.1 Publicidad Pagada por Adelantado","Debe":"10000.00","Haber":"0.00","Deudor":"10000.0000","Acreedor":"0.0000"},{"ID":150,"Etiqueta":"2.1.1 Sueldos y salarios","Debe":"0.00","Haber":"30000.00","Deudor":"0.0000","Acreedor":"28000.0000"},{"ID":181,"Etiqueta":"2.1.1.2 Gastos de Mantenimiento","Debe":"2000.00","Haber":"0.00","Deudor":"2000.0000","Acreedor":"0.0000"},{"ID":157,"Etiqueta":"2.1.3.5 Cuentas por pagar","Debe":"0.00","Haber":"10000.00","Deudor":"0.0000","Acreedor":"10000.0000"},{"ID":158,"Etiqueta":"2.1.3.6 Documentos por pagar","Debe":"0.00","Haber":"380000.00","Deudor":"0.0000","Acreedor":"380000.0000"},{"ID":162,"Etiqueta":"2.1.6.1 Capital","Debe":"0.00","Haber":"2448000.00","Deudor":"0.0000","Acreedor":"2448000.0000"},{"ID":170,"Etiqueta":"2.1.7.1 Venta","Debe":"0.00","Haber":"287500.00","Deudor":"0.0000","Acreedor":"287500.0000"},{"ID":175,"Etiqueta":"2.1.7.2 Gastos de Transporte","Debe":"2000.00","Haber":"0.00","Deudor":"2000.0000","Acreedor":"0.0000"},{"ID":179,"Etiqueta":"2.1.7.6 Comisiones Ganadas","Debe":"0.00","Haber":"20000.00","Deudor":"0.0000","Acreedor":"20000.0000"},{"ID":174,"Etiqueta":"2.1.8.1 Compra","Debe":"340000.00","Haber":"0.00","Deudor":"340000.0000","Acreedor":"0.0000"},{"ID":168,"Etiqueta":"2.3.4 Comisiones Pagadas","Debe":"5000.00","Haber":"0.00","Deudor":"5000.0000","Acreedor":"0.0000"}];


  }

}
