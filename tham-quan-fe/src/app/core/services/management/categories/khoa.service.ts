import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from 'src/app/core/constants/url.constant';

import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { HandlerErrorService } from '../../common/handler-error.service';

import { Khoa } from 'src/app/core/models/categories/khoa.model';
@Injectable({
  providedIn: 'root',
})
export class KhoaService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService
  ) {
    this.apiUrl = UrlConstant.API.FACULTIES;
  }

  getAll(): Observable<Khoa[]> {
    return this.http
      .get<Khoa[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string
  ): Observable<PagedResults<Khoa>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http
      .get<PagedResults<Khoa>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  create(model: Khoa): Observable<Khoa> {
    return this.http
      .post<Khoa>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  update(model: Khoa, id: string): Observable<Khoa> {
    return this.http
      .put<Khoa>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  delete(id: string): Observable<Khoa> {
    return this.http
      .delete<Khoa>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }
}
