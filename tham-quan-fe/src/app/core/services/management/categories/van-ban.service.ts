import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { VanBan } from 'src/app/core/models/categories/van_ban.model';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class VanBanService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.DOCUMENTS;
  }

  getAll(): Observable<VanBan[]> {
    return this.http.get<VanBan[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<VanBan>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');

    return this.http.get<PagedResults<VanBan>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  create(model: VanBan): Observable<VanBan> {
    return this.http.post<VanBan>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  update(model: VanBan, id: string): Observable<VanBan> {
    return this.http.put<VanBan>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  delete(id: string): Observable<VanBan> {
    return this.http.delete<VanBan>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

}
