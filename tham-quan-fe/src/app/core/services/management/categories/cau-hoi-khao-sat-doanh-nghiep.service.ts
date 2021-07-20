import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { CauHoiKhaoSatDoanhNghiep } from 'src/app/core/models/categories/cau-hoi-khao-sat-doanh-nghiep';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class CauHoiKhaoSatDoanhNgiepService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService
  ) {
    this.apiUrl = UrlConstant.API.SURVEY_BUSINESS;
  }

  getAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<CauHoiKhaoSatDoanhNghiep>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');

    return this.http.get<PagedResults<CauHoiKhaoSatDoanhNghiep>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }


  getById(id: string): Observable<CauHoiKhaoSatDoanhNghiep> {
    return this.http.get<CauHoiKhaoSatDoanhNghiep>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

  create(model: CauHoiKhaoSatDoanhNghiep): Observable<CauHoiKhaoSatDoanhNghiep> {
    return this.http.post<CauHoiKhaoSatDoanhNghiep>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  update(model: CauHoiKhaoSatDoanhNghiep, id: string,): Observable<CauHoiKhaoSatDoanhNghiep> {
    return this.http.put<CauHoiKhaoSatDoanhNghiep>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  delete(id: string): Observable<CauHoiKhaoSatDoanhNghiep> {
    return this.http.delete<CauHoiKhaoSatDoanhNghiep>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

  getListCauHoiByIdTour(idTour: string): Observable<CauHoiKhaoSatDoanhNghiep[]> {
    return this.http.get<CauHoiKhaoSatDoanhNghiep[]>(this.apiUrl + `/khao-sat` + `/${idTour}`)
      .pipe(catchError(this.handleService.handleError));
  }
}
