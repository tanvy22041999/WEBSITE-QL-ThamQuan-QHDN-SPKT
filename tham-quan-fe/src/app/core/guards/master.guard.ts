/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, Injector } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Data, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, from, of } from 'rxjs';
import { LanguageConstant } from '../constants/language.constant';

@Injectable({
  providedIn: 'root'
})
export class MasterGuard implements CanActivate, CanActivateChild {

  private route: ActivatedRouteSnapshot;
  private state: RouterStateSnapshot;
  private executor: 'canActivate' | 'canActivateChild';
  private relation: 'OR' | 'AND' = 'OR';
  private fallbackUrl = '';

  // Ngon ngu hien thi //////////
  private langData = LanguageConstant;
  private langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  constructor(
    private injectorSvc: Injector,
    private router: Router,
    private alert: ToastrService) { }

  public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    this.executor = 'canActivate';
    this.route = route;
    this.state = state;
    return this.middleware().then(finalResult => {
      if (!finalResult) {
        const langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
        setTimeout(() => {
          this.alert.error(this.langData[this.langCode].TAI_KHOAN_KHONG_CO_QUYEN);
          localStorage.clear();
        }, 100);
        setTimeout(() => {
          if (this.fallbackUrl) {
            localStorage.setItem('language', langCode);
            this.router.navigateByUrl(this.fallbackUrl);
          }
        }, 200);
      }
      return finalResult;
    });
  }

  public async canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    this.executor = 'canActivateChild';
    this.route = route;
    this.state = state;
    return this.middleware().then(finalResult => {
      if (!finalResult && this.fallbackUrl) {
        this.router.navigateByUrl('/' + this.fallbackUrl);
      }
      return finalResult;
    });
  }

  private middleware(): Promise<boolean> {

    const data = this.findDataWithGuards(this.route);

    if (!data.guards || !data.guards.length) {
      return Promise.resolve(true);
    }

    if (typeof this.route.data.guardsRelation === 'string') {
      this.relation = this.route.data.guardsRelation.toUpperCase() === 'OR' ? 'OR' : 'AND';
    } else {
      this.relation = (data.guardsRelation === 'string' && data.guardsRelation.toUpperCase() === 'OR') ? 'OR' : 'AND';
    }

    if (typeof this.route.data.fallbackUrl === 'string') {
      this.fallbackUrl = this.route.data.fallbackUrl;
    } else {
      this.fallbackUrl = '';
    }

    return this.executeGuards(data.guards);
  }

  private findDataWithGuards(route: ActivatedRouteSnapshot): Data {

    if (route.data.guards) {
      return route.data;
    }

    if ((route.routeConfig.canActivateChild && route.routeConfig.canActivateChild.findIndex(guard => this instanceof guard) >= 0)
      || (route.routeConfig.canActivate && route.routeConfig.canActivate.findIndex(guard => this instanceof guard) >= 0)) {
      return route.data;
    }

    return this.findDataWithGuards(route.parent);
  }

  // Execute the guards sent in the route data
  private async executeGuards(guards: Array<unknown>, guardIndex = 0): Promise<boolean> {
    return this.activateGuard(guards[guardIndex])
      .then((result) => {
        if (this.relation === 'AND' && !result) {
          return Promise.resolve(false);
        }

        if (this.relation === 'OR' && result) {
          return Promise.resolve(true);
        }

        if (guardIndex < guards.length - 1) {
          return this.executeGuards(guards, guardIndex + 1);
        } else {
          return Promise.resolve(result);
        }
      })
      .catch(() => Promise.reject(false));
  }

  private activateGuard(token: any): Promise<boolean> {
    const guard = this.injectorSvc.get<any>(token);

    // eslint-disable-next-line @typescript-eslint/init-declarations
    let result: Observable<boolean> | Promise<boolean> | boolean;
    switch (this.executor) {
      case 'canActivate':
        result = guard.canActivate(this.route, this.state);
        break;
      case 'canActivateChild':
        result = guard.canActivateChild(this.route, this.state);
        break;
      default:
        result = guard.canActivate(this.route, this.state);
        break;
    }

    if (typeof result === 'boolean') {
      return Promise.resolve(result);
    }

    return from(result ? result : of(false)).toPromise() as Promise<boolean>;
  }
}
