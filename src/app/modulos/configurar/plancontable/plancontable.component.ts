import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { PopupComponentPC } from './popup/popup.component';
import { AppLoaderService } from '../../../shared/servicios/app-loader/app-loader.service';
import { AppConfirmService } from '../../../shared/servicios/app-confirm/app-confirm.service';
import { CrudService } from '../../../shared/servicios/crud.service';
import { PlanContable } from './plancontable.model';
import { ModeloPlanContable } from '../modelospc/modelopc.model';

@Component({
  selector: 'app-plancontable',
  templateUrl: './plancontable.component.html',
  styles: []
})
export class PlancontableComponent implements OnInit, OnDestroy {
  Modelos = [];
  public items: any[];
  public getItemSub: Subscription;
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: CrudService,
    private loader: AppLoaderService,
    private confirmService: AppConfirmService,
  ) {
    this.crudService.ListarDatos("modeloplancontable", "All", 0).map((response) => {
      return response.json() as ModeloPlanContable[];
    }).toPromise().then(x => {
      this.Modelos = x;
    })
  }

  ngOnInit() {
    this.getItems("All", 0)
  }
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe()
    }
  }
  getItems(opt, id) {
    this.crudService.ListarDatos("modeloplancontable", opt, id).map((response) => {
      return response.json() as ModeloPlanContable[];
    }).toPromise().then(x => {
      this.items = x;
      let index = 0;
      for (let i of this.items) {

        if (i.Estado == 'ACT') {
          this.items[index].Estado = true;
        }
        else {
          this.items[index].Estado = false;
        }
        index++;
      }
    })

  }
  openPopUp(data: any = {}, isNew?) {

    let title = isNew ? 'Agregar' : 'Actualizar';

    let dialogRef: MatDialogRef<any> = this.dialog.open(PopupComponentPC, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: data }
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          // If user press cancel
          return;
        }
        this.loader.open();
        if (isNew) {
          this.crudService.Insertar(res, "modeloplancontable/").subscribe(data => {
            this.getItems("All", 0);
            this.loader.close();
            this.snack.open('Agregado!', 'OK', { duration: 4000 })
          })
        } else {
          this.crudService.Actualizar(data.ID, res, "modeloplancontable/").subscribe(data => {
            this.getItems("All", 0);
            this.loader.close();
            this.snack.open('Actualizado!', 'OK', { duration: 4000 })
          })
        }
      })
  }
  deleteItem(row) {
    this.confirmService.confirm({ message: `Eliminar ${row.Etiqueta}?` })
      .subscribe(res => {
        if (res) {
          this.loader.open();
          this.crudService.Eliminar(row.ID, "modeloplancontable/").subscribe(data => {
            this.getItems("All", 0);
            this.loader.close();
            this.snack.open('Eliminado!', 'OK', { duration: 4000 })
          })
        }
      })

  }


}