/* eslint-disable @typescript-eslint/func-call-spacing */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from '../../constants/url.constant';
import { KetQuaKhaoSatCongTacVienLoaiCauHoiLuaChon, KetQuaKhaoSatCongTacVienloaiCauHoiNhapLieu,
  KetQuaKhaoSatCongTacVienLoaiCauHoiSapXep, KetQuaKhaoSatDoanhNghiepLoaiCauHoiLuaChon,
  KetQuaKhaoSatDoanhNghiepLoaiCauHoiNhapLieu, KetQuaKhaoSatDoanhNghiepLoaiCauHoiSapXep,
  KetQuaKhaoSatSinhVienLoaiCauHoiLuaChon, KetQuaKhaoSatSinhVienLoaiCauHoiNhapLieu,
  KetQuaKhaoSatSinhVienLoaiCauHoiSapXep } from '../../models/statistic/statistic.model';
import { HandlerErrorService } from '../common/handler-error.service';



@Injectable({
  providedIn: 'root'
})
export class ThongKeService {
  private apiUrl: string;
  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService
  ) {
    this.apiUrl = UrlConstant.API.STATISTICS;
  }

  thongKeTravelTheoMocThoiGian(tuNgay: Date, denNgay: Date): Observable<number> {
    const params = new HttpParams()
      .set('tuNgay', tuNgay.toString())
      .set('denNgay', denNgay.toString());
    return this.http.get<number>(this.apiUrl + '/tong-chuyen-tham-quan', { params } )
      .pipe(catchError(this.handleService.handleError));
  }
  thongKeTravelTheoDN(tuNgay: Date, denNgay: Date): Observable<number> {
    const params = new HttpParams()
      .set('tuNgay', tuNgay.toString())
      .set('denNgay', denNgay.toString());
    return this.http.get<number>(this.apiUrl + '/so-luong-chuyen-tham-quan-theo-doanh-nghiep', { params } )
      .pipe(catchError(this.handleService.handleError));
  }
  thongKeDNAnswerTheoCauHoiNhapLieu(chuyenThamQuanid: string): Observable<KetQuaKhaoSatDoanhNghiepLoaiCauHoiNhapLieu[]>{
    return this.http.get<KetQuaKhaoSatDoanhNghiepLoaiCauHoiNhapLieu[]>
    (this.apiUrl + '/danh-sach-cau-tra-loi-doanh-nghiep-theo-loai-cau-hoi-nhap-lieu/' + chuyenThamQuanid)
      .pipe(catchError(this.handleService.handleError));
  }
  thongKeDNAnswerTheoCauHoiSapXep(chuyenThamQuanid: string): Observable<KetQuaKhaoSatDoanhNghiepLoaiCauHoiSapXep[]>{
    return this.http.get<KetQuaKhaoSatDoanhNghiepLoaiCauHoiSapXep[]>
    (this.apiUrl + '/danh-sach-cau-tra-loi-doanh-nghiep-theo-loai-cau-hoi-sap-xep/' + chuyenThamQuanid)
      .pipe(catchError(this.handleService.handleError));
  }
  thongKeDNAnswerTheoCauHoiChonLua(chuyenThamQuanid: string): Observable<KetQuaKhaoSatDoanhNghiepLoaiCauHoiLuaChon[]>{
    return this.http.get<KetQuaKhaoSatDoanhNghiepLoaiCauHoiLuaChon[]>
    (this.apiUrl + '/danh-sach-cau-tra-loi-doanh-nghiep-theo-loai-cau-hoi-lua-chon/' + chuyenThamQuanid)
      .pipe(catchError(this.handleService.handleError));
  }
  thongKeSVAnswerTheoCauHoiNhapLieu(chuyenThamQuanid: string): Observable<KetQuaKhaoSatSinhVienLoaiCauHoiNhapLieu[]>{
    return this.http.get<KetQuaKhaoSatSinhVienLoaiCauHoiNhapLieu[]>
    (this.apiUrl + '/danh-sach-cau-tra-loi-sinh-vien-theo-loai-cau-hoi-nhap-lieu/' + chuyenThamQuanid)
      .pipe(catchError(this.handleService.handleError));
  }
  thongKeSVAnswerTheoCauHoiSapXep(chuyenThamQuanid: string): Observable<KetQuaKhaoSatSinhVienLoaiCauHoiSapXep[]>{
    return this.http.get<KetQuaKhaoSatSinhVienLoaiCauHoiSapXep[]>
    (this.apiUrl + '/danh-sach-cau-tra-loi-sinh-vien-theo-loai-cau-hoi-sap-xep/' + chuyenThamQuanid)
      .pipe(catchError(this.handleService.handleError));
  }
  thongKeSVAnswerTheoCauHoiChonLua(chuyenThamQuanid: string): Observable<KetQuaKhaoSatSinhVienLoaiCauHoiLuaChon[]>{
    return this.http.get<KetQuaKhaoSatSinhVienLoaiCauHoiLuaChon[]>
    (this.apiUrl + '/danh-sach-cau-tra-loi-sinh-vien-theo-loai-cau-hoi-lua-chon/' + chuyenThamQuanid)
      .pipe(catchError(this.handleService.handleError));
  }
  thongKeCTVAnswerTheoCauHoiNhapLieu(chuyenThamQuanid: string): Observable<KetQuaKhaoSatCongTacVienloaiCauHoiNhapLieu[]>{
    return this.http.get<KetQuaKhaoSatCongTacVienloaiCauHoiNhapLieu[]>
    (this.apiUrl + '/danh-sach-cau-tra-loi-cong-tac-vien-theo-loai-cau-hoi-nhap-lieu/' + chuyenThamQuanid)
      .pipe(catchError(this.handleService.handleError));
  }
  thongKeCTVAnswerTheoCauHoiSapXep(chuyenThamQuanid: string): Observable<KetQuaKhaoSatCongTacVienLoaiCauHoiSapXep[]>{
    return this.http.get<KetQuaKhaoSatCongTacVienLoaiCauHoiSapXep[]>
    (this.apiUrl + '/danh-sach-cau-tra-loi-cong-tac-vien-theo-loai-cau-hoi-sap-xep' + chuyenThamQuanid)
      .pipe(catchError(this.handleService.handleError));
  }
  thongKeCTVAnswerTheoCauHoiChonLua(chuyenThamQuanid: string): Observable<KetQuaKhaoSatCongTacVienLoaiCauHoiLuaChon[]>{
    return this.http.get<KetQuaKhaoSatCongTacVienLoaiCauHoiLuaChon[]>
    (this.apiUrl + '/danh-sach-cau-tra-loi-cong-tac-vien-theo-loai-cau-hoi-lua-chon/' + chuyenThamQuanid)
      .pipe(catchError(this.handleService.handleError));
  }
}
