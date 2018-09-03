import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TreeNode} from 'primeng/components/common/api';
import {CrudService} from '../../../../shared/servicios/crud.service';

@Component({
  selector: 'app-viewmodelopc',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './viewmodelopc.component.html',
  styleUrls: [
    './viewmodelopc.component.css',
  ]
})
export class ViewmodelopcComponent implements OnInit {
  filesTree0: TreeNode[];
  selectedFile: TreeNode;

  constructor(private _activateRoute: ActivatedRoute,
              private crudService: CrudService ) {
    this._activateRoute.params.subscribe(params => {
      // console.log(params);
    });
  }

  ngOnInit() {
    this.crudService.ListarDatos('plancontable','ALL', 0).map((response) => {
      return response.json();
    }).toPromise().then(x => {
      this.filesTree0 = JSON.parse(x[0].data) as TreeNode[];
    });
  }

  nodeSelect(event) {
    console.log(event.node);
  }

  nodeUnselect(event) {
    console.log(event.node);
  }


}
/* Ejemplo  */
/*
[
    {
      'label': 'Documents',
      'data': 'Documents Folder',
      'expandedIcon': 'fa fa-folder-open',
      'collapsedIcon': 'fa fa-folder',
      'children': [{
        'label': 'Work',
        'data': 'Work Folder',
        'expandedIcon': 'fa fa-folder-open',
        'collapsedIcon': 'fa fa-folder',
        'children': [
          {'label': 'Expenses.doc', 'icon': 'fa fa-file-word-o', 'data': 'Expenses Document'},
          { 'label': 'Resume.doc', 'icon': 'fa fa-file-word-o', 'data': 'Resume Document' }
          ]
      },
        {
          'label': 'Home',
          'data': 'Home Folder',
          'expandedIcon': 'fa fa-folder-open',
          'collapsedIcon': 'fa fa-folder',
          'children': [{'label': 'Invoices.txt', 'icon': 'fa fa-file-word-o', 'data': 'Invoices for this month'}]
        }]
    },
    {
      'label': 'Pictures',
      'data': 'Pictures Folder',
      'expandedIcon': 'fa fa-folder-open',
      'collapsedIcon': 'fa fa-folder',
      'children': [
        {'label': 'barcelona.jpg', 'icon': 'fa fa-file-image-o', 'data': 'Barcelona Photo'},
        {'label': 'logo.jpg', 'icon': 'fa fa-file-image-o', 'data': 'PrimeFaces Logo'},
        {'label': 'primeui.png', 'icon': 'fa fa-file-image-o', 'data': 'PrimeUI Logo'}]
    },
    {
      'label': 'Movies',
      'data': 'Movies Folder',
      'expandedIcon': 'fa fa-folder-open',
      'collapsedIcon': 'fa fa-folder',
      'children': [{
        'label': 'Al Pacino',
        'data': 'Pacino Movies',
        'children': [{'label': 'Scarface', 'icon': 'fa fa-file-video-o', 'data': 'Scarface Movie'}, {
          'label': 'Serpico',
          'icon': 'fa fa-file-video-o',
          'data': 'Serpico Movie'
        }]
      },
        {
          'label': 'Robert De Niro',
          'data': 'De Niro Movies',
          'children': [{'label': 'Goodfellas', 'icon': 'fa fa-file-video-o', 'data': 'Goodfellas Movie'}, {
            'label': 'Untouchables',
            'icon': 'fa fa-file-video-o',
            'data': 'Untouchables Movie'
          }]
        }]
    }
  ]
 *  */
