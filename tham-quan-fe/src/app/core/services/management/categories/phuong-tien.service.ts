import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { PhuongTien } from 'src/app/core/models/categories/phuong-tien.model';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class PhuongTienService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.VEHICLE;
  }

  getAll(): Observable<PhuongTien[]> {
    return this.http.get<PhuongTien[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<PhuongTien>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ? sort : '')
      .set('column', column ? column : '');
    return this.http.get<PagedResults<PhuongTien>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  create(model: PhuongTien): Observable<PhuongTien> {
    return this.http.post<PhuongTien>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  update(model: PhuongTien, id: string): Observable<PhuongTien> {
    return this.http.put<PhuongTien>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  delete(id: string): Observable<PhuongTien> {
    return this.http.delete<PhuongTien>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

}
