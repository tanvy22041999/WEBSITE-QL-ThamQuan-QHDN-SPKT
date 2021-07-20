import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from '../../constants/url.constant';
import { KetQuaKhaoSatCTVDto } from '../../models/categories/cau-hoi-khao-sat-ctv';
import { PagedResults } from '../../models/common/response-page.model';

import { HandlerErrorService } from '../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})

export class KetQuaKhaoSatCTVService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.RESULT_SURVEY_GUIDE;
  }
  getAll(): Observable<KetQuaKhaoSatCTVDto[]> {
    return this.http.get<KetQuaKhaoSatCTVDto[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<KetQuaKhaoSatCTVDto>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');

    return this.http.get<PagedResults<KetQuaKhaoSatCTVDto>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  checkDoSurvey(id: string): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/kiem-tra-thuc-hien-khao-sat' + `/${id}`, {})
      .pipe(catchError(this.handleService.handleError));
  }

  create(model: KetQuaKhaoSatCTVDto): Observable<KetQuaKhaoSatCTVDto> {
    return this.http.post<KetQuaKhaoSatCTVDto>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  update(model: KetQuaKhaoSatCTVDto, id: string): Observable<KetQuaKhaoSatCTVDto> {
    return this.http.put<KetQuaKhaoSatCTVDto>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  delete(id: string): Observable<KetQuaKhaoSatCTVDto> {
    return this.http.delete<KetQuaKhaoSatCTVDto>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }


}
