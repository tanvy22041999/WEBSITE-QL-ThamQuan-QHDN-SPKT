
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { DotThamQuan } from 'src/app/core/models/categories/dot-tham-quan.model';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class DotThamQuanService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService
  ) {
    this.apiUrl = UrlConstant.API.TOUR_TIMES;
  }

  getAll(): Observable<PagedResults<DotThamQuan>> {
    return this.http
      .get<PagedResults<DotThamQuan>>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string
  ): Observable<PagedResults<DotThamQuan>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ? search : '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http
      .get<PagedResults<DotThamQuan>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  create(model: DotThamQuan): Observable<DotThamQuan> {
    return this.http
      .post<DotThamQuan>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  update(model: DotThamQuan, id: string): Observable<DotThamQuan> {
    return this.http
      .put<DotThamQuan>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  delete(id: string): Observable<DotThamQuan> {
    return this.http
      .delete<DotThamQuan>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }
}
