import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CrudService } from '../../../shared/servicios/crud.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: []
})
export class PopupLibroMayor implements OnInit {
  cuenta: any = {
    ID: 0
  };
  Cuentas: any = [];
  public itemForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupLibroMayor>,
    private fb: FormBuilder,
    private crudService: CrudService
  ) {
    this.CargarAuto();
    this.buildItemForm(this.data.payload);
    this.cuenta = this.itemForm.controls['IDCuenta'].valueChanges
      .startWith(null)
      .map(name =>
        this.filtrar(name));
  }

  ngOnInit() {

  }
  buildItemForm(item) {
    this.itemForm = this.fb.group({
      IDCuenta: [item.IDCuenta || 0, Validators.required],
      Etiqueta: [item.Etiqueta, Validators.required],
      Debe: [item.Debe, Validators.required],
      Haber: [item.Haber, Validators.required],
      Cuenta: [item.Cuenta]
    })
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }
  displayFn(cuenta?): string | undefined {
    return cuenta ? cuenta.cuenta : undefined;
  }

  filtrar(val: string) {
    console.log(this.cuenta);
    return val ? this.Cuentas.filter(s => new RegExp(`^${val}`).test(s))
      : this.Cuentas;
  }
  async CargarAuto() {
    this.Cuentas = await this.crudService.SeleccionarAsync("autocomplete", { Modelo: 6 });
    console.log(this.Cuentas);
  }

}
