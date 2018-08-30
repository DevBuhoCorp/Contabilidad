import { Component, OnInit, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { 
  Router, 
  NavigationEnd, 
  RouteConfigLoadStart, 
  RouteConfigLoadEnd, 
  ResolveStart, 
  ResolveEnd 
} from '@angular/router';
import { Subscription } from "rxjs";
import { MatSidenav } from '@angular/material';
import { MediaChange, ObservableMedia } from "@angular/flex-layout";
import { TranslateService } from 'ng2-translate/ng2-translate';
import { ThemeService } from '../../../servicios/theme.service';
import PerfectScrollbar from 'perfect-scrollbar';
import { LayoutService } from '../../../servicios/layout.service';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.template.html'
})
export class AdminLayoutComponent implements OnInit, AfterViewInit {
  public isModuleLoading: Boolean = false;
  private moduleLoaderSub: Subscription;
  private layoutConfSub: Subscription;
  private routerEventSub: Subscription;
  private mediaSub: Subscription;
  private isMobile;
  // private sidebarPS: PerfectScrollbar;
  private bodyPS: PerfectScrollbar;
  private headerFixedBodyPS: PerfectScrollbar;
  public layoutConf: any = {};


  constructor(
    private router: Router,
    public translate: TranslateService,
    public themeService: ThemeService,
    private layout: LayoutService,
    private media: ObservableMedia
  ) {
    // Cerrar sidenav después del cambio de ruta en el móvil
    this.routerEventSub = router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((routeChange: NavigationEnd) => {
      if(this.isSm()) {
        this.closeSidebar()
      }
    });
  }
  ngOnInit() {
    this.layoutConf = this.layout.layoutConf;
    this.isMobile = this.isSm();
    this.layout.publishLayoutChange({
      isMobile: this.isMobile,
      sidebarStyle: this.isMobile ? 'closed' : 'full'
    })
    // PARA LA BANDERA DEL CARGADOR DEL MÓDULO
    this.moduleLoaderSub = this.router.events.subscribe(event => {
      if(event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
        this.isModuleLoading = true;
      }
      if(event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        this.isModuleLoading = false;
      }
    });
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMobile = this.isSm();
    this.layout.publishLayoutChange({
      isMobile: this.isMobile,
      sidebarStyle: this.isMobile ? 'closed' : 'full'
    })
  }
  ngAfterViewInit() {
    this.layoutConfSub = this.layout.layoutConf$.subscribe(change => {
      this.initBodyPS(change)
    })
  }
  initBodyPS(layoutConf:any = {}) {
    if(layoutConf.navigationPos === 'side' && layoutConf.topbarFixed) {
      if (this.bodyPS) this.bodyPS.destroy();
      if (this.headerFixedBodyPS) this.headerFixedBodyPS.destroy();
      this.headerFixedBodyPS = new PerfectScrollbar('.rightside-content-hold', {
        suppressScrollX: true
      })
    } else {
      if (this.bodyPS) this.bodyPS.destroy();
      if (this.headerFixedBodyPS) this.headerFixedBodyPS.destroy();
      this.bodyPS = new PerfectScrollbar('.main-content-wrap', {
        suppressScrollX: true
      })
    }
  }
  ngOnDestroy() {
    if(this.moduleLoaderSub) {
      this.moduleLoaderSub.unsubscribe()
    }
    if(this.layoutConfSub) {
      this.layoutConfSub.unsubscribe()
    }
    if(this.routerEventSub) {
      this.routerEventSub.unsubscribe()
    }
  }
  closeSidebar() {
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    })
  }
  isSm() {
    return window.matchMedia(`(max-width: 959px)`).matches;
  }
}