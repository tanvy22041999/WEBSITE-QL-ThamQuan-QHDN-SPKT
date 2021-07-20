import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { Nganh } from 'src/app/core/models/categories/nganh.model';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class NganhService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.MAJORS;
  }

  getAll(): Observable<Nganh[]> {
    return this.http.get<Nganh[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<Nganh>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http.get<PagedResults<Nganh>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  create(model: Nganh): Observable<Nganh> {
    return this.http.post<Nganh>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  update(model: Nganh, id: string): Observable<Nganh> {
    return this.http.put<Nganh>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  delete(id: string): Observable<Nganh> {
    return this.http.delete<Nganh>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

  getByIdKhoa(id: string): Observable<Nganh[]> {
    return this.http.get<Nganh[]>(this.apiUrl + `/khoa/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

}
