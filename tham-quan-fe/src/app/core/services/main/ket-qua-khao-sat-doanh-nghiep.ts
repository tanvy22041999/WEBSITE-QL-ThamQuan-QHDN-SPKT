import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from '../../constants/url.constant';
import { KetQuaKhaoSatDoanhNghiepDto } from '../../models/categories/cau-hoi-khao-sat-doanh-nghiep';
import { PagedResults } from '../../models/common/response-page.model';

import { HandlerErrorService } from '../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})

export class KetQuaKhaoSatDoanhNgiepService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.RESULT_SURVEY_BUSINESS;
  }
  getAll(): Observable<KetQuaKhaoSatDoanhNghiepDto[]> {
    return this.http.get<KetQuaKhaoSatDoanhNghiepDto[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<KetQuaKhaoSatDoanhNghiepDto>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');

    return this.http.get<PagedResults<KetQuaKhaoSatDoanhNghiepDto>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  create(model: KetQuaKhaoSatDoanhNghiepDto): Observable<KetQuaKhaoSatDoanhNghiepDto> {
    return this.http.post<KetQuaKhaoSatDoanhNghiepDto>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  update(model: KetQuaKhaoSatDoanhNghiepDto, id: string): Observable<KetQuaKhaoSatDoanhNghiepDto> {
    return this.http.put<KetQuaKhaoSatDoanhNghiepDto>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  delete(id: string): Observable<KetQuaKhaoSatDoanhNghiepDto> {
    return this.http.delete<KetQuaKhaoSatDoanhNghiepDto>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

  checkDoSurvey(id: string): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/kiem-tra-thuc-hien-khao-sat' + `/${id}`, {})
      .pipe(catchError(this.handleService.handleError));
  }
}
