import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PopupComponentEmpresa} from '../../../configurar/empresa/popup/popup.component';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: []
})
export class PopupComponentTCBancaria implements OnInit {

  public itemForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<PopupComponentEmpresa>,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.buildItemForm(this.data.payload);
  }

  buildItemForm(item) {
    this.itemForm = this.fb.group({
      Descripcion: [ item.Descripcion || '', Validators.required ],
      Observacion: [ item.Observacion || ''],
      Estado: [ item.Estado == 'ACT' || false ],
    });
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }

}
