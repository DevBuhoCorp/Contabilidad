import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../shared/servicios/crud.service';

@Component({
  selector: 'app-estadoresultado',
  templateUrl: './estadoresultado.component.html',
  styles: []
})
export class EstadoresultadoComponent implements OnInit {
  items: any = [];
  constructor(private crudService: CrudService) {
  }


  ngOnInit() {
    this.getItems();
  }

  async getItems() {
    //this.items = await this.crudService.SeleccionarAsync('estadoresultado/' + 11);
    this.items = await this.crudService.SeleccionarAsync('report_estadoresultado/' + 11);
  }


}
