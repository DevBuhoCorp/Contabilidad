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
  Cuentas = [];
  public itemForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupComponentPC>,
    private fb: FormBuilder,
    private crudService: CrudService,
  ) {


   }

  ngOnInit() {

    //if (this.data.title == 'Actualizar') {
      this.crudService.ListarDatos("cuentacontable", "ID", this.data.payload.data).map((response) => {
        return response.json() as CuentaContable[];
      }).toPromise().then(x => {
        this.data.payload = x;
        console.log(this.data.payload);
      })

   // }
    console.log(this.data.payload);
    this.buildItemForm(this.data.payload);
  }
  buildItemForm(item) {
   
    this.itemForm = this.fb.group({
      NumeroCuenta: [item.NumeroCuenta || ''],
      Etiqueta: [item.Etiqueta || '', Validators.required],
      CuentaPadre: [{ value: item.label || '', disabled: true }],
      //GrupoCuenta: [item.GrupoCuenta || 0],
      GrupoCuenta: [{ value: this.Grupo || '', disabled: true }],
      Estado: [item.Estado || false]
    })
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }
}
