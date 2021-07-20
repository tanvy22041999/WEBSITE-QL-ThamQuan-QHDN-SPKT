import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SystemConstant } from '../../constants/system.constant';
import { UrlConstant } from '../../constants/url.constant';
import { ChuyenThamQuan } from '../../models/main/chuyen-tham-quan.model';
import { HandlerErrorService } from '../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class TimelineGraphicService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.CHUYEN_THAM_QUAN;
  }

  getChuyenThamQuanByThoiGianTrangThai(tuNgay: Date, denNgay: Date, trangThaiChuyen?: string): Observable<ChuyenThamQuan[]> {
    const params = new HttpParams()
      .set('tuNgay', tuNgay.toISOString())
      .set('denNgay', denNgay.toISOString())
      .set('trangThai', trangThaiChuyen ?? SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN.SAN_SANG);
    return this.http.get<ChuyenThamQuan[]>(this.apiUrl + '/chuyen-tham-quan-len-timeline', { params })
      .pipe(catchError(this.handleService.handleError));
  }
}
