import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../shared/servicios/crud.service';

@Component({
  selector: 'app-balancefinal',
  templateUrl: './balancefinal.component.html',
  styles: []
})
export class BalancefinalComponent implements OnInit {
  items: any = [];
  constructor(private crudService: CrudService) {
  }


  ngOnInit() {
    this.getItems();

  }

  async getItems() {
    this.items = await this.crudService.SeleccionarAsync('report_balancefinal');
  }



}
