import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { CauHoiKhaoSatCTV } from 'src/app/core/models/categories/cau-hoi-khao-sat-ctv';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class CauHoiKhaoSatCTVService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService
  ) {
    this.apiUrl = UrlConstant.API.SURVEY_GUIDE;
  }

  getAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<CauHoiKhaoSatCTV>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');

    return this.http.get<PagedResults<CauHoiKhaoSatCTV>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }


  getById(id: string): Observable<CauHoiKhaoSatCTV> {
    return this.http.get<CauHoiKhaoSatCTV>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

  create(model: CauHoiKhaoSatCTV): Observable<CauHoiKhaoSatCTV> {
    return this.http.post<CauHoiKhaoSatCTV>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  update(model: CauHoiKhaoSatCTV, id: string,): Observable<CauHoiKhaoSatCTV> {
    return this.http.put<CauHoiKhaoSatCTV>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  delete(id: string): Observable<CauHoiKhaoSatCTV> {
    return this.http.delete<CauHoiKhaoSatCTV>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

  getListCauHoiByIdTour(idTour: string): Observable<CauHoiKhaoSatCTV[]> {
    return this.http.get<CauHoiKhaoSatCTV[]>(this.apiUrl + `/khao-sat` + `/${idTour}`)
      .pipe(catchError(this.handleService.handleError));
  }
}
