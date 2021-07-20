import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { CommonSettings } from 'src/app/core/models/setting/common-settings.model';

import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class CommonSettingsService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService
  ) {
    this.apiUrl = UrlConstant.API.COMMON_SETTINGS;
  }

  getAll(): Observable<CommonSettings[]> {
    return this.http
      .get<CommonSettings[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string
  ): Observable<PagedResults<CommonSettings>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');

    return this.http
      .get<PagedResults<CommonSettings>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  create(model: CommonSettings): Observable<CommonSettings> {
    return this.http
      .post<CommonSettings>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  update(model: CommonSettings, id: string): Observable<CommonSettings> {
    return this.http
      .put<CommonSettings>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  delete(id: string): Observable<CommonSettings> {
    return this.http
      .delete<CommonSettings>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }
}
