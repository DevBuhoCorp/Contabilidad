import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: []
})
export class PopupComponentPC implements OnInit {
  Cuentas = [
    { value: 1, viewValue: '1. ACTIVO' },
    { value: 2, viewValue: '1.01. ACTIVO CORRIENTE' },
    { value: 3, viewValue: '1.01.01. EFECTIVO Y EQUIVALENTES AL EFECTIVO' },
    { value: 4, viewValue: '1.01.02. ACTIVOS FINANCIEROS' }
  ];
  Grupos = [
    { value: 'Total', viewValue: 'Total' },
    { value: 'Detalle', viewValue: 'Detalle' },
  ];
  public itemForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupComponentPC>,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildItemForm(this.data.payload)
  }
  buildItemForm(item) {
    this.itemForm = this.fb.group({
      NumeroCuenta: [item.NumeroCuenta || '' ],
      Etiqueta: [item.Etiqueta || '',Validators.required],
      CuentaPadre: [item.CuentaPadre || ''],
      GrupoCuenta: [item.GrupoCuenta || ''],
      Estado: [item.Estado || false]
    })
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }
}
