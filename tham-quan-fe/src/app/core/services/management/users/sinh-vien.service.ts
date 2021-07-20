import { FilterSinhVien, SinhVien } from '../../../models/users/sinh-vien.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class SinhVienService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService
  ) {
    this.apiUrl = UrlConstant.API.STUDENTS;
  }

  getAll(): Observable<SinhVien[]> {
    return this.http
      .get<SinhVien[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string
  ): Observable<PagedResults<SinhVien>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ? search : '')
      .set('sort', sort ? sort : '')
      .set('column', column ? column : '');
    return this.http
      .get<PagedResults<SinhVien>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  getCurrentStudent(): Observable<SinhVien> {
    return this.http.get<SinhVien>(this.apiUrl + '/current')
      .pipe(catchError(this.handleService.handleError));
  }

  getFilterSinhVien(
    model: FilterSinhVien,
    page: number,
    size?: number,
    sort?: string,
    column?: string
  ): Observable<PagedResults<SinhVien>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort ? sort : '')
      .set('column', column ?? '');

    return this.http
      .post<PagedResults<SinhVien>>(this.apiUrl + `/filter`, model, { params })
      .pipe(catchError(this.handleService.handleError));
  }

  getAllSinhVien(searchValue?: string): Observable<SinhVien[]> {
    const params = new HttpParams()
      .set('search', searchValue);
    return this.http
      .get<SinhVien[]>(this.apiUrl, { params })
      .pipe(catchError(this.handleService.handleError));
  }


  create(model: SinhVien): Observable<SinhVien> {
    return this.http
      .post<SinhVien>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  update(model: SinhVien, id: string): Observable<SinhVien> {
    return this.http
      .put<SinhVien>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  delete(id: string): Observable<SinhVien> {
    return this.http
      .delete<SinhVien>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

  getById(id: string): Observable<SinhVien> {
    return this.http
      .get<SinhVien>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

}
