import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ModeloPlanContable } from '../modelopc.model';
import { CrudService } from '../../../../shared/servicios/crud.service';

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
    private crudService: CrudService,
  ) { }

  ngOnInit() {
    if (Array.isArray(this.data.payload.promise)) {
      this.newItemform(this.data.payload.promise[0]);
    } else {
      this.buildItemForm(this.data.payload);
    }

  }
  newItemform(item) {
    this.itemForm = this.fb.group({
      Modelo: [item.Modelo || '', Validators.required],
      Etiqueta: [item.Etiqueta || '', Validators.required],
      Estado: [item.Estado || false, Validators.required]
    })
  }
  buildItemForm(item) {
    this.itemForm = this.fb.group({
      Modelo: [item.Modelo || '', Validators.required],
      Etiqueta: [item.Etiqueta || '', Validators.required],
      Estado: [item.Estado || false, Validators.required]
    })
  }

  submit() {
    if (this.itemForm.value.Estado) {
      this.itemForm.value.Estado = 'ACT'
    }
    else {
      this.itemForm.value.Estado = 'INA'
    }
    this.dialogRef.close(this.itemForm.value)
  }
}
