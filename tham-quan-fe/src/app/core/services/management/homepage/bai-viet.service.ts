import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { BaiViet } from 'src/app/core/models/homepage/bai-viet.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class BaiVietService {

  private apiUrl = '';

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService
  ) {
    this.apiUrl = UrlConstant.API.POSTS;
  }

  getPostById(id: string): Observable<BaiViet> {
    return this.http.get<BaiViet>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPostActiveByType(postType: string): Observable<BaiViet[]> {
    const params = new HttpParams()
      .set('loaiBaiViet', postType);
    return this.http.get<BaiViet[]>(this.apiUrl, { params })
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPagingAdmin(
    loaiBaiViet: string,
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<BaiViet>> {
    const params = new HttpParams()
      .set('loaiBaiViet', loaiBaiViet)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');

    return this.http.get<PagedResults<BaiViet>>(this.apiUrl + '/filter', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  getListPostByTypePaging(
    postType: string,
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<BaiViet>> {
    const params = new HttpParams()
      .set('loaiBaiViet', postType)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');

    return this.http.get<PagedResults<BaiViet>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  create(model: BaiViet): Observable<BaiViet> {
    return this.http.post<BaiViet>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  update(model: BaiViet, id: string): Observable<BaiViet> {
    return this.http.put<BaiViet>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  changeStatus(id: string): Observable<BaiViet> {
    return this.http.delete<BaiViet>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

}
