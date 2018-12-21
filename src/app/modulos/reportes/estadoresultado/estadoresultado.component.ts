import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../shared/servicios/crud.service';
import { ExcelService } from '../../../shared/servicios/excel.service';
import * as XLSX from 'xlsx';
import {ToolsService} from '../../../shared/servicios/tools.service';
@Component({
  selector: 'app-estadoresultado',
  templateUrl: './estadoresultado.component.html',
  styles: []
})
export class EstadoresultadoComponent implements OnInit {
  items: any = [];
  constructor(private crudService: CrudService, private excelService: ExcelService, private toolsService: ToolsService) {
  }


  ngOnInit() {
    this.getItems();

  }

  async getItems() {
    this.items = await this.crudService.SeleccionarAsync('report_estadoresultado/' + this.toolsService.getEmpresaActive().IDEmpresa);

  }

  exportar(): void {
   /*  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.items.resultado);
    const worksheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.items.resultado2);
    this.excelService.exporthojas({ 'Cuentas': worksheet, 'Utilidades-Impuestos': worksheet2 }, ['Cuentas','Utilidades-Impuestos'], 'Estado de Resultados'); */

    

    this.crudService
      .GetToFile(
        "export_estado_resultado/" +
          this.toolsService.getEmpresaActive().IDEmpresa
      )
      .subscribe(response => {
        this.excelService.saveAsExcelFile(response, `Balance de Comprobación`);
      });

  }



}
