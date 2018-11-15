import {Routes} from '@angular/router';
import {DiarioscontablesComponent} from './configurar/diarioscontables/diarioscontables.component';
import {ModelospcComponent} from './configurar/modelospc/modelospc.component';
import {PlancontableComponent} from './configurar/plancontable/plancontable.component';
import {CuentasbancariasComponent} from './finanzas/cuentasbancarias/cuentasbancarias.component';
import {ContabilizarCComponent} from './contabilizarcliente/contabilizar/contabilizar.component';
import {BancoComponent} from './finanzas/banco/banco.component';
import {LibromayorComponent} from './libromayor/libromayor.component';
import {UsuarioComponent} from './nomina/usuario/usuario.component';
import {ViewmodelopcComponent} from './configurar/modelospc/viewmodelopc/viewmodelopc.component';
import {EmpresaComponent} from './configurar/empresa/empresa.component';
import {AplicacionComponent} from './configurar/aplicacion/aplicacion.component';
import {EstacionComponent} from './configurar/estacion/estacion.component';
import {NuevatransComponent} from './libromayor/nuevatrans/nuevatrans.component';
import {TipocuentabancariaComponent} from './finanzas/tipocuentabancaria/tipocuentabancaria.component';
import {ListaDetallesComponent} from './libromayor/lista/lista.component';
import {TransaccionesComponent} from './transacciones/transacciones.component';
import {MayorComponent} from './mayor/mayor.component';
import {ListaMayorComponent} from './mayor/lista/lista.component';
import { BalancecomprobacionComponent } from './reportes/balancecomprobacion/balancecomprobacion.component';
import { EstadoresultadoComponent } from './reportes/estadoresultado/estadoresultado.component';
import { BalancefinalComponent } from './reportes/balancefinal/balancefinal.component';
import {CuentabalanceComponent} from './configurar/cuentabalance/cuentabalance.component';
import { HojatrabajoComponent } from './reportes/hojatrabajo/hojatrabajo.component';
import {RolesComponent} from './nomina/roles/roles.component';


export const ModulosRoutes: Routes = [

  {
    path: 'nomina/usuario',
    component: UsuarioComponent,
    data: {title: 'Configuración Nomina', breadcrumb: 'CONFIGURACIÓN USUARIO'}
  },
  {
    path: 'nomina/roles',
    component: RolesComponent,
    data: {title: 'Configuración Nomina', breadcrumb: 'CONFIGURACIÓN ROLES'}
  },
  {
    path: 'configurar/empresas',
    component: EmpresaComponent,
    data: {title: 'Empresa', breadcrumb: 'CONFIGURAR EMPRESA'}
  },
  {
    path: 'configurar/aplicacion',
    component: AplicacionComponent,
    data: {title: 'Aplicación', breadcrumb: 'CONFIGURAR APLICACIÓN'}
  },
  {
    path: 'configurar/cuentabalance',
    component: CuentabalanceComponent,
    data: {title: 'Cuenta Balance', breadcrumb: 'CONFIGURAR BALANCE'}
  },
  {
    path: 'finanzas/banco',
    component: BancoComponent,
    data: {title: 'Banco', breadcrumb: 'CONFIGURAR BANCO'}
  },
  {
    path: 'finanzas/tipocuentabancaria',
    component: TipocuentabancariaComponent,
    data: {title: 'Tipo Cuenta Bancaria', breadcrumb: 'CONFIGURAR T. CUENTA BANCARIA'}
  },
  {
    path: 'configurar/aplicacion/estacion/:app',
    component: EstacionComponent,
    data: {title: 'Estación', breadcrumb: 'ESTACIÓN'}
  },
  {
    path: 'configurar/diarioscontables',
    component: DiarioscontablesComponent,
    data: {title: 'Diarios Contables', breadcrumb: 'CONFIGURAR DIARIOS CONTABLES'}
  },
  {
    path: 'configurar/modelosplanescontables',
    component: ModelospcComponent,
    data: {title: 'Modelos Planes Contables', breadcrumb: 'CONFIGURAR MODELOS PLANES CONTABLES'}
  },
  {
    path: 'configurar/modelosplanescontables/lista/:id',
    component: ViewmodelopcComponent,
    data: {title: 'Modelos Planes Contables', breadcrumb: 'VISUALIZAR MODELOS PLANES CONTABLES'}
  },
  {
    path: 'configurar/plancontable',
    component: PlancontableComponent,
    data: {title: 'Plan Contable', breadcrumb: 'CONFIGURAR PLAN CONTABLE'}
  },
  {
    path: 'finanzas/cuentabancaria',
    component: CuentasbancariasComponent,
    data: {title: 'Cuentas Bancarias', breadcrumb: 'CONFIGURAR CUENTAS BANCARIAS'}
  },
  {
    path: 'contabilizarcliente/contabilizar',
    component: ContabilizarCComponent,
    data: {title: 'Contabilizar Facturas de Cliente', breadcrumb: 'CONTABILIZAR TRANSACCIÓN'}
  },
  {
    path: 'contabilizarcliente/contabilizar/lista/:id/:contabilizar',
    component: ListaDetallesComponent,
    data: {title: 'Detalles Transacción', breadcrumb: 'VISUALIZAR DETALLES DE TRANSACCIÓN'}
  },
  /*{
    path: 'procesardiarios/banco', component: BancoComponent, data: {title: 'Diario de Bancos', breadcrumb: 'PROCESAR DIARIOS DE BANCOS'}
  },*/
  {
    path: 'transacciones', component: TransaccionesComponent, data: {title: 'Transacciones', breadcrumb: 'PROCESAR TRANSACCIONES'}
  },
  {
    path: 'mayor',
    component: MayorComponent,
    data: {title: 'Libro Mayor', breadcrumb: 'PROCESAR LIBRO MAYOR'}
  },
  {
    path: 'mayor/lista/:id/:etiqueta',
    component: ListaMayorComponent,
    data: {title: 'Detalles Transacción', breadcrumb: 'VISUALIZAR DETALLES DE TRANSACCIÓN'}
  },
  {
    path: 'libromayor', component: LibromayorComponent, data: {title: 'Libro Diario', breadcrumb: 'PROCESAR LIBRO DIARIO'}
  },
  {
    path: 'libromayor/nuevatransaccion',
    component: NuevatransComponent,
    data: {title: 'Nueva Transacción', breadcrumb: 'INGRESAR NUEVA TRANSACCIÓN'}
  },
  {
    path: 'libromayor/lista/:id/:etiqueta',
    component: ListaDetallesComponent,
    data: {title: 'Detalles Transacción', breadcrumb: 'VISUALIZAR DETALLES DE TRANSACCIÓN'}
  },
  {
    path: 'reportes/balancecomprobacion',
    component: BalancecomprobacionComponent,
    data: {title: 'Generar Balance de Comprobación', breadcrumb: 'GENERAR BALANCE DE COMPROBACIÓN'}
  },
  {
    path: 'reportes/estadoresultado',
    component: EstadoresultadoComponent,
    data: {title: 'Estado de Resultados', breadcrumb: 'ESTADO DE RESULTADOS'}
  },
  {
    path: 'reportes/balancefinal',
    component: BalancefinalComponent,
    data: {title: 'Balance Final', breadcrumb: 'BALANCE FINAL'}
  },
  {
    path: 'reportes/hojatrabajo',
    component: HojatrabajoComponent,
    data: {title: 'Hoja de Trabajo', breadcrumb: 'HOJA DE TRABAJO'}
  },
  

];
