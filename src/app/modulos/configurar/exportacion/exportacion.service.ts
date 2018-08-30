import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/delay';

@Injectable()
export class ExportacionService {
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
      "Opcion": "Especifique el prefijo del nombre de archivo	",
      "Editable": true,
    },
    {
      "Opcion": "Seleccione un modelo de exportación",
      "Editable": false,
    },
    {
      "Opcion": "Seleccione el formato del archivo",
      "Editable": false,
    },
    {
      "Opcion": "Separador de columnas en el archivo de exportación",
      "Editable": true,
    },
    {
      "Opcion": "Seleccione el tipo de retorno de carro",
      "Editable": false,
    },
    {
      "Opcion": "Formato de fecha en el archivo de exportación",
      "Editable": true,
    },
  ]

}
