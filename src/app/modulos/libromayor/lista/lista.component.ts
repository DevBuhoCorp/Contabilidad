import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CrudService} from '../../../shared/servicios/crud.service';
import {ExcelService} from '../../../shared/servicios/excel.service';
import {ToolsService} from '../../../shared/servicios/tools.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: []
})
export class ListaDetallesComponent implements OnInit {
  pageSize = this.toolsService.getPaginas();
  selPageSize: any = this.pageSize[0];
  items: any = [];
  IDTransaccion;
  Etiqueta;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private crudService: CrudService,
              private excelService: ExcelService,
              private toolsService: ToolsService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ListaDetallesComponent>,
  ) {
  }

  ngOnInit() {
    this.IDTransaccion = this.data['id'];
    this.Etiqueta = this.data['etiqueta'];
    this.getItems();

    // this.route.params.subscribe(async (params) => {
    //
    //   this.IDTransaccion = params['id'];
    //   this.Etiqueta = params['etiqueta'];
    //   this.getItems();
    //
    // });
  }

  async getItems() {
    this.items = await this.crudService.SeleccionarAsync('transaccion/' + this.IDTransaccion);

  }


 /*  async setPage(event) {

    this.getItems(event.offset + 1);

  } */

  exportar(): void {
    this.crudService.Seleccionar('export_detalletrans/' + this.IDTransaccion).map((response) => {
      return response.json();
    }).toPromise().then(x => {
      this.excelService.exportAsExcelFile(x, 'Detalle de Transacción' + this.Etiqueta);
    });
  }

  return(){
    this.dialogRef.close(true);
  }

}
