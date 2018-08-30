import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/delay';

@Injectable()
export class CuentaBancariaService {
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

    items: any[];
}
