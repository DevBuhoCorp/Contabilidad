import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {

  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatMenuModule,
  MatButtonModule,
  MatChipsModule,
  MatListModule,
  MatTooltipModule,
  MatDialogModule,
  MatSnackBarModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTabsModule,
  MatProgressBarModule,
  MatAutocompleteModule,
  MatCheckboxModule
} from '@angular/material';
// PrimeNG
import {TreeModule} from 'primeng/tree';

import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {AppConfirmModule} from '../shared/servicios/app-confirm/app-confirm.module';
import {AppLoaderModule} from '../shared/servicios/app-loader/app-loader.module';
import {ModulosRoutes} from './modulos.routing';
import {ContabilidadComponent} from './contabilidad/contabilidad.component';
import {GeneralComponent} from './configurar/general/general.component';
import {DiarioscontablesComponent} from './configurar/diarioscontables/diarioscontables.component';
import {PopupComponentDC} from './configurar/diarioscontables/popup/popup.component';
import {GeneralService} from './configurar/general/general.service';
import {ModelospcComponent} from './configurar/modelospc/modelospc.component';
import {PopupComponentMPC} from './configurar/modelospc/popup/popup.component';
import {PlancontableComponent} from './configurar/plancontable/plancontable.component';
import {PopupComponentPC} from './configurar/plancontable/popup/popup.component';
import {GrupospersonalizadosComponent} from './configurar/grupospersonalizados/grupospersonalizados.component';
import {GPersonalizadoService} from './configurar/grupospersonalizados/grupospersonalizados.service';
import {PopupComponentGP} from './configurar/grupospersonalizados/popup/popup.component';
import {ListaComponent} from './configurar/grupospersonalizados/lista/lista.component';
import {CuentacontabledefectoComponent} from './configurar/cuentacontabledefecto/cuentacontabledefecto.component';
import {CuentaDefectoService} from './configurar/cuentacontabledefecto/cuentacontabledefecto.service';
import {CuentasbancariasComponent} from './finanzas/cuentasbancarias/cuentasbancarias.component';
import {PopupComponentCB} from './finanzas/cuentasbancarias/popup/popup.component';
import {CuentasivaComponent} from './configurar/cuentasiva/cuentasiva.component';
import {PopupComponentIVA} from './configurar/cuentasiva/popup/popup.component';
import {CuentaIvaService} from './configurar/cuentasiva/cuentasiva.service';
import {CuentasimpuestosComponent} from './configurar/cuentasimpuestos/cuentasimpuestos.component';
import {PopupComponentImpuesto} from './configurar/cuentasimpuestos/popup/popup.component';
import {CuentaImpuestoService} from './configurar/cuentasimpuestos/cuentasimpuestos.service';
import {CuentaspagosComponent} from './configurar/cuentaspagos/cuentaspagos.component';
import {PopupComponentCuentaP} from './configurar/cuentaspagos/popup/popup.component';
import {CuentaPagoService} from './configurar/cuentaspagos/cuentaspagos.service';
import {CuentasproductosComponent} from './configurar/cuentasproductos/cuentasproductos.component';
import {CuentaProductoService} from './configurar/cuentasproductos/cuentasproductos.service';
import {ExportacionComponent} from './configurar/exportacion/exportacion.component';
import {ExportacionService} from './configurar/exportacion/exportacion.service';
import {ContabilizarCComponent} from './contabilizarcliente/contabilizar/contabilizar.component';
import {ContabilizarService} from './contabilizarcliente/contabilizar/contabilizar.service';
import {ContabilizadaCComponent} from './contabilizarcliente/contabilizada/contabilizada.component';
import {ContabilizadaService} from './contabilizarcliente/contabilizada/contabilizada.service';
import {ContabilizarPComponent} from './contabilizarproveedor/contabilizar/contabilizar.component';
import {ContabilizadaPComponent} from './contabilizarproveedor/contabilizada/contabilizada.component';
import {ContabilizadaGComponent} from './contabilizargasto/contabilizada/contabilizada.component';
import {ContabilizarGComponent} from './contabilizargasto/contabilizar/contabilizar.component';
import {VentaComponent} from './procesardiarios/venta/venta.component';
import {CompraComponent} from './procesardiarios/compra/compra.component';
import {GastoComponent} from './procesardiarios/gasto/gasto.component';
import {LibromayorComponent} from './libromayor/libromayor.component';
import {SaldocuentaComponent} from './saldocuenta/saldocuenta.component';
import {GpredefinidoComponent} from './informes/resultado/gpredefinido/gpredefinido.component';
import {GpersonalizadoComponent} from './informes/resultado/gpersonalizado/gpersonalizado.component';
import {InformeGrupoPService} from './informes/resultado/gpersonalizado/gpersonalizado.service';
import {ClienteComponent} from './informes/ventas/cliente/cliente.component';
import {UsuarioComponent} from './informes/ventas/usuario/usuario.component';
import {ProductosComponent} from './informes/ventas/productos/productos.component';
import {PopupLibroMayor} from './libromayor/popup/popup.component';
import {LibroMayorService} from './libromayor/libromayor.service';
import {FileUploadModule} from 'ng2-file-upload';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ViewmodelopcComponent} from './configurar/modelospc/viewmodelopc/viewmodelopc.component';
import { EmpresaComponent } from './configurar/empresa/empresa.component';
import { PopupComponentEmpresa } from './configurar/empresa/popup/popup.component';
import { AplicacionComponent } from './configurar/aplicacion/aplicacion.component';
import { EstacionComponent } from './configurar/estacion/estacion.component';
import { NuevatransComponent } from './libromayor/nuevatrans/nuevatrans.component';
import {PopupComponentEstacion} from './configurar/estacion/popup/popup.component';
import {TokenComponent} from './configurar/estacion/token/token.component';
import {PopupComponentBanco} from './finanzas/banco/popup/popup.component';
import { BancoComponent } from './finanzas/banco/banco.component';
import { TipocuentabancariaComponent } from './finanzas/tipocuentabancaria/tipocuentabancaria.component';
import { PopupComponentTCBancaria } from './finanzas/tipocuentabancaria/popup/popup.component';
import { ListaDetallesComponent } from './libromayor/lista/lista.component';
import { MayorComponent } from './mayor/mayor.component';
import { TransaccionesComponent } from './transacciones/transacciones.component';
import { PopupTransaccion } from './transacciones/popup/popup.component';
import { ListaMayorComponent } from './mayor/lista/lista.component';
import { BalancecomprobacionComponent } from './reportes/balancecomprobacion/balancecomprobacion.component';
import { EstadoresultadoComponent } from './reportes/estadoresultado/estadoresultado.component';
import { BalancefinalComponent } from './reportes/balancefinal/balancefinal.component';
import { CuentabalanceComponent } from './configurar/cuentabalance/cuentabalance.component';
import { HojatrabajoComponent } from './reportes/hojatrabajo/hojatrabajo.component';



@NgModule({
  imports: [
    //modulos
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormsModule,
    NgxDatatableModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    AppConfirmModule,
    AppLoaderModule,
    MatTabsModule,
    FileUploadModule,
    MatProgressBarModule,
    HttpClientModule,
    MatAutocompleteModule,
    //PrimeNG
    TreeModule,
    RouterModule.forChild(ModulosRoutes)
  ],
  declarations: [
    //componentes
    ContabilidadComponent,
    GeneralComponent,
    DiarioscontablesComponent,
    PopupComponentDC,
    ModelospcComponent,
    PopupComponentMPC,
    PlancontableComponent,
    PopupComponentPC,
    GrupospersonalizadosComponent,
    PopupComponentGP,
    ListaComponent,
    CuentacontabledefectoComponent,
    CuentasbancariasComponent,
    PopupComponentCB,
    CuentasivaComponent,
    PopupComponentIVA,
    CuentasimpuestosComponent,
    PopupComponentImpuesto,
    CuentaspagosComponent,
    PopupComponentCuentaP,
    CuentasproductosComponent,
    ExportacionComponent,
    ContabilizarCComponent,
    ContabilizadaCComponent,
    ContabilizarPComponent,
    ContabilizadaPComponent,
    ContabilizadaGComponent,
    ContabilizarGComponent,
    VentaComponent,
    CompraComponent,
    GastoComponent,
    BancoComponent,
    LibromayorComponent,
    PopupLibroMayor,
    SaldocuentaComponent,
    GpredefinidoComponent,
    GpersonalizadoComponent,
    ClienteComponent,
    UsuarioComponent,
    ProductosComponent,
    ViewmodelopcComponent,
    EmpresaComponent,
    PopupComponentEmpresa,
    AplicacionComponent,
    EstacionComponent,
    NuevatransComponent,
    PopupComponentEstacion,
    TokenComponent,
    PopupComponentBanco,
    TipocuentabancariaComponent,
    PopupComponentTCBancaria,
    ListaDetallesComponent,
    MayorComponent,
    TransaccionesComponent,
    PopupTransaccion,
    ListaMayorComponent,
    BalancecomprobacionComponent,
    EstadoresultadoComponent,
    BalancefinalComponent,
    CuentabalanceComponent,
    HojatrabajoComponent

  ],
  providers: [
    //servicios
    GeneralService,
    GPersonalizadoService,
    CuentaDefectoService,
    CuentaIvaService,
    CuentaImpuestoService,
    CuentaPagoService,
    CuentaProductoService,
    ExportacionService,
    ContabilizarService,
    ContabilizadaService,
    InformeGrupoPService,
    LibroMayorService],
  entryComponents: [
    //pop-ups
    PopupComponentDC,
    PopupComponentMPC,
    PopupComponentPC,
    PopupComponentGP,
    PopupComponentCB,
    PopupComponentIVA,
    PopupComponentImpuesto,
    PopupComponentCuentaP,
    PopupLibroMayor,
    PopupComponentEmpresa,
    PopupComponentEstacion,
    TokenComponent,
    PopupComponentBanco,
    PopupComponentTCBancaria,
    PopupTransaccion
  ]
})
export class ModulosModule {
}
