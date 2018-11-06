import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor() { }

  getEmpresaActive(){
    console.log(JSON.parse( localStorage.getItem('Empresa') ));
    return JSON.parse( localStorage.getItem('Empresa') );
  }

  getPaginas(){
    return [3, 5, 10, 20];
  }



}
