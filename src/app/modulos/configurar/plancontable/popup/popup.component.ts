import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CrudService } from '../../../../shared/servicios/crud.service';
import { CuentaContable } from '../cuentacontable.model';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: []
})
export class PopupComponentPC implements OnInit {
  Grupo = "Detalle";
  Nhijos;
  NumeroCuenta:string;
  public itemForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupComponentPC>,
    private fb: FormBuilder,
    private crudService: CrudService,
  ) {
     this.crudService.ListarDatos("numerocuenta", this.data.payload.data, this.data.Modelo).map((response) => {
      return response.json();
    }).toPromise().then(x => {
      this.Nhijos = JSON.parse(x[0].data);
      console.log(x);
      console.log(this.Nhijos.ncuenta);
      this.NumeroCuenta = this.data.payload.numerocuenta + "." + this.Nhijos.ncuenta;
      console.log(this.NumeroCuenta);
    })

  }

  ngOnInit() {
   
    this.buildItemForm(this.data.payload);
  }
  buildItemForm(item) {

    this.itemForm = this.fb.group({
      NumeroCuenta: [{ value: this.NumeroCuenta || '', disabled: true }],
      Etiqueta: [item.Etiqueta || '', Validators.required],
      CuentaPadre: [{ value: item.label || '', disabled: true }],
      GrupoCuenta: [{ value: this.Grupo || '', disabled: true }],
      Estado: [item.Estado || false]
    })
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }
}
