/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { UrlConstant } from '../../constants/url.constant';
import { SystemConstant } from '../../constants/system.constant';
import { ResponseErrorData } from '../../models/common/response-data.model';
import { LanguageConstant } from '../../constants/language.constant';

@Injectable({
  providedIn: 'root'
})
export class HandlerErrorService {

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ?? 'en';
  //////////////////////////////

  routerNext = '';

  constructor(
    private alert: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
    } else {
      return throwError(error.error);
    }
    return throwError('Something bad happened; please try again later.');
  }

  handleErrorForkJoin(): Observable<unknown> {
    return of([]);
  }

  parseErrorBlob(err: HttpErrorResponse): Observable<unknown> {
    const reader: FileReader = new FileReader();

    const obs = new Observable((observer: any) => {
      reader.onloadend = () => {
        observer.error(JSON.parse(reader.result as any));
        observer.complete();
      };
    });
    reader.readAsText(err.error);
    return obs;
  }

  convertError(err: ResponseErrorData): void {
    this.spinner.hide();

    if (this.getToken()) {
      this.routerNext = UrlConstant.ROUTE.LOGIN;
    } else {
      this.routerNext = UrlConstant.ROUTE.MAIN.HOME;
    }

    if (err) {
      if (err.type === 'error') {
        this.alert.warning(this.langData[this.langCode].MAT_KET_NOI_SERVER);
      } else {
        if (typeof err === 'string') {
          err = JSON.parse(err);
          if (err) {
            if (err.status === 500) {
              this.alert.error(this.langData[this.langCode].CO_LOI_XAY_RA);
            } else {
              this.alert.error(err.message);
            }
          } else {
            this.alert.warning(this.langData[this.langCode].MAT_KET_NOI_SERVER);
          }
        } else {
          if (err) {
            switch (err.status) {
              case 401:
                this.alert.error(this.langData[this.langCode].TAI_KHOAN_KHONG_CO_QUYEN);
                this.doLogout();
                this.router.navigate([this.routerNext]);
                break;
              case 403:
                this.alert.warning(this.langData[this.langCode].TAI_KHOAN_KHONG_CO_QUYEN);
                this.doLogout();
                this.router.navigate([this.routerNext]);
                break;
              default:
                if (err.status === 500) {
                  this.alert.error(this.langData[this.langCode].CO_LOI_XAY_RA);
                } else {
                  this.alert.error(err.message);
                }
                break;
            }
          } else {
            this.alert.warning(this.langData[this.langCode].MAT_KET_NOI_SERVER);
          }
        }
      }
    } else {
      this.alert.warning(this.langData[this.langCode].MAT_KET_NOI_SERVER);
      this.doLogout();
      this.router.navigate([this.routerNext]);
    }
  }

  doLogout(): void {
    const langCode = localStorage.getItem('language') ?? 'en';
    setTimeout(() => {
      localStorage.clear();
    }, 100);
    setTimeout(() => {
      localStorage.setItem('language', langCode);
    }, 200);
  }

  getToken(): string {
    return JSON.parse(localStorage.getItem(SystemConstant.CURRENT_INFO))?.token;
  }
}
