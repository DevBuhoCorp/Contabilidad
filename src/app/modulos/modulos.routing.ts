import {Routes} from '@angular/router';
import {ContabilidadComponent} from './contabilidad/contabilidad.component';
import {GeneralComponent} from './configurar/general/general.component';
import {DiarioscontablesComponent} from './configurar/diarioscontables/diarioscontables.component';
import {ModelospcComponent} from './configurar/modelospc/modelospc.component';
import {PlancontableComponent} from './configurar/plancontable/plancontable.component';
import {GrupospersonalizadosComponent} from './configurar/grupospersonalizados/grupospersonalizados.component';
import {ListaComponent} from './configurar/grupospersonalizados/lista/lista.component';
import {CuentacontabledefectoComponent} from './configurar/cuentacontabledefecto/cuentacontabledefecto.component';
import {CuentasbancariasComponent} from './configurar/cuentasbancarias/cuentasbancarias.component';
import {CuentasivaComponent} from './configurar/cuentasiva/cuentasiva.component';
import {CuentasimpuestosComponent} from './configurar/cuentasimpuestos/cuentasimpuestos.component';
import {CuentaspagosComponent} from './configurar/cuentaspagos/cuentaspagos.component';
import {CuentasproductosComponent} from './configurar/cuentasproductos/cuentasproductos.component';
import {ExportacionComponent} from './configurar/exportacion/exportacion.component';
import {ContabilizarCComponent} from './contabilizarcliente/contabilizar/contabilizar.component';
import {ContabilizadaCComponent} from './contabilizarcliente/contabilizada/contabilizada.component';
import {ContabilizarPComponent} from './contabilizarproveedor/contabilizar/contabilizar.component';
import {ContabilizadaPComponent} from './contabilizarproveedor/contabilizada/contabilizada.component';
import {ContabilizarGComponent} from './contabilizargasto/contabilizar/contabilizar.component';
import {ContabilizadaGComponent} from './contabilizargasto/contabilizada/contabilizada.component';
import {VentaComponent} from './procesardiarios/venta/venta.component';
import {CompraComponent} from './procesardiarios/compra/compra.component';
import {GastoComponent} from './procesardiarios/gasto/gasto.component';
import {BancoComponent} from './configurar/banco/banco.component';
import {LibromayorComponent} from './libromayor/libromayor.component';
import {SaldocuentaComponent} from './saldocuenta/saldocuenta.component';
import {GpredefinidoComponent} from './informes/resultado/gpredefinido/gpredefinido.component';
import {GpersonalizadoComponent} from './informes/resultado/gpersonalizado/gpersonalizado.component';
import {ClienteComponent} from './informes/ventas/cliente/cliente.component';
import {UsuarioComponent} from './informes/ventas/usuario/usuario.component';
import {ViewmodelopcComponent} from './configurar/modelospc/viewmodelopc/viewmodelopc.component';
import {EmpresaComponent} from './configurar/empresa/empresa.component';
import {AplicacionComponent} from './configurar/aplicacion/aplicacion.component';
import {EstacionComponent} from './configurar/estacion/estacion.component';
import { NuevatransComponent } from './libromayor/nuevatrans/nuevatrans.component';


export const ModulosRoutes: Routes = [
  {
    path: 'contabilidad',
    component: ContabilidadComponent,
    data: {title: 'Contabilidad', breadcrumb: 'CONTABILIDAD'}
  },
  {
    path: 'configurar/general',
    component: GeneralComponent,
    data: {title: 'Configuraciones Generales', breadcrumb: 'CONFIGURACIÓN GENERAL'}
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
    path: 'configurar/banco',
    component: BancoComponent,
    data: {title: 'Banco', breadcrumb: 'CONFIGURAR BANCO'}
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
    path: 'configurar/grupospersonalizados',
    component: GrupospersonalizadosComponent,
    data: {title: 'Grupos Personalizados', breadcrumb: 'CONFIGURAR GRUPOS PERSONALIZADOS'}
  },
  {
    path: 'configurar/grupospersonalizados/lista',
    component: ListaComponent,
    data: {title: 'Lista de Grupos Personalizados', breadcrumb: 'CONFIGURAR GRUPOS PERSONALIZADOS'}
  },
  {
    path: 'configurar/cuentacontablepordefecto',
    component: CuentacontabledefectoComponent,
    data: {title: 'Cuentas Contables por Defecto', breadcrumb: 'CONFIGURAR CUENTAS CONTABLES'}
  },
  {
    path: 'configurar/cuentabancaria',
    component: CuentasbancariasComponent,
    data: {title: 'Cuentas Bancarias', breadcrumb: 'CONFIGURAR CUENTAS BANCARIAS'}
  },
  {
    path: 'configurar/cuentaiva', component: CuentasivaComponent, data: {title: 'Cuentas IVA', breadcrumb: 'CONFIGURAR CUENTAS IVA'}
  },
  {
    path: 'configurar/cuentaimpuesto',
    component: CuentasimpuestosComponent,
    data: {title: 'Cuentas Impuestos', breadcrumb: 'CONFIGURAR CUENTAS IMPUESTOS'}
  },
  {
    path: 'configurar/cuentapago', component: CuentaspagosComponent, data: {title: 'Cuentas Pagos', breadcrumb: 'CONFIGURAR CUENTAS PAGOS'}
  },
  {
    path: 'configurar/cuentaproducto',
    component: CuentasproductosComponent,
    data: {title: 'Cuentas Productos', breadcrumb: 'CONFIGURAR CUENTAS PRODUCTOS'}
  },
  {
    path: 'configurar/exportacion', component: ExportacionComponent, data: {title: 'Exportación', breadcrumb: 'CONFIGURAR EXPORTACIÓN'}
  },
  {
    path: 'contabilizarcliente/contabilizar',
    component: ContabilizarCComponent,
    data: {title: 'Contabilizar Facturas de Cliente', breadcrumb: 'CONTABILIZAR FACTURAS DE CLIENTE'}
  },
  {
    path: 'contabilizarcliente/contabilizada',
    component: ContabilizadaCComponent,
    data: {title: 'Facturas Contabilizadas de Cliente', breadcrumb: 'FACTURAS CONTABILIZADAS DE CLIENTE'}
  },
  {
    path: 'contabilizarproveedor/contabilizar',
    component: ContabilizarPComponent,
    data: {title: 'Contabilizar Facturas de Proveedor', breadcrumb: 'CONTABILIZAR FACTURAS DE PROVEEDOR'}
  },
  {
    path: 'contabilizarproveedor/contabilizada',
    component: ContabilizadaPComponent,
    data: {title: 'Facturas Contabilizadas de Proveedor', breadcrumb: 'FACTURAS CONTABILIZADAS DE PROVEEDOR'}
  },
  {
    path: 'contabilizargasto/contabilizar',
    component: ContabilizarGComponent,
    data: {title: 'Contabilizar Facturas de Gasto', breadcrumb: 'CONTABILIZAR FACTURAS DE GASTO'}
  },
  {
    path: 'contabilizargasto/contabilizada',
    component: ContabilizadaGComponent,
    data: {title: 'Facturas Contabilizadas de Gasto', breadcrumb: 'FACTURAS CONTABILIZADAS DE GASTO'}
  },
  {
    path: 'procesardiarios/venta', component: VentaComponent, data: {title: 'Diario de Venta', breadcrumb: 'PROCESAR DIARIOS DE VENTA'}
  },
  {
    path: 'procesardiarios/compra', component: CompraComponent, data: {title: 'Diario de Compra', breadcrumb: 'PROCESAR DIARIOS DE COMPRA'}
  },
  {
    path: 'procesardiarios/gasto', component: GastoComponent, data: {title: 'Diario de Gastos', breadcrumb: 'PROCESAR DIARIOS DE GASTOS'}
  },
  /*{
    path: 'procesardiarios/banco', component: BancoComponent, data: {title: 'Diario de Bancos', breadcrumb: 'PROCESAR DIARIOS DE BANCOS'}
  },*/
  {
    path: 'libromayor', component: LibromayorComponent, data: {title: 'Libro Diario', breadcrumb: 'PROCESAR LIBRO DIARIO'}
  },
  {
    path: 'libromayor/nuevatransaccion', component: NuevatransComponent, data: {title: 'Nueva Transacción', breadcrumb: 'INGRESAR NUEVA TRANSACCIÓN'}
  },
  {
    path: 'saldocuenta', component: SaldocuentaComponent, data: {title: 'Saldo de la cuenta', breadcrumb: 'PROCESAR SALDOS'}
  },
  {
    path: 'informes/grupopredefinido',
    component: GpredefinidoComponent,
    data: {title: 'Informes', breadcrumb: 'PROCESAR INFORMES GRUPO PREDEFINIDO'}
  },
  {
    path: 'informes/grupopersonalizado',
    component: GpersonalizadoComponent,
    data: {title: 'Informes', breadcrumb: 'PROCESAR INFORMES GRUPO PERSONALIZADO'}
  },
  {
    path: 'ventas/cliente',
    component: ClienteComponent,
    data: {title: 'Volumen de Ventas', breadcrumb: 'PROCESAR VOLUMEN DE VENTAS POR CLIENTE'}
  },
  {
    path: 'ventas/usuario',
    component: UsuarioComponent,
    data: {title: 'Volumen de Ventas', breadcrumb: 'PROCESAR VOLUMEN DE VENTAS POR USUARIO'}
  },

];
