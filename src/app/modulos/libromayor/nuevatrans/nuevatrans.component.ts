import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
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
  creado: Boolean = false;
  public itemForm: FormGroup;
  public detalleForm: FormGroup;
  public cabeceraForm: FormGroup;
  Transaccion: any = [];
  constructor(private fb: FormBuilder, private crudService: CrudService, private snack: MatSnackBar, ) {
    this.CargarAuto();
    this.buildItemForm();
    this.cuenta = this.detalleForm.controls['Cuenta'].valueChanges
      .startWith(null)
      .map(name => this.filtrar(name));

  }

  ngOnInit() {
    

  }

  async CargarAuto() {
    this.Cuentas = await this.crudService.SeleccionarAsync("autocomplete", { Modelo: 6 });
    
  }

  buildItemForm() {
    this.itemForm = this.fb.group({
      Fecha: ['', Validators.required],
      SerieDocumento: ['', Validators.required],
    });

    this.detalleForm = this.fb.group({
      Cuenta: ['', Validators.required],
      Descripcion: ['', Validators.required],
      Etiqueta: ['', Validators.required],
      Debe: ['', Validators.required],
      Haber: ['', Validators.required],
    })

  }

  buildCabeceraForm() {
    this.cabeceraForm = this.fb.group({
      NumMovimiento: [{ value: this.Transaccion.NumMovimiento, disabled: true }],
      Fecha: [{ value: this.Transaccion.Fecha, disabled: true }],
      DocContable: [{ value: this.Transaccion.DocContable, disabled: true }],
      FechaC: [{ value: this.Transaccion.FechaC, disabled: true }],

    });
  }


  submitTransaccion() {

    this.itemForm.value.Fecha = this.itemForm.value.Fecha.toDateString();
    this.crudService.Insertar(this.itemForm.value, "nuevomovimiento").subscribe(data => {
      this.snack.open('Agregado!', 'OK', { duration: 4000 });
      this.creado = true;
      this.Transaccion = data;
      this.buildCabeceraForm();
    });

  }
  submitDetalle() { }

  filtrar(val: string) {
    return val ? this.Cuentas.filter(s => new RegExp(`^${val}`).test(s))
      : this.Cuentas;
  }
}
