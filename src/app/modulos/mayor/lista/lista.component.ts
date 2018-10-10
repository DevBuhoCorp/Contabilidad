import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../../../shared/servicios/crud.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: []
})
export class ListaMayorComponent implements OnInit {
  pageSize = [3, 5, 10, 20];
  selPageSize: any = this.pageSize[0];
  items: any = {
    detalles: {
      data: [{
        saldo: 0,
      }

      ],
      page: 1,
      total: 0,
      per_page: 0,

    },
    Debe: 0,
    Haber: 0
  };
  IDTransaccion;
  Saldo = 0;

  public TotalDebe: number = 0;
  public TotalHaber: number = 0;
  constructor(private router: ActivatedRoute,
    private crudService: CrudService,
  ) { }

  ngOnInit() {
    this.router.params.subscribe(async (params) => {
      this.IDTransaccion = params['id'];
      this.getItems();

      
    });


  }
  async getItems(indice = 1) {
    this.items = await this.crudService.SeleccionarAsync('transporcuenta/' + this.IDTransaccion, { page: indice, psize: this.selPageSize });
    if(indice==1){
      this.Saldo = 0;
    }
    this.items.detalles.data.map(i => {
      this.Saldo = this.Saldo + ( Number(i.Debe) - Number(i.Haber));
      i.saldo = this.Saldo;
    })
  }


  async setPage(event) {

    this.getItems(event.offset + 1);

  }

}
