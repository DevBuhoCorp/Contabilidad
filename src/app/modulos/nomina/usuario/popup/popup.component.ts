import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CrudService} from '../../../../shared/servicios/crud.service';
import {DateAdapter} from '../../../../../../node_modules/@angular/material/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: []
})
export class PopupComponentUser implements OnInit {
  public itemForm: FormGroup;
  roles: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private crudService: CrudService,
    public dialogRef: MatDialogRef<PopupComponentUser>,
    private fb: FormBuilder,
    private adapter: DateAdapter<any>
  ) { }

  ngOnInit() {
    this.roles = this.crudService.SeleccionarAsync('rol_combo');
    this.buildItemForm(this.data.payload);
  }

  buildItemForm(item) {
    this.itemForm = this.fb.group({
      // Etiqueta: [item.Etiqueta || '', Validators.required],
      NumeroCuenta: [item.NumeroCuenta || '', Validators.required],
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
