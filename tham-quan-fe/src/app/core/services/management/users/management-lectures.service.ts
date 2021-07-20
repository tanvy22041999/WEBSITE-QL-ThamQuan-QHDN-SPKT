import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { FilterGiangVien, GiangVien } from 'src/app/core/models/users/giang-vien.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class ManagementLecturesService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.MANAGEMENT_LECTURERS;
  }

  getAll(): Observable<GiangVien[]> {
    return this.http.get<GiangVien[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }

  getLecturers(
    model: FilterGiangVien,
    page: number,
    size: number,
    sort?: string,
    column?: string
  ): Observable<PagedResults<GiangVien>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort ? sort : '')
      .set('column', column ?? '');

    return this.http
      .post<PagedResults<GiangVien>>(this.apiUrl + `/filter`, model, { params })
      .pipe(catchError(this.handleService.handleError));
  }

  getCurrentLecture(): Observable<GiangVien> {
    return this.http.get<GiangVien>(this.apiUrl + '/current')
      .pipe(catchError(this.handleService.handleError));
  }

  createLectures(model: GiangVien): Observable<GiangVien> {
    return this.http.post<GiangVien>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  updateLectures(model: GiangVien, id: string): Observable<GiangVien> {
    return this.http.put<GiangVien>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  deleteLectures(id: string): Observable<GiangVien> {
    return this.http.delete<GiangVien>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

}

