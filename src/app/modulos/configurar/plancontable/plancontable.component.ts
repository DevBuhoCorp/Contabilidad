import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { PopupComponentPC } from './popup/popup.component';
import { AppLoaderService } from '../../../shared/servicios/app-loader/app-loader.service';
import { AppConfirmService } from '../../../shared/servicios/app-confirm/app-confirm.service';
import { PlanContableService } from './plancontable.service';

@Component({
  selector: 'app-plancontable',
  templateUrl: './plancontable.component.html',
  styles: []
})
export class PlancontableComponent implements OnInit, OnDestroy {
  selectedValue: string = '';
  Planes = [
    { value: 1, viewValue: 'Plan Contable 1' },
    { value: 2, viewValue: 'Plan Contable 2' },
    { value: 3, viewValue: 'Plan Contable 3' },
    { value: 4, viewValue: 'Plan Contable 4' },
    { value: 5, viewValue: 'Plan Contable 5' },
    { value: 6, viewValue: 'Plan Contable 6' },
  ];
  public items: any[];
  public getItemSub: Subscription;
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: PlanContableService,
    private loader: AppLoaderService,
    private confirmService: AppConfirmService,
  ) { }

  ngOnInit() {
    this.getItems();
    console.log(this.crudService.getItems().subscribe(data => {
      this.items = data;
    }));
  }
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe();
    }
  }

  getItems() {
    this.getItemSub = this.crudService.getItems()
      .subscribe(data => {
        this.items = data;
      });
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
          this.crudService.addItem(res)
            .subscribe(data => {
              this.items = data;
              this.loader.close();
              this.snack.open('Agregado!', 'OK', { duration: 4000 })
            })
        } else {
          this.crudService.updateItem(data.ID, res)
            .subscribe(data => {
              this.items = data;
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
          this.crudService.removeItem(row)
            .subscribe(data => {
              this.items = data;
              this.loader.close();
              this.snack.open('Eliminado!', 'OK', { duration: 4000 })
            })
        }
      })
  }
}
