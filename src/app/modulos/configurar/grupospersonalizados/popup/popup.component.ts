import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: []
})
export class PopupComponentGP implements OnInit {
  Paises = [
    { value: 'FR - Francia', viewValue: 'Francia (FR)' },
    { value: 'BE - Bélgica', viewValue: 'Bélgica (BE)' },
    { value: 'ES - España', viewValue: 'España (ES)' },
    { value: 'CH - Suiza', viewValue: 'Suiza (CH)' },
    { value: 'EC - Ecuador', viewValue: 'Ecuador (EC)' }
  ];
  public itemForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupComponentGP>,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildItemForm(this.data.payload)
  }
  buildItemForm(item) {
    this.itemForm = this.fb.group({
      Codigo: [item.Codigo || '' ],
      Etiqueta: [item.Etiqueta || '',Validators.required],
      Comentario: [item.Comentario || ''],
      Calculado: [item.Calculado || false],
      Formula: [item.Formula || ''],
      Posicion: [item.Posicion || ''],
      Pais: [item.Pais || ''],
      Estado: [item.Estado || false]
    })
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }
}
