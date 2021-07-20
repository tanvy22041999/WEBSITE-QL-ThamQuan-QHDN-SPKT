import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { DoanhNghiep } from 'src/app/core/models/categories/doanh-nghiep.model';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class DoanhNghiepService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.BUSINESS;
  }

  getAll(): Observable<DoanhNghiep[]> {
    return this.http.get<DoanhNghiep[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<DoanhNghiep>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http.get<PagedResults<DoanhNghiep>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  getCurrentDoanhNghiep(): Observable<DoanhNghiep> {
    return this.http.get<DoanhNghiep>(this.apiUrl + '/current')
      .pipe(catchError(this.handleService.handleError));
  }

  create(model: DoanhNghiep): Observable<DoanhNghiep> {
    return this.http.post<DoanhNghiep>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  update(model: DoanhNghiep, id: string): Observable<DoanhNghiep> {
    return this.http.put<DoanhNghiep>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  delete(id: string): Observable<DoanhNghiep> {
    return this.http.delete<DoanhNghiep>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

  importDanhSachDoanhNghiep(file: File) {
    const fd = new FormData();
    fd.append('file', file, file.name);

    return this.http
      .post(this.apiUrl + '/import-danh-sach-doanh-nghiep', fd, { observe: 'response', responseType: 'text' })
      .pipe(catchError(this.handleService.handleError));
  }

}
