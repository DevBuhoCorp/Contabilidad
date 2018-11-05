import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CrudService} from '../../../shared/servicios/crud.service';

@Component({
  selector: 'app-changeempresa',
  templateUrl: './changeempresa.component.html',
  styles: []
})
export class ChangeempresaComponent implements OnInit {
  selectEmpresa: any;
  empresas: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private crudService: CrudService,
    public dialogRef: MatDialogRef<ChangeempresaComponent>,
  ) { }

  async ngOnInit() {
    this.empresas = await this.crudService.SeleccionarAsync(`usuario/empresa`);
  }

  asignar(){
    let item = this.empresas.filter(data => data.ID == this.selectEmpresa)[0];
    localStorage.setItem('Empresa', JSON.stringify(item));
    this.dialogRef.close(true);
  }

}
