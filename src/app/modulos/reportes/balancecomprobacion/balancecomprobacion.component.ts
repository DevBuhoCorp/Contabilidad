import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { MatDialog, MatSnackBar, MatDialogRef } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CrudService } from "../../../shared/servicios/crud.service";
import { ExcelService } from "../../../shared/servicios/excel.service";
import { ToolsService } from "../../../shared/servicios/tools.service";

@Component({
  selector: "app-balancecomprobacion",
  templateUrl: "./balancecomprobacion.component.html",
  styles: []
})
export class BalancecomprobacionComponent implements OnInit {
  pageSize = this.toolsService.getPaginas();
  selPageSize: any = this.pageSize[0];
  items: any = [];
  selEmpresa: any;
  empresas: any;
  selTCuenta: any;
  selTTransaccion: any;

  dtpInicio: any;
  dtpFin: any;
  tcuentas: any[] = [
    { Descripcion: "Todos", Cod: "ALL" },
    { Descripcion: "Acredora", Cod: "ACRE" },
    { Descripcion: "Adeudora", Cod: "ADEU" }
  ];
  ttransacions: any[] = [
    { Descripcion: "Todos", Cod: "ALL" },
    { Descripcion: "Manual", Cod: "manual" },
    { Descripcion: "Aplicación", Cod: "app" }
  ];

  selApp: any;
  aplicacions: any;

  public TotalDebe: number = 0;
  public TotalHaber: number = 0;
  public TotalDeudor: number = 0;
  public TotalAcreedor: number = 0;

  constructor(
    private crudService: CrudService,
    private excelService: ExcelService,
    private toolsService: ToolsService
  ) {}

  ngOnInit() {
    this.getItems();
  }

  async getItems() {
    this.TotalDebe = 0;
    this.TotalHaber = 0;
    this.TotalDeudor = 0;
    this.TotalAcreedor = 0;
    this.items = await this.crudService.SeleccionarAsync(
      "balance_comprobacion/" + this.toolsService.getEmpresaActive().IDEmpresa
    );
    this.items.map(i => {
      this.TotalDebe = this.TotalDebe + Number(i.Debe);
      this.TotalHaber = this.TotalHaber + Number(i.Haber);
      this.TotalDeudor = this.TotalDeudor + Number(i.Deudor);
      this.TotalAcreedor = this.TotalAcreedor + Number(i.Acreedor);
    });
  }

  exportar(): void {
    //this.excelService.exportAsExcelFile(this.items, 'Balance de Comprobación');

    this.crudService
      .GetToFile(
        "export_balance_comprobacion/" +
          this.toolsService.getEmpresaActive().IDEmpresa
      )
      .subscribe(response => {
        this.excelService.saveAsExcelFile(response, `Balance de Comprobación`);
      });
  }
}
