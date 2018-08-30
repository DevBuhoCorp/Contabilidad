import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: []
})
export class PopupComponentCB implements OnInit {
  Tipos = [
    { value: 1, viewValue: 'Cuenta Bancaria de ahorros' },
    { value: 2, viewValue: 'Cuenta Bancaria corriente' },
    { value: 3, viewValue: 'Cuenta caja/efectivo' },
  ];
  Monedas = [
    { value: 1, viewValue: 'Dólares USA ($)' },
    { value: 2, viewValue: 'Euros (€)' },
    { value: 3, viewValue: 'Japan Yen (¥)' },
  ];
  Paises = [
    { value: 'FR - Francia', viewValue: 'Francia (FR)' },
    { value: 'BE - Bélgica', viewValue: 'Bélgica (BE)' },
    { value: 'ES - España', viewValue: 'España (ES)' },
    { value: 'CH - Suiza', viewValue: 'Suiza (CH)' },
    { value: 'EC - Ecuador', viewValue: 'Ecuador (EC)' }
  ];
  Cuentas = [
    { value: 1, viewValue: '1. (ACTIVO)' },
    { value: 2, viewValue: '1.01. (ACTIVO CORRIENTE)' },
    { value: 3, viewValue: '1.01.01. (EFECTIVO Y EQUIVALENTES AL EFECTIVO)' },
    { value: 4, viewValue: '1.01.02. (ACTIVOS FINANCIEROS)' },
    { value: 5, viewValue: '1.01.02.01 (ACTIVOS FINANCIEROS A VALOR RAZONABLE CON CAMBIOS EN RESULTADOS)' },
    { value: 6, viewValue: '1.01.02.02 (ACTIVOS FINANCIEROS DISPONIBLES PARA LA VENTA)' },
  ];
  Codigos = [
    { value: 1, viewValue: 'ND - Nuevo diario' },
    { value: 2, viewValue: 'IG - Diario del informe de gastos' },
    { value: 3, viewValue: 'DB - Diario bancario' },
    { value: 4, viewValue: 'DC - Diario de compra' },
    { value: 5, viewValue: 'DV - Diario de venta' },
    { value: 6, viewValue: 'OD - Otro diario' },
  ];
  public itemForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupComponentCB>,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildItemForm(this.data.payload)
  }
  buildItemForm(item) {
    this.itemForm = this.fb.group({
      Referencia: [item.Referencia || ''],
      Etiqueta: [item.Etiqueta || '', Validators.required],
      TipoCuenta: [item.TipoCuenta || ''],
      Moneda: [item.Moneda || ''],
      Estado: [item.Estado || ''],
      Pais: [item.Pais || ''],
      Provincia: [item.Provincia || false],
    })
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }
  onContentChanged() { }
  onSelectionChanged() { }
}
