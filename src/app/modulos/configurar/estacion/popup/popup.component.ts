import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: []
})
export class PopupComponentEstacion implements OnInit {
  public itemForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<PopupComponentEstacion>,
              private fb: FormBuilder,) { }

  ngOnInit() {
    this.buildItemForm(this.data.payload);
  }
  buildItemForm(item) {
    this.itemForm = this.fb.group({
      Nmaquina: [ item.Nmaquina || '', Validators.required ],
      Estado: [ item.Estado == 'ACT' || false ],
    })
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }
}
