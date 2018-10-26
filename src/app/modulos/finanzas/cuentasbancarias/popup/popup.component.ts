import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import {CrudService} from '../../../../shared/servicios/crud.service';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import * as _moment from 'moment';
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
  public itemForm: FormGroup;
  bancos: any;
  tipoCuentas: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private crudService: CrudService,
    public dialogRef: MatDialogRef<PopupComponentCB>,
    private fb: FormBuilder,
    private adapter: DateAdapter<any>
  ) { }

  ngOnInit() {
    //this.adapter.setLocale('es');
    this.bancos = this.crudService.SeleccionarAsync('banco/combo');
    this.tipoCuentas = this.crudService.SeleccionarAsync('tipocuentabancaria/combo');
    // this.itemForm.controls['FechaApertura'] = new FormControl(moment());

    this.buildItemForm(this.data.payload);
  }
  buildItemForm(item) {
    console.log(item);
    this.itemForm = this.fb.group({
      // Etiqueta: [item.Etiqueta || '', Validators.required],
      NumeroCuenta: [item.NumeroCuenta || '', Validators.required],
      FechaApertura: [ moment(item.FechaApertura).toDate().toISOString() || moment().toDate().toISOString(), Validators.required],
      SaldoInicial: [item.SaldoInicial || '', Validators.required],
      SaldoMinimo: [item.SaldoMinimo || '', Validators.required],
      IdentificacionTitular: [item.IdentificacionTitular || '', Validators.required],
      NombreTitular: [item.NombreTitular || '', Validators.required],
      DireccionTitular: [item.DireccionTitular || '', Validators.required],
      IDTipoCuenta: [ item.IDTipoCuenta || '' , Validators.required ],
      IDBanco: [ item.IDBanco || '' , Validators.required ],
      Estado: [ item.Estado || '' ],
    })
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }
}


