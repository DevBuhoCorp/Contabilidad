import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { CrudService } from '../../../shared/servicios/crud.service';
import { startWith, map } from 'rxjs/operators';
export interface Cuenta {
  ID: number;
  cuenta: string;
}

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: []
})
export class PopupTransaccion implements OnInit {
  cuenta: any = {
    ID: 0
  };
  Cuentas: any = [];
  public itemForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupTransaccion>,
    private fb: FormBuilder,
    private crudService: CrudService,
    private snack: MatSnackBar,
  ) {
    this.CargarAuto();
    this.buildItemForm(this.data.payload);
  }

  ngOnInit() {
    this.cuenta = this.itemForm.controls['IDCuenta'].valueChanges
      .pipe(
        startWith<string | Cuenta>(''),
        map(value => typeof value === 'string' ? value : value.cuenta),
        map(cuenta => cuenta ? this._filter(cuenta) : this.Cuentas.slice())
      );

  }
  private _filter(name: string): Cuenta[] {
    const filterValue = name.toLowerCase();
    return this.Cuentas.filter(option => option.cuenta.toLowerCase().includes(filterValue));
  }
  buildItemForm(item) {
    this.itemForm = this.fb.group({
      IDCuenta: [item.IDCuenta || 0, Validators.required],
      Etiqueta: [item.Etiqueta],
      Debe: [item.Debe || 0, Validators.required],
      Haber: [item.Haber || 0, Validators.required],
      Cuenta: [item.Cuenta],
      ID: [item.ID]
    })
  }

  submit() {
    if (this.itemForm.value.IDCuenta.cuenta) {
      this.itemForm.value.Cuenta = this.itemForm.value.IDCuenta.cuenta;
      this.itemForm.value.IDCuenta = this.itemForm.value.IDCuenta.ID;
      this.dialogRef.close(this.itemForm.value)
    }
    else {
      this.snack.open("Seleccione una Cuenta Contable", 'OK', { duration: 4000 });
    }

  }
  /* displayFn(cuenta?): string | undefined {
     return cuenta ? cuenta.cuenta : undefined;
   }*/
  displayFn(user?: Cuenta): string | undefined {
    return user ? user.cuenta : undefined;
  }

  filtrar(val: string) {
    return val ? this.Cuentas.filter(s => new RegExp(`^${val}`).test(s))
      : this.Cuentas;
  }
  async CargarAuto() {
    this.Cuentas = await this.crudService.SeleccionarAsync("autocomplete", { Modelo: 11 });
  }


}
