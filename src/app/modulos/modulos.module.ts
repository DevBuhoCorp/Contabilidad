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
  MatCheckboxModule,
  MatRadioModule
} from '@angular/material';
// PrimeNG
import {TreeModule} from 'primeng/tree';

import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {AppConfirmModule} from '../shared/servicios/app-confirm/app-confirm.module';
import {AppLoaderModule} from '../shared/servicios/app-loader/app-loader.module';
import {ModulosRoutes} from './modulos.routing';
import {DiarioscontablesComponent} from './configurar/diarioscontables/diarioscontables.component';
import {PopupComponentDC} from './configurar/diarioscontables/popup/popup.component';
import {ModelospcComponent} from './configurar/modelospc/modelospc.component';
import {PopupComponentMPC} from './configurar/modelospc/popup/popup.component';
import {PlancontableComponent} from './configurar/plancontable/plancontable.component';
import {PopupComponentPC} from './configurar/plancontable/popup/popup.component';
import {CuentasbancariasComponent} from './finanzas/cuentasbancarias/cuentasbancarias.component';
import {PopupComponentCB} from './finanzas/cuentasbancarias/popup/popup.component';
import {ContabilizarCComponent} from './contabilizarcliente/contabilizar/contabilizar.component';
import {LibromayorComponent} from './libromayor/libromayor.component';
import {UsuarioComponent} from './nomina/usuario/usuario.component';
import {PopupLibroMayor} from './libromayor/popup/popup.component';
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
import { RolesComponent } from './nomina/roles/roles.component';
import { PopupComponentAplicacion } from './configurar/aplicacion/popup/popup.component';
import { PopupComponentRoles } from './nomina/roles/popup/popup.component';
import { PopupComponentUser } from './nomina/usuario/popup/popup.component';
import { UsersempresaComponent } from './nomina/usuario/usersempresa/usersempresa.component';
import {UserempresafilterPipe} from '../shared/pipes/userempresafilter.pipe';


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
    MatRadioModule,
    //PrimeNG
    TreeModule,
    RouterModule.forChild(ModulosRoutes)
  ],
  declarations: [
    //componentes
    DiarioscontablesComponent,
    PopupComponentDC,
    ModelospcComponent,
    PopupComponentMPC,
    PlancontableComponent,
    PopupComponentPC,
    CuentasbancariasComponent,
    PopupComponentCB,
    ContabilizarCComponent,
    BancoComponent,
    LibromayorComponent,
    PopupLibroMayor,
    UsuarioComponent,
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
    HojatrabajoComponent,
    RolesComponent,
    PopupComponentAplicacion,
    PopupComponentRoles,
    PopupComponentUser,
    UsersempresaComponent,
    UserempresafilterPipe,
    

  ],
  providers: [],
  entryComponents: [
    //pop-ups
    PopupComponentDC,
    PopupComponentMPC,
    PopupComponentPC,
    PopupComponentCB,
    PopupLibroMayor,
    PopupComponentEmpresa,
    PopupComponentEstacion,
    TokenComponent,
    PopupComponentBanco,
    PopupComponentTCBancaria,
    PopupTransaccion,
    PopupComponentAplicacion,
    PopupComponentRoles,
    PopupComponentUser,
    UsersempresaComponent,
    ListaDetallesComponent
  ]
})
export class ModulosModule {
}
