import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../shared/servicios/crud.service';
import { ExcelService } from '../../../shared/servicios/excel.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-hojatrabajo',
  templateUrl: './hojatrabajo.component.html',
  styles: []
})
export class HojatrabajoComponent implements OnInit {
  items: any = [];
  constructor(private crudService: CrudService, private excelService: ExcelService) { }

  ngOnInit() {
    this.getItems();
  }

  async getItems() {
    this.items = await this.crudService.SeleccionarAsync('hojabalance/' + 11);
  }

  exportar(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.items.comprobacion);
    const worksheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.items.resultado);
    const worksheet3: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.items.final);
    const worksheet4: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.items.suman);
    this.excelService.exporthojas({ 'Balance de Comprobación': worksheet, 'Estado de Resultados': worksheet2, 'Balance Final': worksheet3, 'Suman':worksheet4 }, 
    ['Balance de Comprobación','Estado de Resultados', 'Balance Final', 'Suman'], 'Hoja de Trabajo');
   
  }

}
