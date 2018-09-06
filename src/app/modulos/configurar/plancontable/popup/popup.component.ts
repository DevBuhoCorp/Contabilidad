import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {CrudService} from '../../../../shared/servicios/crud.service';
import {CuentaContable} from '../cuentacontable.model';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: []
})
export class PopupComponentPC implements OnInit {
  Cuentas = [];
  public itemForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupComponentPC>,
    private fb: FormBuilder) {
  }

  ngOnInit() {

    if (Array.isArray(this.data.payload.promise)) {
      this.newItemform(this.data.payload);
    } else {
      this.buildItemForm(this.data.payload);
    }

  }

  buildItemForm(item) {
    this.itemForm = this.fb.group({
      NumeroCuenta: [{value: item.promise.NumeroCuenta, disabled: true}],
      Etiqueta: [item.promise.Etiqueta, Validators.required],
      CuentaPadre: [{value: (item.parent != null) ? item.parent.label : '', disabled: true}],
      GrupoCuenta: [{value: (item.children.length > 0) ? 'Grupo' : 'Detalle' || '', disabled: true}],
      Estado: [item.promise.Estado || false]
    });
  }

  newItemform(item) {
    this.itemForm = this.fb.group({
      NumeroCuenta: [ {value: (item.numerocuenta + '.' + item.promise[0].ncuenta) , disabled: true} ],
      Etiqueta: ['', Validators.required],
      CuentaPadre: [{value: item.label || '', disabled: true}],
      GrupoCuenta: [{value: 'Detalle' || '', disabled: true}],
      Estado: [true]
    });
  }

  submit() {
    this.dialogRef.close(this.itemForm.value);
  }
}
