import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/delay';

@Injectable()
export class CuentaDefectoService {
  constructor() { }

  //******* Implement your APIs ********
  getItems(): Observable<any> {
    return Observable.of(this.items.slice())
  }
  addItem(item): Observable<any> {
    item._id = Math.round(Math.random() * 10000000000).toString();
    this.items.unshift(item)
    return Observable.of(this.items.slice()).delay(1000)
  }
  updateItem(id, item) {
    this.items = this.items.map(i => {
      if (i._id === id) {
        return Object.assign({}, i, item)
      }
      return i;
    })
    return Observable.of(this.items.slice()).delay(1000);
  }
  removeItem(row) {
    let i = this.items.indexOf(row);
    this.items.splice(i, 1);
    return Observable.of(this.items.slice()).delay(1000);
  }
  items: any[] = [
    {
      "isActive": false,
      "name": "Cuenta contable a usar para clientes",
    },
    {
      "isActive": true,
      "name": "Cuenta contable a usar para proveedores",
    }, 
    {
      "isActive": false,
      "name": "Cuenta contable predeterminada para los productos comprados",
    },
    {
      "isActive": false,
      "name": "Cuenta contable predeterminada para los productos vendidos",
    },
    {
      "isActive": false,
      "name": "Cuenta contable por defecto para el IVA de compras",
    },
    {
      "isActive": false,
      "name": "Cuenta contable por defecto para el IVA de ventas",
    },
    {
      "isActive": false,
      "name": "Código contable por defecto para el pago de IVA",
    },
    {
      "isActive": false,
      "name": "Cuenta de caja",
    },
    {
      "isActive": false,
      "name": "Cuenta contable por defecto para el capital",
    },
    {
      "isActive": false,
      "name": "Cuenta contable por defecto para el seguro",
    },
  ]

}
