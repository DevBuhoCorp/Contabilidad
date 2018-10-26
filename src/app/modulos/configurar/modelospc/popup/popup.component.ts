import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: []
})
export class PopupComponentMPC implements OnInit {
  public itemForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupComponentMPC>,
    private fb: FormBuilder,
  ) { }
  ngOnInit() {
    if (Array.isArray(this.data.payload)) {
      this.buildItemForm(this.data.payload[0]);
    } else {
      this.buildItemForm(this.data.payload);
    }
  }

  buildItemForm(item) {
    this.itemForm = this.fb.group({
      Modelo: [item.Modelo || '', Validators.compose([Validators.required, Validators.maxLength(45)])],
      Etiqueta: [item.Etiqueta || '', Validators.compose([Validators.required, Validators.maxLength(45)])],
      Estado: [ item.Estado == 'ACT' || false ],
    })
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }
}
