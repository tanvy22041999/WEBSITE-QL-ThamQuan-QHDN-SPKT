import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { ChuyenThamQuan } from 'src/app/core/models/tours/chuyen-tham-quan.model';
import { UrlConstant } from '../../../constants/url.constant';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class SaoLuuChuyenThamQuanService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService
  ) {
    this.apiUrl = UrlConstant.API.TOURS;
  }

  getAllSaoLuu(): Observable<ChuyenThamQuan[]> {
    return this.http
      .get<ChuyenThamQuan[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPagingSaoLuu(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string
  ): Observable<PagedResults<ChuyenThamQuan>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ? search : '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http
      .get<PagedResults<ChuyenThamQuan>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  createSaoLuu(model: ChuyenThamQuan): Observable<ChuyenThamQuan> {
    return this.http
      .post<ChuyenThamQuan>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  updateSaoLuu(model: ChuyenThamQuan, id: string): Observable<ChuyenThamQuan> {
    return this.http
      .put<ChuyenThamQuan>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  deleteSaoLuu(id: string): Observable<ChuyenThamQuan> {
    return this.http
      .delete<ChuyenThamQuan>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }
}
