import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { AppLoaderService } from '../../shared/servicios/app-loader/app-loader.service';
import { AppConfirmService } from '../../shared/servicios/app-confirm/app-confirm.service';
import { PopupTransaccion } from './popup/popup.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CrudService } from '../../shared/servicios/crud.service';
import { ToolsService } from '../../shared/servicios/tools.service';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styles: []
})
export class TransaccionesComponent implements OnInit {
  checked = false;
  public Debe: number = 0;
  public Haber: number = 0;
  public ListaDetalles: any = [];
  public Transaccion: any = [{
    'Cabecera': [],
    'Detalle': [],
  }];
  public Cabecera: any = [];
  public trans: Boolean = false;
  public itemForm: FormGroup;

  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: CrudService,
    private loader: AppLoaderService,
    private confirmService: AppConfirmService,
    private fb: FormBuilder,
    private toolsService:ToolsService) {
    this.buildItemForm();
  }

  ngOnInit() {
    

  }

  buildItemForm() {
    this.itemForm = this.fb.group({
      Fecha: ['', Validators.required],
      SerieDocumento: ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
      Etiqueta: [''],
    });

  }

  submitTransaccion() {
    this.trans = true;
    this.itemForm.value.Fecha = this.itemForm.value.Fecha.toDateString();
    this.snack.open('Agregado!', 'OK', { duration: 4000 });
    this.Cabecera = this.itemForm.value;
    this.itemForm.disable();
  }

  async openPopUp(data: any = {}, isNew?) {
    if (isNew) {
      data.ID = this.ListaDetalles.length + 1;
    }
    const title = isNew ? 'Agregar' : 'Actualizar';
    const dialogRef: MatDialogRef<any> = this.dialog.open(PopupTransaccion, {
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
          this.ListaDetalles = this.ListaDetalles.concat(res);
          this.snack.open('Agregado!', 'OK', { duration: 4000 });
        } else {
          this.ListaDetalles = this.ListaDetalles.map(i => {
            if (i.ID == res.ID) {
              this.Debe = this.Debe + (res.Debe - i.Debe);
              this.Haber = this.Haber + (res.Haber - i.Haber);
              Object.assign(i, res);
              this.loader.close();
              this.snack.open('Actualizado!', 'OK', { duration: 4000 });
            }
            return i;
          });
        }


      });
  }

  deleteItem(row) {
    this.confirmService.confirm({ message: `Eliminar Detalle?` })
      .subscribe(res => {
        if (res) {

          let i = this.ListaDetalles.indexOf(row.ID);
          this.Debe = this.Debe - row.Debe;
          this.Haber = this.Haber - row.Haber;
          this.ListaDetalles.splice(i, 1);

        }
      });

  }

  Inicializar() {
    this.trans = false;
    this.Transaccion = [{
      'Cabecera': [],
      'Detalle': [],
    }];
    this.ListaDetalles = [];
    this.Cabecera = [];
    this.Debe = 0;
    this.Haber = 0;
    this.itemForm.reset();
    this.itemForm.enable();
  }

  Guardar() {
    if (this.Debe == this.Haber) {
      this.Cabecera.Estado = this.checked;
      this.Cabecera.Debe = this.Debe;
      this.Cabecera.Haber = this.Haber;
      this.Transaccion[0].Cabecera = this.Transaccion[0].Cabecera.concat(this.Cabecera);
      let temp = JSON.parse(JSON.stringify(this.Transaccion));
      temp[0].Detalle.map(row => delete row.Cuenta);
      temp[0].Detalle.map(row => delete row.ID);
      this.crudService.Insertar(temp[0], 'transaccion/' + this.toolsService.getEmpresaActive().IDEmpresa).subscribe(async data => {
        this.snack.open('Transacción Finalizada!', 'OK', { duration: 4000 });
        this.Inicializar();
      }, error => {
        this.snack.open(error._body, 'OK', { duration: 4000 });
      });
    }
    else {
      this.snack.open('Los Totales de la transacción no cuadran', 'OK', { duration: 4000 });
    }

  }


}
