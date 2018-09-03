import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CrudService } from '../../../../shared/servicios/crud.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: []
})
export class PopupComponentPC implements OnInit {
  Cuenta;
  Grupos = [
    { value: 'Total', viewValue: 'Total' },
    { value: 'Detalle', viewValue: 'Detalle' },
  ];
  public itemForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupComponentPC>,
    private fb: FormBuilder,
    private crudService: CrudService,
  ) {
    this.crudService.ListarDatos("cuentacontable", "ID", this.data.payload.data).map((response) => {
      return response.json();
    }).toPromise().then(x => {
      this.Cuenta = x;
    })


  }

  ngOnInit() {

    if (this.data.title == 'Actualizar') {
      this.crudService.ListarDatos("cuentacontable", "ID", this.data.payload.data).map((response) => {
        return response.json();
      }).toPromise().then(x => {
        this.data.payload = x;
      })

    }
    this.buildItemForm(this.data.payload);
    console.log(this.data.payload);

  }
  buildItemForm(item) {
    console.log(item);
    this.itemForm = this.fb.group({
      NumeroCuenta: [item.NumeroCuenta || ''],
      Etiqueta: [item.Etiqueta || '', Validators.required],
      CuentaPadre: [item.parent.label|| 0],
      GrupoCuenta: [item.GrupoCuenta || 0],
      Estado: [item.Estado || false]
    })
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }
}
