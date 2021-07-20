import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SystemConstant } from '../constants/system.constant';
import { AuthenticateService } from '../services/auth/authenticate.service';
@Injectable({
  providedIn: 'root'
})
export class LecturerGuard implements CanActivate {
  constructor(
    private authService: AuthenticateService
  ) { }

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    try {
      if (this.authService.getAuthData()) {
        if (this.authService.checkRole(SystemConstant.ROLE.LECTURER)) {
          return of(true);
        }
      }
      return of(false);
    } catch (error) {
      return of(false);
    }
  }

  async canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | Observable<boolean>> {
    return this.canActivate(route, state);
  }
}
