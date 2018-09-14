import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-estacion',
  templateUrl: './estacion.component.html',
  styles: []
})
export class EstacionComponent implements OnInit {

  app: number;
  estacions :any;

  constructor(
    private router:ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.params.subscribe((data) =>{
      this.app = data.app;
    });

  }

  openPopUp(data: any = {}, isNew?){

  }
  deleteItem(item){

  }

}
