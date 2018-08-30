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
    if (this.data.title == 'Actualizar') {
      this.crudService.ListarDatos("diarios", "ID", this.data.payload.ID).map((response) => {
        return response.json() as ModeloPlanContable[];
      }).toPromise().then(x => {
        this.data.payload = x;
      })

    }
    this.buildItemForm(this.data.payload)
  }
  buildItemForm(item) {
    this.itemForm = this.fb.group({
      ModelosPC: [item.Modelo || '' ],
      Etiqueta: [item.Etiqueta || '',Validators.required],
      Pais: [item.Pais || ''],
      Estado: [item.Estado || false]
    })
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }
}
