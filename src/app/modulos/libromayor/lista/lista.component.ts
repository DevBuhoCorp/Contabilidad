import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../../../shared/servicios/crud.service';
import { ExcelService } from '../../../shared/servicios/excel.service';
import { ToolsService } from '../../../shared/servicios/tools.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: []
})
export class ListaDetallesComponent implements OnInit {
  pageSize = this.toolsService.getPaginas(); 
  selPageSize: any = this.pageSize[0];
  items: any = {
    data: [],
    page: 1,
    total: 0,
    per_page: 0
  };
  IDTransaccion;
  Etiqueta;
  constructor(private router: ActivatedRoute,
    private crudService: CrudService,
    private excelService: ExcelService,
    private toolsService: ToolsService
  ) { }

  ngOnInit() {
    this.router.params.subscribe(async (params) => {

      this.IDTransaccion = params['id'];
      this.Etiqueta = params['etiqueta'];
      this.getItems();

    });
  }
  async getItems(indice = 1) {
    this.items = await this.crudService.SeleccionarAsync('transaccion/' + this.IDTransaccion, { page: indice, psize: this.selPageSize });

  }


  async setPage(event) {

    this.getItems(event.offset + 1);

  }

  exportar(): void {
    this.crudService.Seleccionar('export_detalletrans/' + this.IDTransaccion).map((response) => {
      return response.json();
    }).toPromise().then(x => {
      this.excelService.exportAsExcelFile(x, 'Detalle de Transacción' + this.Etiqueta);
    });


  }



}
