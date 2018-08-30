import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CuentaProductoService } from './cuentasproductos.service';

@Component({
  selector: 'app-cuentasproductos',
  templateUrl: './cuentasproductos.component.html',
  styles: []
})
export class CuentasproductosComponent implements OnInit, OnDestroy {
  Modos = [
    { value: 1, viewValue: 'Modo ventas' },
    { value: 2, viewValue: 'Modo compras' },
  ];
  public items: any[];
  public getItemSub: Subscription;
  constructor(
    
    private crudService: CuentaProductoService,
   
  ) { }

  ngOnInit() {
    this.getItems()
  }
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe()
    }
  }
  getItems() {
    try {
      this.getItemSub = this.crudService.getItems()
        .subscribe(data => {
          this.items = data;
        })
    }
    catch{ }
  }
}