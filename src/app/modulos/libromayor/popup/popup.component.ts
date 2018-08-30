import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: []
})
export class PopupLibroMayor implements OnInit {
  public uploader: FileUploader = new FileUploader({ url: 'upload_url' });
  public hasBaseDropZoneOver: boolean = false;
  Diarios = [
    { value: 1, viewValue: 'Nuevo diario' },
    { value: 2, viewValue: 'Diario del informe de gastos' },
    { value: 3, viewValue: 'Diario bancario' },
    { value: 4, viewValue: 'Diario de compra' },
    { value: 5, viewValue: 'Diario de venta' }
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
    public dialogRef: MatDialogRef<PopupLibroMayor>,
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
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

}
