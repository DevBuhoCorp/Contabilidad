import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { CrudService } from '../../../shared/servicios/crud.service';
import { AppLoaderService } from '../../../shared/servicios/app-loader/app-loader.service';
import { AppConfirmService } from '../../../shared/servicios/app-confirm/app-confirm.service';
import { PopupLibroMayor } from '../popup/popup.component';
import { TemplateBinding } from '@angular/compiler';

@Component({
  selector: 'app-nuevatrans',
  templateUrl: './nuevatrans.component.html',
  styles: []
})
export class NuevatransComponent implements OnInit {
  cuenta: any = {
    ID: 0
  };
  ListaDetalles: any = [];
  Transaccion: any = [{
    "Cabecera": [],
    "Detalle": [],
  }];
  Cuentas: any = [];
  creado: Boolean = false;
  public itemForm: FormGroup;
  public detalleForm: FormGroup;
  public cabeceraForm: FormGroup;
  Cabecera: any = [];
  constructor(private fb: FormBuilder,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: CrudService,
    private loader: AppLoaderService,
    private confirmService: AppConfirmService, ) {
    this.CargarAuto();
    this.buildItemForm();
    this.cuenta = this.detalleForm.controls['IDCuenta'].valueChanges
      .startWith(null)
      .map(name =>
        this.filtrar(name));

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
      IDCuenta: [this.cuenta.ID || 0, Validators.required],
      Etiqueta: ['', Validators.required],
      Debe: ['', Validators.required],
      Haber: ['', Validators.required],
      Cuenta: ['']
    })

  }

  buildCabeceraForm() {
    this.cabeceraForm = this.fb.group({
      Fecha: [{ value: this.Cabecera.FechaA, disabled: true }],
      DocContable: [{ value: this.Cabecera.SerieDocumento, disabled: true }],
      FechaC: [{ value: this.Cabecera.Fecha, disabled: true }],

    });
  }


  submitTransaccion() {

    this.itemForm.value.Fecha = this.itemForm.value.Fecha.toDateString();
    this.snack.open('Agregado!', 'OK', { duration: 4000 });
    this.creado = true;
    this.Cabecera = this.itemForm.value;
    let hoy = new Date();
    this.Cabecera.FechaA = hoy.toDateString();
    this.Transaccion[0].Cabecera = this.Transaccion[0].Cabecera.concat(this.Cabecera);
    this.buildCabeceraForm();

  }
  submitDetalle() {
    this.detalleForm.value.Cuenta = this.detalleForm.value.IDCuenta.cuenta;
    this.detalleForm.value.IDCuenta = this.detalleForm.value.IDCuenta.ID;
    this.Transaccion[0].Detalle = this.Transaccion[0].Detalle.concat(this.detalleForm.value);
    this.ListaDetalles = this.ListaDetalles.concat(this.detalleForm.value);
    this.snack.open('Agregado!', 'OK', { duration: 4000 });
    this.detalleForm.reset();
  }

  displayFn(cuenta?): string | undefined {
    return cuenta ? cuenta.cuenta : undefined;
  }

  filtrar(val: string) {

    return val ? this.Cuentas.filter(s => new RegExp(`^${val}`).test(s))
      : this.Cuentas;
  }

  async openPopUp(data: any = {}) {
    console.log(data);
    const title = 'Actualizar';
    const dialogRef: MatDialogRef<any> = this.dialog.open(PopupLibroMayor, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: data }
    });
    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          // If user press cancel
          return;
        }
        this.loader.open();
        /* this.crudService.Actualizar(data.ID, res, 'modeloplancontable/').subscribe(data => {
           this.getItems(1);
           this.loader.close();
           this.snack.open('Actualizado!', 'OK', { duration: 4000 });
         });*/
        this.ListaDetalles = this.ListaDetalles.map(i => {
          if (i.ID === data.ID) {
            Object.assign({}, i, res);
            this.loader.close();
            this.snack.open('Actualizado!', 'OK', { duration: 4000 });
          }
          return i;
        })

      });
  }
  deleteItem(row) {
    this.confirmService.confirm({ message: `Eliminar ${row.Etiqueta}?` })
      .subscribe(res => {
        if (res) {
          let i = this.ListaDetalles.indexOf(row.ID);
          this.ListaDetalles.splice(i, 1);
        }
      })

  }

  async Guardar() {
    let temp = JSON.parse(JSON.stringify(this.Transaccion));
    temp[0].Detalle.map(row => delete row.Cuenta);
    this.crudService.Insertar(temp[0], "transaccion").subscribe(async data => {
      this.snack.open('Transacción Finalizada!', 'OK', { duration: 4000 });
    });

  }
}
