import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { CongTacVien } from 'src/app/core/models/users/cong-tac-vien.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class CongTacVienService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.MANAGEMENT_COLLABORATOR;
  }

  getAllCollaborator(): Observable<CongTacVien[]> {
    return this.http.get<CongTacVien[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPagingCollaborator(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<CongTacVien>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');

    return this.http.get<PagedResults<CongTacVien>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  getCurrentCTV(): Observable<CongTacVien> {
    return this.http.get<CongTacVien>(this.apiUrl + '/current')
      .pipe(catchError(this.handleService.handleError));
  }

  createCollaborator(model: CongTacVien): Observable<CongTacVien> {
    return this.http.post<CongTacVien>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  updateCollaborator(model: CongTacVien, id: string): Observable<CongTacVien> {
    return this.http.put<CongTacVien>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  deleteCollaborator(id: string): Observable<CongTacVien> {
    return this.http.delete<CongTacVien>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

}
