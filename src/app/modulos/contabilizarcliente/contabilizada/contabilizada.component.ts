import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { AppLoaderService } from '../../../shared/servicios/app-loader/app-loader.service';
import { AppConfirmService } from '../../../shared/servicios/app-confirm/app-confirm.service';
import { ContabilizadaService } from './contabilizada.service';

@Component({
  selector: 'app-contabilizada',
  templateUrl: './contabilizada.component.html',
  styles: []
})
export class ContabilizadaCComponent implements OnInit, OnDestroy {
  Cuentas = [
    { value: 1, viewValue: '1. (ACTIVO)' },
    { value: 2, viewValue: '1.01. (ACTIVO CORRIENTE)' },
    { value: 3, viewValue: '1.01.01. (EFECTIVO Y EQUIVALENTES AL EFECTIVO)' },
    { value: 4, viewValue: '1.01.02. (ACTIVOS FINANCIEROS)' },
    { value: 5, viewValue: '1.01.02.01 (ACTIVOS FINANCIEROS A VALOR RAZONABLE CON CAMBIOS EN RESULTADOS)' },
    { value: 6, viewValue: '1.01.02.02 (ACTIVOS FINANCIEROS DISPONIBLES PARA LA VENTA)' },
  ];
  public items: any[];
  public getItemSub: Subscription;
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: ContabilizadaService,
    private loader: AppLoaderService,
    private confirmService: AppConfirmService,
  ) { }

  ngOnInit() {
    this.getItems()
  }
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe()
    }
  }
  getItems() {
    try {
      this.getItemSub = this.crudService.getItems()
        .subscribe(data => {
          this.items = data;
        })
    }
    catch{ }
  }

}
