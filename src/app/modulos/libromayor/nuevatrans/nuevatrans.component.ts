import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-nuevatrans',
  templateUrl: './nuevatrans.component.html',
  styles: []
})
export class NuevatransComponent implements OnInit {
  cuenta: any;
  Cuentas = [
    '1. (ACTIVO)',
   '1.01. (ACTIVO CORRIENTE)',
    '1.01.01. (EFECTIVO Y EQUIVALENTES AL EFECTIVO)',
    '1.01.02. (ACTIVOS FINANCIEROS)' ,
    '1.01.02.01 (ACTIVOS FINANCIEROS A VALOR RAZONABLE CON CAMBIOS EN RESULTADOS)',
    '1.01.02.02 (ACTIVOS FINANCIEROS DISPONIBLES PARA LA VENTA)' ,
  ];
  public itemForm: FormGroup;
  public detalleForm: FormGroup;
  constructor(private fb: FormBuilder, ) {
    this.detalleForm = this.fb.group({
      Cuenta:['', Validators.required],
      Etiqueta:['', Validators.required],
      Debe: ['', Validators.required],
      Haber:['', Validators.required],
    })
    this.cuenta = this.detalleForm.controls['Cuenta'].valueChanges
      .startWith(null)
      .map(name => this.filtrar(name));
  }

  ngOnInit() {
    this.buildItemForm()
  }
  buildItemForm() {
    this.itemForm = this.fb.group({
      NumeroTrans: [{ value: '', disabled: true }],
      Fecha: ['', Validators.required],
      Estacion: [{ value: '', disabled: true }]
    })
    
    
  }
  submitTransaccion() { }
  submitDetalle() { }
  
  filtrar(val: string) {
    return val ? this.Cuentas.filter(s => new RegExp(`${val}`).test(s))
      : this.Cuentas;
  }
}
