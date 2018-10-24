import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../shared/servicios/crud.service';

@Component({
  selector: 'app-hojatrabajo',
  templateUrl: './hojatrabajo.component.html',
  styles: []
})
export class HojatrabajoComponent implements OnInit {
  items: any = [];
  constructor(private crudService: CrudService) { }

  ngOnInit() {
    this.getItems();
  }

  async getItems() {
    this.items = await this.crudService.SeleccionarAsync('hojabalance/' + 11);
  }

}
