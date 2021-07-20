import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { DiaDiem } from 'src/app/core/models/categories/dia-diem.model';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class DiaDiemService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService
  ) {
    this.apiUrl = UrlConstant.API.LOCATIONS;
  }

  getAll(): Observable<DiaDiem[]> {
    return this.http
      .get<DiaDiem[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string
  ): Observable<PagedResults<DiaDiem>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ? search : '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http
      .get<PagedResults<DiaDiem>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  create(model: DiaDiem): Observable<DiaDiem> {
    return this.http
      .post<DiaDiem>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  update(model: DiaDiem, id: string): Observable<DiaDiem> {
    return this.http
      .put<DiaDiem>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  delete(id: string): Observable<DiaDiem> {
    return this.http
      .delete<DiaDiem>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }
}
