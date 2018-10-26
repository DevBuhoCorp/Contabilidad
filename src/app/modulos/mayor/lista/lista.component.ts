import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../../../shared/servicios/crud.service';
import { ExcelService } from '../../../shared/servicios/excel.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: []
})
export class ListaMayorComponent implements OnInit {
  pageSize = [3, 5, 10, 20];
  selPageSize: any = this.pageSize[0];
  items: any = {
    detalles: {
      data: [{
        saldo: 0,
      }

      ],
      page: 1,
      total: 0,
      per_page: 0,

    },
    Debe: 0,
    Haber: 0
  };
  IDTransaccion;
  Saldo = 0;
  Etiqueta = 0;

  /*  */
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



  public TotalDebe: number = 0;
  public TotalHaber: number = 0;
  constructor(private router: ActivatedRoute,
    private crudService: CrudService,
    private excelService: ExcelService,
  ) { }

  ngOnInit() {
    this.selApp = this.selTTransaccion = this.selTCuenta = 'ALL';
    this.aplicacions = this.crudService.SeleccionarAsync('comboaplicacion', { empresa: 2 });

    this.router.params.subscribe(async (params) => {
      this.IDTransaccion = params['id'];
      this.Etiqueta = params['etiqueta'];
      this.getItems();

      
    });


  }
  async getItems(indice = 1) {
    let params = {
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



    this.items = await this.crudService.SeleccionarAsync('transporcuenta/' + this.IDTransaccion, params);
    if(indice==1){
      this.Saldo = 0;
    }
    this.items.detalles.data.map(i => {
      this.Saldo = this.Saldo + ( Number(i.Debe) - Number(i.Haber));
      i.saldo = this.Saldo;
    })
  }


  async setPage(event) {

    this.getItems(event.offset + 1);

  }

  exportar(): void {
    this.crudService.Seleccionar('export_libromayor/' + this.IDTransaccion).map((response) => {
      return response.json();
    }).toPromise().then(x => {
      this.excelService.exportAsExcelFile(x, 'Mayor de' + this.Etiqueta);

    });
   
  }

}
