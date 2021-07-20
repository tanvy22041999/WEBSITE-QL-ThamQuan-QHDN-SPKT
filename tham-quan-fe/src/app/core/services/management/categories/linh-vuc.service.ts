import { PagedResults } from './../../../models/common/response-page.model';
import { LinhVuc } from './../../../models/categories/linh-vuc.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { HandlerErrorService } from '../../common/handler-error.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LinhVucService {
  private apiUrl: string;



  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService
  ) {
    this.apiUrl = UrlConstant.API.RESEARCH_DOMAINS;
  }


  getAll(): Observable<LinhVuc[]> {
    return this.http.get<LinhVuc[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,

    column?: string): Observable<PagedResults<LinhVuc>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');

    return this.http.get<PagedResults<LinhVuc>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  create(model: LinhVuc): Observable<LinhVuc> {
    return this.http.post<LinhVuc>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  update(model: LinhVuc, id: string): Observable<LinhVuc> {
    return this.http.put<LinhVuc>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  delete(id: string): Observable<LinhVuc> {
    return this.http.delete<LinhVuc>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

  getLinhVucActive(search?: string): Observable<LinhVuc[]> {
    const params = new HttpParams()
      .set('search', search ?? '');
    return this.http.get<LinhVuc[]>(this.apiUrl, { params })
      .pipe(catchError(this.handleService.handleError));
  }
}
