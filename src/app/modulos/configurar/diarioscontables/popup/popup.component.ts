import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CrudService } from '../../../../shared/servicios/crud.service';
import { DiarioContable } from '../diarioscontables.model';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: []
})
export class PopupComponentDC implements OnInit {
  Naturaleza = [];

  public itemForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupComponentDC>,
    private fb: FormBuilder,
    private crudService: CrudService
  ) {
    this.crudService.ListarDatos("naturaleza", "All", 0).map((response) => {
      return response.json();
    }).toPromise().then(x => {
      this.Naturaleza = x;

    })
  }
  ngOnInit() {
    if (Array.isArray(this.data.payload.promise)) {
      this.newItemform(this.data.payload.promise[0]);
    } else {
      this.buildItemForm(this.data.payload);
    }

  }
  buildItemForm(item) {
    this.itemForm = this.fb.group({
      Codigo: [item.Codigo || '', Validators.compose([Validators.required, Validators.maxLength(2)])],
      Etiqueta: [item.Etiqueta || '', Validators.compose([Validators.required, Validators.maxLength(45)])],
      Naturaleza: [item.IDNaturaleza || 1, Validators.required],
      Estado: [item.Estado || false, Validators.required],
      ID: [item.ID || 0, Validators.required]
    })
  }
  newItemform(item) {
    this.itemForm = this.fb.group({
      Codigo: [item.Codigo || '', Validators.compose([Validators.required, Validators.maxLength(2)])],
      Etiqueta: [item.Etiqueta || '', Validators.compose([Validators.required, Validators.maxLength(45)])],
      Naturaleza: [item.IDNaturaleza || 1, Validators.required],
      Estado: [item.Estado || false, Validators.required],
      ID: [item.ID || 0, Validators.required]
    })
  }
  submit() {
    if (this.itemForm.value.Estado) {
      this.itemForm.value.Estado = 'ACT';
    } else {
      this.itemForm.value.Estado = 'INA';
    }
    this.dialogRef.close(this.itemForm.value);
  }
}
