import { Injectable } from '@angular/core';
import 'rxjs/add/operator/delay';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { HttpClient } from '../../../../node_modules/@angular/common/http';

@Injectable()
export class CrudService {
  readonly puerto = "http://localhost:8000/api/";
  constructor(private http: Http, private httpClient: HttpClient) {
  }


  ListarDatos(api, opt, id) {
    return this.http.get(this.puerto + api + '?opt=' + opt + '&id=' + id);
  }

  Paginacion(api, opt, id, page) {
    return this.http.get(this.puerto + api + '?page=' + page + '&opt=' + opt + '&id=' + id);
  }
  PaginacionTest(api, param) {
    return this.httpClient.get(this.puerto + api, { params: param}).toPromise();
  }

  PaginacionAsync(api, opt, id, page) {
    return this.http.get(this.puerto + api + '?page=' + page + '&opt=' + opt + '&id=' + id).toPromise();
  }

  ListarDatosAsync(api, opt, id) {
    return this.httpClient.get(this.puerto + api + '?opt=' + opt + '&id=' + id).toPromise();
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
