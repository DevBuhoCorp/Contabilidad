import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CrudService} from '../../../shared/servicios/crud.service';
import {TreeNode} from 'primeng/components/common/api';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-cuentabalance',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cuentabalance.component.html',
  styleUrls: [
    './cuentabalance.component.css',
  ]
})
export class CuentabalanceComponent implements OnInit {

  selectedModelo: string = '';
  selectedBalance: string = '';
  Modelos: any = [];
  Balances: any = [];
  filesTree0: TreeNode[];
  selectedFiles: TreeNode[] = [];
  itemsSelect: number[] = [];

  constructor(
    private crudService: CrudService,
    private snack: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.Modelos = this.crudService.SeleccionarAsync('combomodelo');
    this.Balances = this.crudService.SeleccionarAsync('combobalance');
  }

  async CargarPlan() {
    this.filesTree0 = await (this.crudService.SeleccionarAsync("plancontable/tree", { modelo: this.selectedModelo })) as TreeNode[];

  }

  async CargarCuentaBalance() {
    this.selectedFiles = [];
    this.itemsSelect = await (this.crudService.SeleccionarAsync('plancontable/cuentabalance', {
      modelo: this.selectedModelo,
      balance: this.selectedBalance
    })) as number[];
    this.filesTree0.forEach(node => {
      this.selectNode(node, true);
    });
  }

  nodeSelect(event) {
    console.log(this.selectedFiles);
  }

  save() {
    let nodes_filter = this.selectedFiles.filter(row => row["IDGrupoCuenta"] == 2);
    let ids = nodes_filter.map(row => {
      return {
        IDPlanContable: row["ID"],
        IDBalance: this.selectedBalance,
        Estado: 'ACT'
      };
    });

    this.crudService.Insertar(ids, 'cuentabalance/' + this.selectedModelo + '/' + this.selectedBalance).subscribe(data => {
      this.snack.open('Agregado!', 'OK', { duration: 4000 });
      this.reset();
    });


  }

  reset() {
    this.itemsSelect = this.selectedFiles = [];
    this.selectedBalance = null;
    this.filesTree0.forEach(node => {
      this.expandRecursive(node, false);
    });
  }

  expandAll() {
    this.filesTree0.forEach(node => {
      this.expandRecursive(node, true);
    });
  }

  collapseAll($Etiqueta) {
    $Etiqueta.scrollIntoView();
    this.filesTree0.forEach(node => {
      this.expandRecursive(node, false);
    });
  }

  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach(childNode => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }

  private selectNode(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (this.itemsSelect.find((data) => node["ID"] == data["ID"])) {
      this.selectedFiles = this.selectedFiles.concat(node);
    }
    if (node.children) {
      node.children.forEach(childNode => {
        this.selectNode(childNode, isExpand);
      });
    }
  }

}
