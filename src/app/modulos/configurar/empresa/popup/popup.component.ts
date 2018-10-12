import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: []
})
export class PopupComponentEmpresa implements OnInit {
  public itemForm: FormGroup;
  tipoContribuyentes: any = [
    { ID: "N", Descripcion: "Persona Natural" },
    { ID: "J", Descripcion: "Persona Jurídica" },
    { ID: "S", Descripcion: "Sociedad" }
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<PopupComponentEmpresa>,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.buildItemForm(this.data.payload);
  }

  buildItemForm(item) {
    this.itemForm = this.fb.group({
      // Codigo: [item.Codigo || ''],
      Descripcion: [ item.Descripcion || '', Validators.required ],
      RUC: [ item.RUC || '', Validators.required ],
      RazonSocial: [ item.RazonSocial || '', Validators.required ],
      NombreComercial: [ item.NombreComercial || '', Validators.required ],
      Direccion: [ item.Direccion || '', Validators.required ],
      Telefono: [ item.Telefono || '', Validators.required ],
      Email: [ item.Email || '' ],
      TipoContribuyente: [ item.TipoContribuyente || '', Validators.required ],
      Observacion: [ item.Observacion || ''],
      Estado: [ item.Estado == 'ACT' || false ],
    });
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }

}
