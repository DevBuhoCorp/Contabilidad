import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { CrudService } from '../../../shared/servicios/crud.service';

@Component({
  selector: 'app-nuevatrans',
  templateUrl: './nuevatrans.component.html',
  styles: []
})
export class NuevatransComponent implements OnInit {
  cuenta: any;
  Cuentas: any = [];
  public itemForm: FormGroup;
  public detalleForm: FormGroup;
  constructor(private fb: FormBuilder, private crudService: CrudService) {
    this.detalleForm = this.fb.group({
      Cuenta: ['', Validators.required],
      Etiqueta: ['', Validators.required],
      Debe: ['', Validators.required],
      Haber: ['', Validators.required],
    })
    this.cuenta = this.detalleForm.controls['Cuenta'].valueChanges
      .startWith(null)
      .map(name => this.filtrar(name));
  }

  ngOnInit() {
    this.CargarAuto();
    this.buildItemForm();

  }

  async CargarAuto() {
    this.Cuentas = await this.crudService.SeleccionarAsync("autocomplete", { Modelo: 6 });
    console.log(this.Cuentas);
  }

  buildItemForm() {
    this.itemForm = this.fb.group({
      NumeroTrans: [{ value: '', disabled: true }],
      Fecha: ['', Validators.required],
      Estacion: [{ value: '', disabled: true }]
    })


  }
  submitTransaccion() { }
  submitDetalle() { }

  filtrar(val: string) {
    return val ? this.Cuentas.filter(s => new RegExp(`${val}`).test(s))
      : this.Cuentas;
  }
}
