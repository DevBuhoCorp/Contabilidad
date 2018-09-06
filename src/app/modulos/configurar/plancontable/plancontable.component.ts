import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { TreeNode } from 'primeng/components/common/api';
import { PopupComponentPC } from './popup/popup.component';
import { AppLoaderService } from '../../../shared/servicios/app-loader/app-loader.service';
import { AppConfirmService } from '../../../shared/servicios/app-confirm/app-confirm.service';
import { CrudService } from '../../../shared/servicios/crud.service';
import { PlanContable } from './plancontable.model';
import { ModeloPlanContable } from '../modelospc/modelopc.model';
import { CuentaContable } from './cuentacontable.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-plancontable',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './plancontable.component.html',
  styleUrls: [
    './plancontable.component.css',
  ]
})
export class PlancontableComponent implements OnInit, OnDestroy {
  selectedValue: string = '';
  filesTree0: TreeNode[];
  selectedFile: any ;
  selectedFile_2: any = null ;

  Modelos: ModeloPlanContable[];
  Cuentas: any[];
  public items: any[];
  public getItemSub: Subscription;
  constructor(
    private dialog: MatDialog,
    private httpClient: HttpClient,
    private snack: MatSnackBar,
    private crudService: CrudService,
    private loader: AppLoaderService,
    private confirmService: AppConfirmService,
  ) {
    this.crudService.ListarDatos('modeloplancontable', 'All', 0).map((response) => {
      return response.json() as ModeloPlanContable[];
    }).toPromise().then(x => {
      this.Modelos = x;
    });
  }

  ngOnInit() {

  }

  CargarPlan() {
    this.crudService.ListarDatos('plancontable', 'ALL', this.selectedValue).map((response) => {
      return response.json();
    }).toPromise().then(x => {
      this.filesTree0 = JSON.parse(x[0].data) as TreeNode[];
    });
  }
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe();
    }
  }

  async openPopUp(data: any = {}, isNew?) {
    // data.promise = await this.httpClient.get(`http://localhost:8000/api/plancontable/${ this.selectedValue }/cuentacontable/${ data.data }`).toPromise();
    let title = isNew ? 'Agregar' : 'Actualizar';
    data.promise = undefined;
    /*if (!isNew)
      data.promise = await this.httpClient.get(`http://localhost:8000/api/cuentacontable/${ data.data }`).toPromise();
      else
      data.promise = await this.httpClient.get(`http://localhost:8000/api/plancontable/${ this.selectedValue }/cuentacontable/${ data.data }`).toPromise();*/
    if (!isNew) {
      data.promise = await this.crudService.ListarDatosAsync("cuentacontable", "ID", data.data);
    }
    else {
      data.promise2 = await this.crudService.ListarDatosAsync("numerocuenta", data.data, this.selectedValue);;
    }

    let dialogRef: MatDialogRef<any> = this.dialog.open(PopupComponentPC, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: data, PlanContable: this.selectedValue }
    });


    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          // If user press cancel
          return;
        }
        this.loader.open();
        if (isNew) {
          console.log(res);
         this.crudService.Insertar(res, 'cuentacontable/').subscribe(data => {
            this.CargarPlan();
            this.loader.close();
            this.snack.open('Agregado!', 'OK', { duration: 4000 });
          });
        } else {
          this.crudService.Actualizar(data.data, res, 'cuentacontable/').subscribe(data => {
            this.CargarPlan();
            this.loader.close();
            this.snack.open('Actualizado!', 'OK', { duration: 4000 });
          });
        }
      });
  }

  deleteItem(row) {
    this.confirmService.confirm({ message: `Eliminar ${row.Etiqueta}?` })
      .subscribe(res => {
        if (res) {
          this.loader.open();
          this.crudService.Eliminar(row.ID, 'modeloplancontable/').subscribe(data => {
            // this.getItems("All", 0);
            this.loader.close();
            this.snack.open('Eliminado!', 'OK', { duration: 4000 });
          });
        }
      });

  }

  nodeSelect(event) {

    // if ( this.selectedFile_2 == null || this.selectedFile_2.data !=  this.selectedFile.data )
    //   this.selectedFile_2 = this.selectedFile;
    // else
    //   this.selectedFile_2 = null;

    if( this.selectedFile_2 == null )
      this.selectedFile_2 = this.selectedFile;
    else if ( this.selectedFile_2.data ==  this.selectedFile.data )
      this.selectedFile = null;
    else
      this.selectedFile_2 = this.selectedFile;
  }

  nodeUnselect(event) {
    console.log("unselect");
  }


}



