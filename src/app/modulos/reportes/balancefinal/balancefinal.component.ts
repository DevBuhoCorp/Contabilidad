import { Component, OnInit } from "@angular/core";
import { CrudService } from "../../../shared/servicios/crud.service";
import { ExcelService } from "../../../shared/servicios/excel.service";
import * as XLSX from "xlsx";
import { ToolsService } from "../../../shared/servicios/tools.service";
@Component({
  selector: "app-balancefinal",
  templateUrl: "./balancefinal.component.html",
  styles: []
})
export class BalancefinalComponent implements OnInit {
  items: any = [];
  constructor(
    private crudService: CrudService,
    private excelService: ExcelService,
    private toolsService: ToolsService
  ) {}

  ngOnInit() {
    this.getItems();
  }

  async getItems() {
    this.items = await this.crudService.SeleccionarAsync(
      "report_balancefinal",
      { Empresa: this.toolsService.getEmpresaActive().IDEmpresa }
    );
  }

  exportar(): void {
    /* const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.items.activos);
    const worksheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.items.pasivos);
    const worksheet3: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.items.patrimonio);
    this.excelService.exporthojas({ 'Activos': worksheet, 'Pasivos': worksheet2, 'Patrimonio': worksheet3 }, ['Activos','Pasivos', 'Patrimonio'], 'Balance Final'); */

    this.crudService
      .GetToFile(
        "export_balance_final/" +
          this.toolsService.getEmpresaActive().IDEmpresa
      )
      .subscribe(response => {
        this.excelService.saveAsExcelFile(response, `Balance Final`);
      });
  }
}
