import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from '../../constants/url.constant';
import { KetQuaKhaoSatSinhVienDto } from '../../models/categories/cau-hoi-khao-sat-sinh-vien';
import { PagedResults } from '../../models/common/response-page.model';

import { HandlerErrorService } from '../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})

export class KetQuaKhaoSatSinhVienService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.RESULT_SURVEY_STUDENT;
  }
  getAll(): Observable<KetQuaKhaoSatSinhVienDto[]> {
    return this.http.get<KetQuaKhaoSatSinhVienDto[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<KetQuaKhaoSatSinhVienDto>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');

    return this.http.get<PagedResults<KetQuaKhaoSatSinhVienDto>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  create(model: KetQuaKhaoSatSinhVienDto): Observable<KetQuaKhaoSatSinhVienDto> {
    return this.http.post<KetQuaKhaoSatSinhVienDto>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  update(model: KetQuaKhaoSatSinhVienDto, id: string): Observable<KetQuaKhaoSatSinhVienDto> {
    return this.http.put<KetQuaKhaoSatSinhVienDto>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  delete(id: string): Observable<KetQuaKhaoSatSinhVienDto> {
    return this.http.delete<KetQuaKhaoSatSinhVienDto>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

  checkDoSurvey(id: string): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/kiem-tra-thuc-hien-khao-sat' + `/${id}`, {})
      .pipe(catchError(this.handleService.handleError));
  }

}
