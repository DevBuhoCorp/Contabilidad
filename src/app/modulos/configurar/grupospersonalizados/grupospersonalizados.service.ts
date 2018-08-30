import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/delay';

@Injectable()
export class GPersonalizadoService {
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
            if (i.ID === id) {
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
            "ID": 1,
            "Codigo": "INGRESOS",
            "Etiqueta": "Ingresos de productos / servicios",
            "Comentario":"Ejemplo: 7xxxxx",
            "Calculado": false,
            "Formula": "",
            "Pais":"",
            "Estado": true,
        },
        {
            "ID": 2,
            "Codigo": "GASTOS",
            "Etiqueta": "Gastos de productos / servicios",
            "Comentario":"Ejemplo: 6xxxxx",
            "Calculado": false,
            "Formula": "",
            "Pais":"",
            "Estado": true,
        },
        {
            "ID": 3,
            "Codigo": "GANANCIAS",
            "Etiqueta": "Balance",
            "Comentario":"",
            "Calculado": true,
            "Formula": "INGRESOS + GASTOS",
            "Pais":"",
            "Estado": true,
        },
        
          
    ]
}
