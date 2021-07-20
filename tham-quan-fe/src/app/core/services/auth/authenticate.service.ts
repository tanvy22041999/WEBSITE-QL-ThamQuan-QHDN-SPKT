import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SystemConstant } from '../../constants/system.constant';
import { UrlConstant } from '../../constants/url.constant';
import { AuthModel, LoginFormModel } from '../../models/common/auth.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HandlerErrorService } from '../common/handler-error.service';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from '../../constants/language.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  private apiUrlAdmin: string;
  private apiUrlLecturer: string;
  private apiUrlStudent: string;
  private apiUrlGuide: string;
  private apiUrlBusiness: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private handleErrorService: HandlerErrorService,
    private alert: ToastrService,
  ) {
    this.apiUrlAdmin = UrlConstant.API.LOGIN_ADMIN;
    this.apiUrlLecturer = UrlConstant.API.LOGIN_LECTURER;
    this.apiUrlStudent = UrlConstant.API.LOGIN_STUDENT;
    this.apiUrlGuide = UrlConstant.API.LOGIN_GUIDE;
    this.apiUrlBusiness = UrlConstant.API.LOGIN_BUSINESS;
  }


  /************************************
   *             Common
   ************************************/
  getNameOfLogin(): string {
    return JSON.parse(localStorage.getItem(SystemConstant.CURRENT_INFO))?.fullName;
  }

  getAvatarOfLogin(): string {
    return JSON.parse(localStorage.getItem(SystemConstant.CURRENT_INFO))?.avatar;
  }

  doLogout(): void {
    localStorage.removeItem(SystemConstant.CURRENT_INFO);
    localStorage.removeItem(SystemConstant.CURRENT_INFO_GOOGLE);

    this.router.navigate([UrlConstant.ROUTE.MAIN.HOME]);
    window.location.assign('../');
  }



  /************************************
   *         Login Function
   ************************************/
  doLoginGoogle(role: string, token: string): Observable<AuthModel> {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        idToken: token
      })
    };

    switch (role) {
      case SystemConstant.ROLE.ADMIN:
        return this.http
          .post<AuthModel>(this.apiUrlAdmin + `/google`, null, httpOptions)
          .pipe(catchError(this.handleErrorService.handleError));
      case SystemConstant.ROLE.LECTURER:
        return this.http
          .post<AuthModel>(this.apiUrlLecturer + `/google`, null, httpOptions)
          .pipe(catchError(this.handleErrorService.handleError));
      case SystemConstant.ROLE.STUDENT:
        return this.http
          .post<AuthModel>(this.apiUrlStudent + `/google`, null, httpOptions)
          .pipe(catchError(this.handleErrorService.handleError));
      case SystemConstant.ROLE.GUIDE:
        return this.http
          .post<AuthModel>(this.apiUrlGuide + `/google`, null, httpOptions)
          .pipe(catchError(this.handleErrorService.handleError));
      case SystemConstant.ROLE.BUSINESS:
        return this.http
          .post<AuthModel>(this.apiUrlBusiness + `/google`, null, httpOptions)
          .pipe(catchError(this.handleErrorService.handleError));
      default:
        this.alert.error(this.langData[this.langCode].PHAN_QUYEN_KHONG_TON_TAI);
        return null;
    }
  }

  doLoginForm(role: string, model: LoginFormModel): Observable<AuthModel> {
    switch (role) {
      case SystemConstant.ROLE.ADMIN:
        return this.http
          .post<AuthModel>(this.apiUrlAdmin, model)
          .pipe(catchError(this.handleErrorService.handleError));
      case SystemConstant.ROLE.LECTURER:
        return this.http
          .post<AuthModel>(this.apiUrlLecturer, model)
          .pipe(catchError(this.handleErrorService.handleError));
      case SystemConstant.ROLE.STUDENT:
        return this.http
          .post<AuthModel>(this.apiUrlStudent, model)
          .pipe(catchError(this.handleErrorService.handleError));
      case SystemConstant.ROLE.GUIDE:
        return this.http
          .post<AuthModel>(this.apiUrlGuide, model)
          .pipe(catchError(this.handleErrorService.handleError));
      case SystemConstant.ROLE.BUSINESS:
        return this.http
          .post<AuthModel>(this.apiUrlBusiness, model)
          .pipe(catchError(this.handleErrorService.handleError));
      default:
        this.alert.error(this.langData[this.langCode].PHAN_QUYEN_KHONG_TON_TAI);
        return null;
    }
  }



  /************************************
   *       Processing Auth Data
   ************************************/
  getAuthData(): AuthModel {
    return JSON.parse(localStorage.getItem(SystemConstant.CURRENT_INFO));
  }

  setAuthData(model: AuthModel): void {
    localStorage.setItem(
      SystemConstant.CURRENT_INFO,
      JSON.stringify(model)
    );
  }



  /************************************
   *           Check role
   ************************************/
  checkRole(roleCheck: string): boolean {
    const auth = this.getAuthData();
    let role = [];
    role = auth.roles.filter(item => item === roleCheck);
    if (role && role.length > 0) {
      return true;
    } else {
      return false;
    }
  }

}
