import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { TaiKhoan } from 'src/app/core/models/setting/tai-khoan.model';

import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class TaiKhoanService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService
  ) {
    this.apiUrl = UrlConstant.API.ACCOUNTS;
  }

  getAll(): Observable<TaiKhoan[]> {
    return this.http
      .get<TaiKhoan[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string
  ): Observable<PagedResults<TaiKhoan>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');

    return this.http
      .get<PagedResults<TaiKhoan>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  getRoles(): Observable<[]> {
    return this.http
      .get<[]>(this.apiUrl + '/roles')
      .pipe(catchError(this.handleService.handleError));
  }

  create(model: TaiKhoan): Observable<TaiKhoan> {
    return this.http
      .post<TaiKhoan>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  update(model: TaiKhoan, id: string): Observable<TaiKhoan> {
    return this.http
      .put<TaiKhoan>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  delete(id: string): Observable<TaiKhoan> {
    return this.http
      .delete<TaiKhoan>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

  getCurrent(): Observable<TaiKhoan[]> {
    return this.http
      .get<TaiKhoan[]>(this.apiUrl + '/current')
      .pipe(catchError(this.handleService.handleError));
  }
}
