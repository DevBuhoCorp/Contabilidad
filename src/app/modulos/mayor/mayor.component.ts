import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TreeNode } from 'primeng/components/common/api';
import { CrudService } from '../../shared/servicios/crud.service';
import { getMatFormFieldMissingControlError } from '@angular/material';

@Component({
  selector: 'app-mayor',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './mayor.component.html',
  styleUrls: [
    './mayor.component.css',
  ]
})
export class MayorComponent implements OnInit {
  datos: any = {};
  filesTree0: any = [{
    data: []
  }];
  selectedFile: TreeNode;

  constructor(private crudService: CrudService) {  }

  ngOnInit() {
    this.getItems();
  }
  async getItems() {
    this.filesTree0 = await this.crudService.SeleccionarAsync('plancontable', { id: 11 });
    this.filesTree0[0].data = await JSON.parse(this.filesTree0[0].data);
  }

  nodeSelect(event) {
    console.log(this.selectedFile);
  }

}