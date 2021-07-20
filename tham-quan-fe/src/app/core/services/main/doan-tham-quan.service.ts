import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DangKyDanDoan } from '../../models/main/guide.model';
import { HandlerErrorService } from '../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})

export class DoanThamQuanService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    //this.apiUrl = UrlConstant.API.SIGN_UP_FOR_A_TOUR;
  }

  create(model: DangKyDanDoan): Observable<DangKyDanDoan> {
    return this.http.post<DangKyDanDoan>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  update(model: DangKyDanDoan, id: string): Observable<DangKyDanDoan> {
    return this.http.put<DangKyDanDoan>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  delete(id: string): Observable<DangKyDanDoan> {
    return this.http.delete<DangKyDanDoan>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

}
