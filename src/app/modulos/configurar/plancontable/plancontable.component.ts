import {Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import {TreeNode} from 'primeng/components/common/api';
import { PopupComponentPC } from './popup/popup.component';
import { AppLoaderService } from '../../../shared/servicios/app-loader/app-loader.service';
import { AppConfirmService } from '../../../shared/servicios/app-confirm/app-confirm.service';
<<<<<<< HEAD
import { CrudService } from '../../../shared/servicios/crud.service';
import { PlanContable } from './plancontable.model';
import { ModeloPlanContable } from '../modelospc/modelopc.model';
=======
import { PlanContableService } from './plancontable.service';
import {CrudService} from '../../../shared/servicios/crud.service';

>>>>>>> origin/kbsg

@Component({
  selector: 'app-plancontable',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './plancontable.component.html',
  styleUrls: [
    './plancontable.component.css',
  ]
})
export class PlancontableComponent implements OnInit, OnDestroy {
<<<<<<< HEAD
  Modelos = [];
=======
  selectedValue: string = '';

  filesTree0: TreeNode[];
  selectedFile: TreeNode;

  Planes = [
    { value: 1, viewValue: 'Plan Contable 1' },
    { value: 2, viewValue: 'Plan Contable 2' },
    { value: 3, viewValue: 'Plan Contable 3' },
    { value: 4, viewValue: 'Plan Contable 4' },
    { value: 5, viewValue: 'Plan Contable 5' },
    { value: 6, viewValue: 'Plan Contable 6' },
  ];
>>>>>>> origin/kbsg
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
<<<<<<< HEAD
    this.getItems("All", 0)
=======
    this.getItems();
    // console.log(this.crudService.getItems().subscribe(data => {
    //   this.items = data;
    // }));
    this.crudService.ListarDatos('plancontable','ALL', 0).map((response) => {
      return response.json();
    }).toPromise().then(x => {
      this.filesTree0 = JSON.parse(x[0].data) as TreeNode[];
    });
>>>>>>> origin/kbsg
  }
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe();
    }
  }
<<<<<<< HEAD
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

=======

  getItems() {
    // this.getItemSub = this.crudService.getItems()
    //   .subscribe(data => {
    //     this.items = data;
    //   });
>>>>>>> origin/kbsg
  }

  openPopUp(data: any = {}, isNew?) {
<<<<<<< HEAD

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
=======
    // let title = isNew ? 'Agregar' : 'Actualizar';
    // let dialogRef: MatDialogRef<any> = this.dialog.open(PopupComponentPC, {
    //   width: '720px',
    //   disableClose: true,
    //   data: { title: title, payload: data }
    // })
    // dialogRef.afterClosed()
    //   .subscribe(res => {
    //     if (!res) {
    //       // If user press cancel
    //       return;
    //     }
    //     this.loader.open();
    //     if (isNew) {
    //       this.crudService.addItem(res)
    //         .subscribe(data => {
    //           this.items = data;
    //           this.loader.close();
    //           this.snack.open('Agregado!', 'OK', { duration: 4000 })
    //         })
    //     } else {
    //       this.crudService.updateItem(data.ID, res)
    //         .subscribe(data => {
    //           this.items = data;
    //           this.loader.close();
    //           this.snack.open('Actualizado!', 'OK', { duration: 4000 })
    //         })
    //     }
    //   })
>>>>>>> origin/kbsg
  }

  deleteItem(row) {
<<<<<<< HEAD
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
=======
    // this.confirmService.confirm({ message: `Eliminar ${row.Etiqueta}?` })
    //   .subscribe(res => {
    //     if (res) {
    //       this.loader.open();
    //       this.crudService.removeItem(row)
    //         .subscribe(data => {
    //           this.items = data;
    //           this.loader.close();
    //           this.snack.open('Eliminado!', 'OK', { duration: 4000 })
    //         })
    //     }
    //   })
  }

  nodeSelect(event) {
    console.log(event.node);
  }

  nodeUnselect(event) {
    console.log(event.node);
  }
}
>>>>>>> origin/kbsg
