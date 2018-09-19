import { Injectable } from '@angular/core';
import 'rxjs/add/operator/delay';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { HttpClient, HttpHeaders } from '../../../../node_modules/@angular/common/http';

@Injectable()
export class CrudService {
  readonly puerto = "http://localhost:8000/";
  constructor(private http: Http, private httpClient: HttpClient) {
  }


  Seleccionar(api, param?) {
    var headerOptions = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
    return this.http.get(this.puerto + api, { params: param, headers: headerOptions });
  }

  SeleccionarAsync(api, param?) {
    var headerOptions = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
    return this.httpClient.get(this.puerto + api, { params: param, headers: headerOptions }).toPromise();
  }


  SetBool(datos) {
    let index = 0;
    for (let i of datos) {

      if (i.Estado == 'ACT') {
        datos[index].Estado = true;
      }
      else {
        datos[index].Estado = false;
      }
      index++;
    }
    return datos;
  }
  _listParams(api, params?) {
    return this.httpClient.post(this.puerto + api + '/list', params).toPromise();
  }

  Actualizar(id, objeto, api) {
    var body = objeto;
    var headerOptions = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put(this.puerto + api + id, body, requestOptions).map(res => res.json());
  }

  Insertar(objeto, api) {
    console.log(objeto);
    var body = objeto;
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.post(this.puerto + api, body, requestOptions).map(res => res.json());

  }

  Eliminar(ID, api) {
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Delete, headers: headerOptions });
    return this.http.delete(this.puerto + api + ID, requestOptions).map(res => res.json());
  }
}
