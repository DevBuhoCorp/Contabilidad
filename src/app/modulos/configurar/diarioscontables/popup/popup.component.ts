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
    if (this.data.title == 'Actualizar') {
      this.crudService.ListarDatos("diarios", "ID", this.data.payload.ID).map((response) => {
        return response.json() as DiarioContable[];
      }).toPromise().then(x => {
        this.data.payload = x;
      })

    }
    this.buildItemForm(this.data.payload)
  }
  buildItemForm(item) {
    this.itemForm = this.fb.group({
      Codigo: [item.Codigo || '', Validators.required],
      Etiqueta: [item.Etiqueta || ''],
      Naturaleza: [item.IDNaturaleza || 0],
      Estado: [item.Estado || false],
      ID: [item.ID || 0]
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
