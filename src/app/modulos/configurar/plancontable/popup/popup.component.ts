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
  Cuentas = [];
  public itemForm: FormGroup;
  public Diarios:any = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupComponentPC>,
    private fb: FormBuilder,
    private crudService: CrudService) {  }

  async CargarCombo() {
    this.Diarios = await this.crudService.SeleccionarAsync("combodiario");
  }

  ngOnInit() {
    this.CargarCombo();
    console.log(this.data);
    if ((this.data.payload.promise)) {
      this.buildItemForm(this.data.payload);
    } else {
      this.newItemform(this.data.payload);
    }

  }

  newItemform(item) {
   
    if (item.numerocuenta) {
      console.log("new1");
      this.itemForm = this.fb.group({
        NumeroCuenta: [{ value: (item.numerocuenta + '.' + item.promise2[0].ncuenta), disabled: true }],
        Etiqueta: ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
        CuentaPadre: [{ value: item.label || '', disabled: true }],
        GrupoCuenta: [{ value: 'Detalle' || '', disabled: true }],
        IDDiario: [item.IDDiario || 1, Validators.required],
        Estado: [{ value: (item.Estado || true) }],

      });
    }
    else {
      console.log("new2");
      this.itemForm = this.fb.group({
        NumeroCuenta: [{ value: item.promise2, disabled: true }],
        Etiqueta: ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
        CuentaPadre: [{ value: '', disabled: true }],
        GrupoCuenta: [{ value: 'Total' || '', disabled: true }],
        IDDiario: [item.IDDiario || 1, Validators.required],
        Estado: [{ value: (item.Estado || true) }],

      });
    }
  }


  buildItemForm(item) {
    
    if (item.parent) {
      console.log("build1");
      this.itemForm = this.fb.group({
        NumeroCuenta: [{ value: (item.promise.numerocuenta), disabled: true }],
        Etiqueta: [item.promise.label, Validators.compose([Validators.required, Validators.maxLength(45)])],
        CuentaPadre: [{ value: item.parent.label || '', disabled: true }],
        GrupoCuenta: [{ value: 'Detalle' || '', disabled: true }],
        IDDiario: [item.promise.IDDiario || 1, Validators.required],
        Estado: [item.Estado || true, Validators.required]

      });
    }
    else {
      console.log("build2");
      this.itemForm = this.fb.group({
        NumeroCuenta: [{ value: (item.promise.NumeroCuenta), disabled: true }],
        Etiqueta: [item.promise.Etiqueta, Validators.compose([Validators.required, Validators.maxLength(45)])],
        CuentaPadre: [{ value: '', disabled: true }],
        GrupoCuenta: [{ value: 'Total' || '', disabled: true }],
        IDDiario: [item.promise.IDDiario || 1, Validators.required],
        Estado: [item.Estado || true, Validators.required]
      });
    }
  }

  submit() {
    if (this.data.payload.data) {
      this.itemForm.value.IDPadre = this.data.payload.data;
      this.itemForm.value.IDGrupoCuenta = 2;
    }
    else {
      this.itemForm.value.IDPadre = null;
      this.itemForm.value.IDGrupoCuenta = 1;
    }
    this.itemForm.value.NumeroCuenta = this.itemForm.controls.NumeroCuenta.value;
    this.itemForm.value.IDPlanContable = this.data.PlanContable;
    if (this.itemForm.value.Estado) {
      this.itemForm.value.Estado = 'ACT'
    }
    else {
      this.itemForm.value.Estado = 'INA'
    }
    this.dialogRef.close(this.itemForm.value);
  }
}
