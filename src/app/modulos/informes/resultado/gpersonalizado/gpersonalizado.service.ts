import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/delay';

@Injectable()
export class InformeGrupoPService {
    constructor() { }

    //******* Implement your APIs ********
    getItems(): Observable<any> {
        try { return Observable.of(this.items.slice()) }
        catch{ }
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
            "Grupo": "INGRESOS",
            "PeriodoAnterior": 0.00,
            "PeriodoSeleccionado": 0.00,
            "Enero": 0.00,
            "Febrero": 0.00,
            "Marzo": 0.00,
            "Abril": 0.00,
            "Mayo": 0.00,
            "Junio": 0.00,
            "Julio": 0.00,
            "Agosto": 0.00,
            "Septiembre": 0.00,
            "Octubre": 0.00,
            "Noviembre": 0.00,
            "Diciembre": 0.00,
        },
        {
            "ID": 2,
            "Grupo": "GASTOS",
            "PeriodoAnterior": 0.00,
            "PeriodoSeleccionado": 0.00,
            "Enero": 0.00,
            "Febrero": 0.00,
            "Marzo": 0.00,
            "Abril": 0.00,
            "Mayo": 0.00,
            "Junio": 0.00,
            "Julio": 0.00,
            "Agosto": 0.00,
            "Septiembre": 0.00,
            "Octubre": 0.00,
            "Noviembre": 0.00,
            "Diciembre": 0.00,
        },
        {
            "ID": 3,
            "Grupo": "BALANCE",
            "PeriodoAnterior": 0.00,
            "PeriodoSeleccionado": 0.00,
            "Enero": 0.00,
            "Febrero": 0.00,
            "Marzo": 0.00,
            "Abril": 0.00,
            "Mayo": 0.00,
            "Junio": 0.00,
            "Julio": 0.00,
            "Agosto": 0.00,
            "Septiembre": 0.00,
            "Octubre": 0.00,
            "Noviembre": 0.00,
            "Diciembre": 0.00,
        },

    ]

}