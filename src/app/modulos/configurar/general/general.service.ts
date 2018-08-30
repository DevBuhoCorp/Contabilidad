import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/delay';

@Injectable()
export class GeneralService {
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
      "name": "Ordenar las páginas de contabilización 'A contabilizar' por los elementos más recientes	",
      "Editable": false,
    },
    {
      "isActive": true,
      "name": "Ordenar las páginas de contabilización 'Contabilizadas' por los elementos más recientes",
      "Editable": false,
    },
    {
      "isActive": true,
      "name": "Desactivar transacciones directas en cuenta bancaria",
      "Editable": false,
    },
    {
      "isActive": false,
      "name": "Gestiona el cero al final de una cuenta contable. Si se mantiene desactivada (por defecto), puede configurar los 2 parámetros siguientes para pedir que la aplicación agregue el cero virtual",
      "Editable": false,
    },
    {
      "isActive": false,
      "name": "Longitud de las cuentas generales (si ajusta el valor a 6 aquí, la cuenta '706' aparecerá como '706000' en la pantalla)	",
      "Editable": true,
    },
    {
      "isActive": false,
      "name": "Longitud de las subcuentas ( si ajusta el valor a 6 aquí, la cuenta '401' aparecerá como '401000' en la pantalla)",
      "Editable": true,
    },
  ]

}
