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
      NumeroCuenta: [{value: (item.numerocuenta + '.' + item.promise2[0].ncuenta), disabled: true}],
      Etiqueta: ['', Validators.required],
      CuentaPadre: [{value: item.label || '', disabled: true}],
      GrupoCuenta: [{value: 'Detalle' || '', disabled: true}],
      Estado: [true]
    });
  }


  newItemform(item) {
    if (item.parent) {
      this.itemForm = this.fb.group({
        NumeroCuenta: [{value: (item.promise[0].numerocuenta), disabled: true}],
        Etiqueta: [item.promise[0].etiqueta, Validators.required],
        CuentaPadre: [ { value: item.parent.label || '', disabled: true} ],
        GrupoCuenta: [{value: item.promise[0].grupo || '', disabled: true}],
        Estado: [true]
      });
    }
    else {
      this.itemForm = this.fb.group({
        NumeroCuenta: [{value: (item.promise[0].numerocuenta), disabled: true}],
        Etiqueta: [item.promise[0].etiqueta, Validators.required],
        CuentaPadre: [{value: '', disabled: true}],
        GrupoCuenta: [{value: item.promise[0].grupo || '', disabled: true}],
        Estado: [true]
      });
    }
  }

  submit() {
    this.dialogRef.close(this.itemForm.value);
  }
}
