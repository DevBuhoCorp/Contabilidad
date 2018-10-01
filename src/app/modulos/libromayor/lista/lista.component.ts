import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../../../shared/servicios/crud.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: []
})
export class ListaDetallesComponent implements OnInit {
  pageSize = [3, 5, 10, 20];
  selPageSize: any = this.pageSize[0];
  items: any = {
    data: [],
    page: 1,
    total: 0,
    per_page: 0
  };
  IDTransaccion;
  constructor(private router: ActivatedRoute,
    private crudService: CrudService,
  ) { }

  ngOnInit() {
    this.router.params.subscribe(async (params) => {
      this.IDTransaccion = params['id'];
      this.getItems();
    });
  }
  async getItems(indice=1){
    this.items = await this.crudService.SeleccionarAsync('transaccion/' + this.IDTransaccion, { page: indice, psize: this.selPageSize });
  }

  async setPage(event) {
    this.getItems(event.offset + 1);
  }

}
