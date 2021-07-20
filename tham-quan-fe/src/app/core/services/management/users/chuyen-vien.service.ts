import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { ChuyenVien } from 'src/app/core/models/users/chuyen-vien.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class ChuyenVienService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.MANAGEMENT_EXPERT;
  }

  getAllExpert(): Observable<ChuyenVien[]> {
    return this.http.get<ChuyenVien[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPagingExpert(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<ChuyenVien>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');

    return this.http.get<PagedResults<ChuyenVien>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  createExpert(model: ChuyenVien): Observable<ChuyenVien> {
    return this.http.post<ChuyenVien>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  updateExpert(model: ChuyenVien, id: string): Observable<ChuyenVien> {
    return this.http.put<ChuyenVien>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  deleteExpert(id: string): Observable<ChuyenVien> {
    return this.http.delete<ChuyenVien>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

}

