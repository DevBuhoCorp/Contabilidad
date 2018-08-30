import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: []
})
export class PopupComponentIVA implements OnInit {
  Paises = [
    { value: 'FR - Francia', viewValue: 'Francia (FR)' },
    { value: 'BE - Bélgica', viewValue: 'Bélgica (BE)' },
    { value: 'ES - España', viewValue: 'España (ES)' },
    { value: 'CH - Suiza', viewValue: 'Suiza (CH)' },
    { value: 'EC - Ecuador', viewValue: 'Ecuador (EC)' }
  ];
  Impuestos = [
    { value: 1, viewValue: 'NO' },
    { value: 2, viewValue: 'Sí (Tipo 1)' },
    { value: 3, viewValue: 'Sí (Tipo 2)' },
    { value: 4, viewValue: 'Sí (Tipo 3)' },
    { value: 5, viewValue: 'Sí (Tipo 4)' },
    { value: 6, viewValue: 'Sí (Tipo 5)' },
    { value: 7, viewValue: 'Sí (Tipo 6)' },
  ];
  Cuentas = [
    { value: 1, viewValue: '1. (ACTIVO)' },
    { value: 2, viewValue: '1.01. (ACTIVO CORRIENTE)' },
    { value: 3, viewValue: '1.01.01. (EFECTIVO Y EQUIVALENTES AL EFECTIVO)' }, 
    { value: 4, viewValue: '1.01.02. (ACTIVOS FINANCIEROS)' },
    { value: 5, viewValue: '1.01.02.01 (ACTIVOS FINANCIEROS A VALOR RAZONABLE CON CAMBIOS EN RESULTADOS)' },
    { value: 6, viewValue: '1.01.02.02 (ACTIVOS FINANCIEROS DISPONIBLES PARA LA VENTA)' },
  ];
  public itemForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupComponentIVA>,
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
