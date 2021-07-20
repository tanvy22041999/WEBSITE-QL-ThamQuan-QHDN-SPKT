import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { SideBanner } from 'src/app/core/models/homepage/side-banner.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class SideBannerService {

  private apiUrl = '';

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService
  ) {
    this.apiUrl = UrlConstant.API.SIDE_BANNER;
  }

  getAllActive(searchValue?: string): Observable<SideBanner[]> {
    const params = new HttpParams()
      .set('search', searchValue ?? '');
    return this.http.get<SideBanner[]>(this.apiUrl, { params })
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<SideBanner>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');

    return this.http.get<PagedResults<SideBanner>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  create(model: SideBanner): Observable<SideBanner> {
    return this.http.post<SideBanner>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  update(model: SideBanner, id: string): Observable<SideBanner> {
    return this.http.put<SideBanner>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  delete(id: string): Observable<SideBanner> {
    return this.http.delete<SideBanner>(this.apiUrl + `/delete/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

  changeStatus(id: string): Observable<SideBanner> {
    return this.http.delete<SideBanner>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }
}
