/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from '../constants/url.constant';
import { HandlerErrorService } from '../services/common/handler-error.service';
import { AuthenticateService } from '../services/auth/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private handlerService: HandlerErrorService,
    private authenticateService: AuthenticateService
  ) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url.includes(UrlConstant.API.LOGIN_ADMIN) || request.url.includes(UrlConstant.API.LOGIN_LECTURER) ||
    request.url.includes(UrlConstant.API.LOGIN_STUDENT)) {
      // return next.handle(request);
      return next.handle(this.addLanguageOnly(request)).pipe(
        catchError(
          err =>
            new Observable<HttpEvent<unknown>>(observer => {
              this.handlerService.convertError(err.error);
              observer.error(err);
              observer.complete();
            })
        )
      );
    } else if (this.authenticateService.getAuthData() !== null) {
      return next.handle(this.addTokenAndLanguage(request)).pipe(
        catchError(
          err =>
            new Observable<HttpEvent<unknown>>(observer => {
              this.handlerService.convertError(err.error);
              observer.error(err);
              observer.complete();
            })
        )
      );
    } else {
      return next.handle(this.addLanguageOnly(request)).pipe(
        catchError(
          err =>
            new Observable<HttpEvent<unknown>>(observer => {
              this.handlerService.convertError(err.error);
              observer.error(err);
              observer.complete();
            })
        )
      );
    }
  }

  private addTokenAndLanguage(request: HttpRequest<unknown>): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authenticateService.getAuthData().token}`,
        'Accept-Language': localStorage.getItem('language') ? localStorage.getItem('language') : 'en'
      }
    });
  }

  private addLanguageOnly(request: HttpRequest<unknown>): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        'Accept-Language': localStorage.getItem('language') === 'vi' ? 'vn' : 'en'
      }
    });
  }
}
