import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { AppLoaderService } from '../../../shared/servicios/app-loader/app-loader.service';
import { AppConfirmService } from '../../../shared/servicios/app-confirm/app-confirm.service';
import { ContabilizarService } from './contabilizar.service';


@Component({
  selector: 'app-contabilizar',
  templateUrl: './contabilizar.component.html',
  styleUrls: []
})
export class ContabilizarCComponent implements OnInit, OnDestroy {
  public items: any[];
  public getItemSub: Subscription;
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: ContabilizarService,
    private loader: AppLoaderService,
    private confirmService: AppConfirmService,
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