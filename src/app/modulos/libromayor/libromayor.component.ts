import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { LibroMayorService } from './libromayor.service';
import { AppLoaderService } from '../../shared/servicios/app-loader/app-loader.service';
import { AppConfirmService } from '../../shared/servicios/app-confirm/app-confirm.service';
import { PopupLibroMayor } from './popup/popup.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../../shared/servicios/crud.service';


@Component({
  selector: 'app-libromayor',
  templateUrl: './libromayor.component.html',
  styles: []
})
export class LibromayorComponent implements OnInit {
  pageSize = [3, 5, 10, 20];
  checked = false;
  public Debe: number = 0;
  public Haber: number = 0;
  public ListaDetalles: any = [];
  public Transaccion: any = [{
    "Cabecera": [],
    "Detalle": [],
  }];
  public Cabecera: any = [];
  public creado: Boolean = false;
  public trans: Boolean = false;
  public itemForm: FormGroup;
  public items: any[];
  public getItemSub: Subscription;
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: CrudService,
    private loader: AppLoaderService,
    private confirmService: AppConfirmService,
    private fb: FormBuilder,
  ) {
    this.buildItemForm();
  }

  ngOnInit() {

  }

  buildItemForm() {
    this.itemForm = this.fb.group({
      Fecha: ['', Validators.required],
      SerieDocumento: ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
      Etiqueta: ['', Validators.compose([Validators.maxLength(45)])],
    });

  }

  submitTransaccion() {
    this.trans = true;
    this.itemForm.value.Fecha = this.itemForm.value.Fecha.toDateString();
    this.snack.open('Agregado!', 'OK', { duration: 4000 });
    this.creado = true;
    this.Cabecera = this.itemForm.value;
    this.itemForm.disable();
  }
  async openPopUp(data: any = {}, isNew?) {
    if (isNew) {
      data.ID = this.ListaDetalles.length + 1;
    }
    const title = isNew ? 'Agregar' : 'Actualizar';
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
        if (isNew) {
          this.Transaccion[0].Detalle = this.Transaccion[0].Detalle.concat(res);
          this.Debe = this.Debe + res.Debe;
          this.Haber = this.Haber + res.Haber;
          console.log(this.Debe);
          console.log(this.Haber);
          this.ListaDetalles = this.ListaDetalles.concat(res);
          this.snack.open('Agregado!', 'OK', { duration: 4000 });
        } else {
          console.log(res);
          this.ListaDetalles = this.ListaDetalles.map(i => {
            if (i.ID == res.ID) {

              console.log(i);
              console.log(res);

              this.Debe = this.Debe + (res.Debe - i.Debe);
              this.Haber = this.Haber + (res.Haber - i.Haber);
              console.log(this.Debe);
              console.log(this.Haber);
              Object.assign(i, res);
              this.loader.close();
              this.snack.open('Actualizado!', 'OK', { duration: 4000 });
            }
            return i;
          })
        }


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

  Guardar() {
    if (this.Debe == this.Haber) {
      this.Cabecera.Estado = this.checked;
      this.Transaccion[0].Cabecera = this.Transaccion[0].Cabecera.concat(this.Cabecera);
      console.log(this.Transaccion[0].Cabecera);
      let temp = JSON.parse(JSON.stringify(this.Transaccion));
      temp[0].Detalle.map(row => delete row.Cuenta);
      temp[0].Detalle.map(row => delete row.ID);
      this.crudService.Insertar(temp[0], "transaccion").subscribe(async data => {
        this.snack.open('Transacción Finalizada!', 'OK', { duration: 4000 });
        this.trans = false;
        this.Transaccion = [{
          "Cabecera": [],
          "Detalle": [],
        }];
        this.ListaDetalles = [];
        this.Cabecera = [];
        this.itemForm.reset();
        this.itemForm.enable();
      }, error => {
        console.log(error._body);
        this.snack.open(error._body, 'OK', { duration: 4000 });
      });
    }
    else{
      this.snack.open("La sumatoria de los asientos no cuadra", 'OK', { duration: 4000 });
    }

  }

  Cancelar() {
    this.trans = false;
    this.Transaccion = [{
      "Cabecera": [],
      "Detalle": [],
    }];
    this.ListaDetalles = [];
    this.Cabecera = [];
    this.itemForm.reset();
    this.itemForm.enable();
    this.creado = false;
  }

}