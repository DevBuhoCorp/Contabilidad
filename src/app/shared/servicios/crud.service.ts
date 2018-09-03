import {Injectable} from '@angular/core';
import 'rxjs/add/operator/delay';
import {Http, Headers, RequestOptions, RequestMethod} from '@angular/http';

@Injectable()
export class CrudService {
<<<<<<< HEAD
  readonly puerto = "http://localhost:8000/api/";
  items: any[];
=======
  readonly puerto = 'http://localhost:8000/api/';
  items: any[];

>>>>>>> origin/kbsg
  constructor(private http: Http) {
  }


  ListarDatos(api, opt, id) {
    return this.http.get(this.puerto + api + '?opt=' + opt + '&id=' + id);
  }

  Actualizar(id, objeto, api) {
    var body = objeto;
<<<<<<< HEAD
    var headerOptions = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
=======
    var headerOptions = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Methods': '*'});
    var requestOptions = new RequestOptions({method: RequestMethod.Put, headers: headerOptions});
    // console.log(objeto);
    // return this.http.put(this.puerto + api + id, body).map(res => res.json());
>>>>>>> origin/kbsg
    return this.http.put(this.puerto + api + id, body, requestOptions).map(res => res.json());
  }

  Insertar(objeto, api) {
    var body = objeto;
    var headerOptions = new Headers({'Content-Type': 'application/json'});
    var requestOptions = new RequestOptions({method: RequestMethod.Post, headers: headerOptions});
    return this.http.post(this.puerto + api, body, requestOptions).map(res => res.json());

  }

  Eliminar(ID, api) {
    var headerOptions = new Headers({'Content-Type': 'application/json'});
    var requestOptions = new RequestOptions({method: RequestMethod.Delete, headers: headerOptions});
    return this.http.delete(this.puerto + api + ID, requestOptions).map(res => res.json());
  }
<<<<<<< HEAD
=======

  /*items: any[] = [
    { 
      "ID":1,
      "Codigo":"ND",
      "Etiqueta":"Nuevo diario",  
      "Naturaleza":"Haber",
      "Estado": false,
    },
    {
      "ID":2,
      "Codigo":"IG",
      "Etiqueta":"Diario del informe de gastos",  
      "Naturaleza":"Informes de gastos",
      "Estado": false,
    },
    {
      "ID":3,
      "Codigo":"DB",
      "Etiqueta":"Diario bancario",  
      "Naturaleza":"Banco",
      "Estado": true,
    },
    {
      "ID":4,
      "Codigo":"DC",
      "Etiqueta":"Diario de compra",  
      "Naturaleza":"Compras",
      "Estado": true,
    },
    {
      "ID":5,
      "Codigo":"DV",
      "Etiqueta":"Diario de venta",  
      "Naturaleza":"Ventas",
      "Estado": true,
    },
    {
      "ID":6,
      "Codigo":"OD",
      "Etiqueta":"Otro diario",  
      "Naturaleza":"Operaciones varias",
      "Estado": false,
    },
  ]*/

>>>>>>> origin/kbsg
}
