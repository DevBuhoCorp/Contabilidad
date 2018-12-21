import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialogRef,
  MatDialog,
  MatSnackBar,
  MAT_DIALOG_DATA
} from "@angular/material";
import { PopupTransaccion } from "../../transacciones/popup/popup.component";
import { AppConfirmService } from "src/app/shared/servicios/app-confirm/app-confirm.service";

@Component({
  selector: "app-ajuste",
  templateUrl: "./ajuste.component.html",
  styles: []
})
export class PopUpAjusteComponent implements OnInit {
  public ListaDetalles: any = [];
  public Transaccion: any = [
    {
      Cabecera: [],
      Detalle: []
    }
  ];
  public Debe: number = 0;
  public Haber: number = 0;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopUpAjusteComponent>,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private confirmService: AppConfirmService
  ) {}

  ngOnInit() {
    console.log(this.data.payload);
    this.ListaDetalles = this.data.payload;
    this.ListaDetalles.forEach(row => {
      this.Debe += row.Debe;
      this.Haber += row.Haber;
    });
  }

  async openPopUp(data: any = {}, isNew?) {
    if (isNew) {
      data.ID = this.ListaDetalles.length + 1;
    }
    const title = isNew ? "Agregar" : "Actualizar";
    const dialogRef: MatDialogRef<any> = this.dialog.open(PopupTransaccion, {
      width: "720px",
      disableClose: true,
      data: { title: title, payload: data }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        // If user press cancel
        return;
      }
      if (isNew) {
        this.Transaccion[0].Detalle = this.Transaccion[0].Detalle.concat(res);
        this.Debe = this.Debe + res.Debe;
        this.Haber = this.Haber + res.Haber;
        res.Ajuste = true;
        this.ListaDetalles = this.ListaDetalles.concat(res);
        this.snack.open("Agregado!", "OK", { duration: 4000 });
      } else {
        this.ListaDetalles = this.ListaDetalles.map(i => {
          if (i.ID == res.ID) {
            this.Debe = this.Debe + (res.Debe - i.Debe);
            this.Haber = this.Haber + (res.Haber - i.Haber);
            Object.assign(i, res);
            this.snack.open("Actualizado!", "OK", { duration: 4000 });
          }
          return i;
        });
      }
    });
  }

  deleteItem(row) {
    this.confirmService
      .confirm({ message: `Eliminar Detalle?` })
      .subscribe(res => {
        if (res) {
          let i = this.ListaDetalles.indexOf(row.ID);
          this.Debe = this.Debe - row.Debe;
          this.Haber = this.Haber - row.Haber;
          this.ListaDetalles.splice(i, 1);
        }
      });
  }
  return() {
    this.dialogRef.close(true);
  }

  save() {
    if (this.Debe == this.Haber) {
      let Ajustes = [];
      this.ListaDetalles.forEach(row => {
        if (row.Ajuste) {
          Ajustes.push(row);
        }
      });
      this.dialogRef.close(Ajustes);
    } else {
      this.snack.open("Transacción no Ajustada!", "OK", { duration: 4000 });
    }
  }
}
