import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

interface IMenuItem {
  type: string,       // Possible values: link/dropDown/icon/separator/extLink
  name?: string,      // Used as display text for item and title for separator type
  state?: string,     // Router state  ruta
  icon?: string,      // Material icon name
  tooltip?: string,   // Tooltip text 
  disabled?: boolean, // If true, item will not be appeared in sidenav.  estado
  sub?: IChildItem[], // Dropdown items   idpadre
  badges?: IBadge[]
}
interface IChildItem {
  type?: string,
  name: string,       // Display text
  state?: string,     // Router state
  icon?: string,
  sub?: IChildItem[]
}

interface IBadge {
  color: string;      // primary/accent/warn/hex color codes(#fff000)
  value: string;      // Display text
}

@Injectable()
export class NavigationService {
  constructor() { }


  iconMenu: IMenuItem[] = [
    {
      name: 'DASHBOARD',
      type: 'icon',
      tooltip: 'Dashboard',
      icon: 'dashboard',
      state: 'dashboard'
    },
    {
      name: 'PROFILE',
      type: 'icon',
      tooltip: 'Perfil',
      icon: 'person',
      state: 'profile/overview'
    },
    {
      type: 'separator',
      name: 'Items Principales'
    },
    {
      name: 'Contabilidad',
      type: 'link',
      icon: 'account_balance',
      state: 'modulos/contabilidad',
    },
    {
      name: 'Configurar',
      type: 'dropDown',
      icon: 'settings',
      state: 'modulos/configurar',
      sub: [
        //{ name: 'General', state: 'general' },
        { name: 'Empresa', state: 'empresas' },
        { name: 'Diarios Contables', state: 'diarioscontables' },
        { name: 'Modelos de Planes Contables', state: 'modelosplanescontables' },
        { name: 'Plan Contable', state: 'plancontable' },
        { name: 'Grupos Personalizados', state: 'grupospersonalizados' },
        { name: 'Cuentas Contables por Defecto', state: 'cuentacontablepordefecto' },
        { name: 'Cuentas Bancarias', state: 'cuentabancaria' },
       // { name: 'Cuentas de IVA', state: 'cuentaiva' },
        { name: 'Cuentas de Impuesto', state: 'cuentaimpuesto' },
       // { name: 'Cuentas de Informes de Pago', state: 'cuentapago' },
       // { name: 'Cuentas Contables de Productos', state: 'cuentaproducto' },
        // { name: 'Opciones de Exportación', state: 'exportacion' },
      ]
    },
    {
      name: 'Contabilizar Clientes',
      //name: 'Contabilizar Transacciones',
      type: 'dropDown',
      icon: 'account_balance_wallet',
      state: 'modulos/contabilizarcliente',
      sub: [
        { name: 'Líneas a contabilizar', state: 'contabilizar' },
        { name: 'Líneas contabilizadas', state: 'contabilizada' },
      ]
    },
    {
      name: 'Contabilizar Proveedores',
      type: 'dropDown',
      icon: 'directions_car',
      state: 'modulos/contabilizarproveedor/',
      sub: [
        { name: 'Líneas a contabilizar', state: 'contabilizar' },
        { name: 'Líneas contabilizadas', state: 'contabilizada' },
      ]
    },
    /*{
      name: 'Contabilizar Informes de Gastos',
      type: 'dropDown',
      icon: 'attach_money',
      state: 'modulos/contabilizargasto/',
      sub: [
        { name: 'Líneas a contabilizar', state: 'contabilizar' },
        { name: 'Líneas contabilizadas', state: 'contabilizada' },
      ]
    },*/
    {
      name: 'Procesar diarios',
      type: 'dropDown',
      icon: 'library_books',
      state: 'modulos/procesardiarios',
      sub: [
        { name: 'Ventas', state: 'venta' },
        { name: 'Compras', state: 'compra' },
        //{ name: 'Gastos', state: 'gasto' },
        { name: 'Bancos', state: 'banco' },
      ]
    },
    {
      name: 'Libro Mayor',
      type: 'link',
      icon: 'local_library',
      state: 'modulos/libromayor',
    },
    {
      name: 'Saldo de la cuenta',
      type: 'link',
      icon: 'assessment',
      state: 'modulos/saldocuenta',
    },
    {
      name: 'Informes',
      type: 'dropDown',
      icon: 'description',
      state: 'modulos',
      sub: [
        {
          name: 'Resultado/Ejercicio', type: 'dropDown', state: 'informes', sub: [
            { name: 'Por grupos predefinidos', state: 'grupopredefinido' },
            { name: 'Por grupos personalizados', state: 'grupopersonalizado' },
          ]
        },
        /*{
          name: 'Volumen de ventas', type: 'dropDown', state: 'ventas', sub: [
            { name: 'Por cliente', state: 'cliente' },
            { name: 'Por Usuario', state: 'usuario' },
            { name: 'Por productos y servicios', state: 'productos' },
          ]
        },*/
      ]
    },
  ]

  // Icon menu TITLE at the very top of navigation.
  // This title will appear if any icon type item is present in menu.
  iconTypeMenuTitle: string = 'Acceso frecuente';
  // sets iconMenu as default;
  menuItems = new BehaviorSubject<IMenuItem[]>(this.iconMenu);
  // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();

  // Customizer component uses this method to change menu.
  // You can remove this method and customizer component.
  // Or you can customize this method to supply different menu for
  // different user type.

}
