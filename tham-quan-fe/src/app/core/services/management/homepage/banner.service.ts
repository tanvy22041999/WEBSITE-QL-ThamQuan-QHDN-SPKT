import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { Banner } from 'src/app/core/models/homepage/banner.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  private apiUrl = '';

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService
  ) {
    this.apiUrl = UrlConstant.API.BANNER;
  }

  getAllActive(searchValue?: string): Observable<Banner[]> {
    const params = new HttpParams()
      .set('search', searchValue ?? '');
    return this.http.get<Banner[]>(this.apiUrl, { params })
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<Banner>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');

    return this.http.get<PagedResults<Banner>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  create(model: Banner): Observable<Banner> {
    return this.http.post<Banner>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  update(model: Banner, id: string): Observable<Banner> {
    return this.http.put<Banner>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  delete(id: string): Observable<Banner> {
    return this.http.delete<Banner>(this.apiUrl + `/delete/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

  changeStatus(id: string): Observable<Banner> {
    return this.http.delete<Banner>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }
}
