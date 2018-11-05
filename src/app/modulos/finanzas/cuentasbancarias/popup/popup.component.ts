import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import {FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import {CrudService} from '../../../../shared/servicios/crud.service';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import * as _moment from 'moment';
import { startWith, map } from 'rxjs/operators';
import { Cuenta } from '../../../libromayor/popup/popup.component';
const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    // dateInput: 'LL',
    dateInput: 'MMM D, YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: [],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es'},

    {provide: DateAdapter, useClass: MomentDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class PopupComponentCB implements OnInit {
  cuenta: any = {
    ID: 0
  };
  Cuentas: any = [];
  public itemForm: FormGroup;
  bancos: any;
  tipoCuentas: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private crudService: CrudService,
    public dialogRef: MatDialogRef<PopupComponentCB>,
    private fb: FormBuilder,
    private adapter: DateAdapter<any>,
    private snack: MatSnackBar,
  ) { 
    this.CargarAuto();
    this.buildItemForm(this.data.payload);
  }

  ngOnInit() {
    //this.adapter.setLocale('es');
    this.bancos = this.crudService.SeleccionarAsync('banco/combo');
    this.tipoCuentas = this.crudService.SeleccionarAsync('tipocuentabancaria/combo');
    // this.itemForm.controls['FechaApertura'] = new FormControl(moment());
    this.cuenta = this.itemForm.controls['IDCuentaContable'].valueChanges
      .pipe(
        startWith<string | Cuenta>(''),
        map(value => typeof value === 'string' ? value : value.cuenta),
        map(cuenta => cuenta ? this._filter(cuenta) : this.Cuentas.slice())
      );
   //this.buildItemForm(this.data.payload);
  }
  private _filter(name: string): Cuenta[] {
    const filterValue = name.toLowerCase();
    return this.Cuentas.filter(option => option.cuenta.toLowerCase().includes(filterValue));
  }
  buildItemForm(item) {
    console.log(item);
    this.itemForm = this.fb.group({
      // Etiqueta: [item.Etiqueta || '', Validators.required],
      NumeroCuenta: [item.NumeroCuenta || '', Validators.required],
      FechaApertura: [ item.FechaApertura || '', Validators.required],
      SaldoInicial: [item.SaldoInicial || '', Validators.required],
      SaldoMinimo: [item.SaldoMinimo || '', Validators.required],
      IdentificacionTitular: [item.IdentificacionTitular || '', Validators.required],
      NombreTitular: [item.NombreTitular || '', Validators.required],
      DireccionTitular: [item.DireccionTitular || '', Validators.required],
      IDTipoCuenta: [ item.IDTipoCuenta || '' , Validators.required ],
      IDBanco: [ item.IDBanco || '' , Validators.required ],
      IDCuentaContable: [ item.IDCuentaContable || '' , Validators.required ],
      Estado: [ item.Estado || '' ],
    })
  }

  submit() {
    if (this.itemForm.value.IDCuentaContable.cuenta) {
      //this.itemForm.value.FechaApertura = this.itemForm.value.FechaApertura.toDateString();
      this.itemForm.value.IDCuentaContable = this.itemForm.value.IDCuentaContable.ID;
      this.dialogRef.close(this.itemForm.value)
    }
    else {
      this.snack.open("Seleccione una Cuenta Contable", 'OK', { duration: 4000 });
    }
  }
  async CargarAuto() {
    this.Cuentas = await this.crudService.SeleccionarAsync("autocomplete", { Modelo: 11 });
  }
  displayFn(user?: Cuenta): string | undefined {
    return user ? user.cuenta : undefined;
  }
}


