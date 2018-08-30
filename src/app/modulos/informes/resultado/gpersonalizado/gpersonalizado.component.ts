import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from '../../../../../../node_modules/rxjs';
import { InformeGrupoPService } from './gpersonalizado.service';

@Component({
  selector: 'app-gpersonalizado',
  templateUrl: './gpersonalizado.component.html',
  styles: []
})
export class GpersonalizadoComponent implements OnInit, OnDestroy {
  public items: any[]; 
  public getItemSub: Subscription;
  constructor(
    private crudService: InformeGrupoPService,
  ) { }

  ngOnInit() {
    this.getItems()
  }
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe()
    }
  }
  getItems() {
    try {
      this.getItemSub = this.crudService.getItems()
        .subscribe(data => {
          this.items = data;
        })
    }
    catch{ }
  }
}