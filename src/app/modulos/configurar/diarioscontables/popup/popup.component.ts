import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CrudService } from '../../../../shared/servicios/crud.service';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: []
})
export class PopupComponentDC implements OnInit {
  Naturaleza:any = [];

  public itemForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupComponentDC>,
    private fb: FormBuilder,
    private crudService: CrudService
  ) { }

  async CargarCombo(){
    this.Naturaleza = await this.crudService.SeleccionarAsync("naturaleza");
  }

  ngOnInit() {
    this.CargarCombo();
    if (Array.isArray(this.data.payload)) {
      this.buildItemForm(this.data.payload[0]);
    } else {
      this.buildItemForm(this.data.payload);
    }
  }

  buildItemForm(item) {
    this.itemForm = this.fb.group({
      Codigo: [item.Codigo || '', Validators.compose([Validators.required, Validators.maxLength(2)])],
      Etiqueta: [item.Etiqueta || '', Validators.compose([Validators.required, Validators.maxLength(45)])],
      IDNaturaleza: [item.IDNaturaleza || 1, Validators.required],
      Estado: [ item.Estado == 'ACT' || false ],
     // ID: [item.ID || 0, Validators.required]
    })
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }
}
