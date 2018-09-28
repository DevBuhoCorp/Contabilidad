import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {CrudService} from '../../../../shared/servicios/crud.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: []
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
  ) { }

  ngOnInit() {
    this.bancos = this.crudService.SeleccionarAsync('banco/combo');
    this.tipoCuentas = this.crudService.SeleccionarAsync('tipocuentabancaria/combo');

    this.buildItemForm(this.data.payload)
  }
  buildItemForm(item) {
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
      Estado: [ item.Estado || '' ],
    })
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }
}
