import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../shared/servicios/crud.service';
import { ExcelService } from '../../../shared/servicios/excel.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-estadoresultado',
  templateUrl: './estadoresultado.component.html',
  styles: []
})
export class EstadoresultadoComponent implements OnInit {
  items: any = [];
  constructor(private crudService: CrudService, private excelService: ExcelService) {
  }


  ngOnInit() {
    this.getItems();

  }

  async getItems() {
    //this.items = await this.crudService.SeleccionarAsync('estadoresultado/' + 11);
    this.items = await this.crudService.SeleccionarAsync('report_estadoresultado/' + 11);

  }

  exportar(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.items.resultado);
    const worksheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.items.resultado2);
    this.excelService.exporthojas({ 'Cuentas': worksheet, 'Utilidades-Impuestos': worksheet2 }, ['Cuentas','Utilidades-Impuestos'], 'Estado de Resultados');

  }



}
