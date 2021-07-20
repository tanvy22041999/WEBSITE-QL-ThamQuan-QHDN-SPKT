import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HandlerErrorService } from '../services/common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private handlerService: HandlerErrorService
  ) { }

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
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
