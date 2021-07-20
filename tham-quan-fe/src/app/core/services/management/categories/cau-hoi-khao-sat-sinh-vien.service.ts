import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { CauHoiKhaoSatSinhVien } from 'src/app/core/models/categories/cau-hoi-khao-sat-sinh-vien';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class CauHoiKhaoSatSinhVienService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService
  ) {
    this.apiUrl = UrlConstant.API.SURVEY_STUDENT;
  }

  getAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<CauHoiKhaoSatSinhVien>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');

    return this.http.get<PagedResults<CauHoiKhaoSatSinhVien>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }


  getById(id: string): Observable<CauHoiKhaoSatSinhVien> {
    return this.http.get<CauHoiKhaoSatSinhVien>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

  create(model: CauHoiKhaoSatSinhVien): Observable<CauHoiKhaoSatSinhVien> {
    return this.http.post<CauHoiKhaoSatSinhVien>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  update(model: CauHoiKhaoSatSinhVien, id: string,): Observable<CauHoiKhaoSatSinhVien> {
    return this.http.put<CauHoiKhaoSatSinhVien>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  delete(id: string): Observable<CauHoiKhaoSatSinhVien> {
    return this.http.delete<CauHoiKhaoSatSinhVien>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

  getListCauHoiByIdTour(idTour: string): Observable<CauHoiKhaoSatSinhVien[]> {
    return this.http.get<CauHoiKhaoSatSinhVien[]>(this.apiUrl + `/khao-sat` + `/${idTour}`)
      .pipe(catchError(this.handleService.handleError));
  }
}
