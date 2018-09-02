import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/delay';

@Injectable()
export class PlanContableService {
    constructor() { }

    /* Implement your APIs */
    getItems(): Observable<any> {
        return Observable.of(this.items.slice());
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
            "NumeroCuenta": "1",
            "Etiqueta": "ACTIVO",
            "CuentaPadre":0,
            "GrupoCuenta": "Total",
            "Estado": true,
        },
        {
            "ID": 2,
            "NumeroCuenta": "1.01",
            "Etiqueta": "ACTIVO CORRIENTE",
            "CuentaPadre":1,
            "GrupoCuenta": "Total",
            "Estado": true,
        },
        {
            "ID": 3,
            "NumeroCuenta": "1.01.01",
            "Etiqueta": "EFECTIVO Y EQUIVALENTES AL EFECTIVO",
            "CuentaPadre":2,
            "GrupoCuenta": "Detalle",
            "Estado": true,
        },
        {
            "ID": 4,
            "NumeroCuenta": "1.01.02",
            "Etiqueta": "ACTIVOS FINANCIEROS",
            "CuentaPadre":2,
            "GrupoCuenta": "Total",
            "Estado": true,
        },
        {
            "ID": 5,
            "NumeroCuenta": "1.01.02.01",
            "Etiqueta": "ACTIVOS FINANCIEROS A VALOR RAZONABLE CON CAMBIOS EN RESULTADOS",
            "CuentaPadre":4,
            "GrupoCuenta": "Detalle",
            "Estado": true,
        },
        {
            "ID": 6,
            "NumeroCuenta": "1.01.02.02",
            "Etiqueta": "ACTIVOS FINANCIEROS DISPONIBLES PARA LA VENTA",
            "CuentaPadre":4,
            "GrupoCuenta": "Detalle",
            "Estado": true,
        },
    ];
}
