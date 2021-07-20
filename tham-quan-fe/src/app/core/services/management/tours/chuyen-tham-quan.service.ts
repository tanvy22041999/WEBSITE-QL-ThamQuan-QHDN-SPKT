import { CheckinCheckoutDto } from './../../../models/main/cong-tac-vien-dan-doan.model';
import { SinhVienThamQuan } from './../../../models/main/sinh-vien-tham-quan.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { ChuyenThamQuan, FilterChuyenThamQuan, LuuTruHoSo, RequestChuyenThamQuan } from 'src/app/core/models/main/chuyen-tham-quan.model';
import { CongTacVienDanDoan } from 'src/app/core/models/main/cong-tac-vien-dan-doan.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class ChuyenThamQuanService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService
  ) {
    this.apiUrl = UrlConstant.API.TOURS;
  }

  getAll(): Observable<ChuyenThamQuan[]> {
    return this.http
      .get<ChuyenThamQuan[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string
  ): Observable<PagedResults<ChuyenThamQuan>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ? search : '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http
      .get<PagedResults<ChuyenThamQuan>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  getById(id: string): Observable<ChuyenThamQuan> {
    return this.http
      .get<ChuyenThamQuan>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

  filterChuyenThamQuan(
    model: FilterChuyenThamQuan,
    page: number,
    size: number,
    sort?: string,
    column?: string): Observable<PagedResults<ChuyenThamQuan>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http.post<PagedResults<ChuyenThamQuan>>(this.apiUrl + '/filter', model, { params })
      .pipe(catchError(this.handleService.handleError));
  }

  getListCTVDangKy(id: string): Observable<CongTacVienDanDoan[]> {
    return this.http
      .get<CongTacVienDanDoan[]>(this.apiUrl + `/${id}` + '/ctv-dang-ky-dan-doan')
      .pipe(catchError(this.handleService.handleError));
  }


  duyetCTV(id: string, ctvId: string, trangThai: boolean): Observable<ChuyenThamQuan> {
    const params = new HttpParams()
      .set('congTacVienId', ctvId)
      .set('duyet', trangThai.toString());
    return this.http
      .post<ChuyenThamQuan>(this.apiUrl + `/${id}` + '/admin-duyet-ctv-dang-ky-dan-doan', {}, { params })
      .pipe(catchError(this.handleService.handleError));
  }

  create(model: ChuyenThamQuan): Observable<ChuyenThamQuan> {
    return this.http
      .post<ChuyenThamQuan>(this.apiUrl + '/create-chuyen-tham-quan', model)
      .pipe(catchError(this.handleService.handleError));
  }

  update(model: ChuyenThamQuan, id: string): Observable<ChuyenThamQuan> {
    return this.http
      .put<ChuyenThamQuan>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  delete(id: string): Observable<ChuyenThamQuan> {
    return this.http
      .delete<ChuyenThamQuan>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

  importDanhSachSinhVien(file: File, id: string) {
    const fd = new FormData();
    fd.append('file', file, file.name);

    return this.http
      .post(this.apiUrl + `/${id}`, fd, { observe: 'response', responseType: 'text' })
      .pipe(catchError(this.handleService.handleError));
  }

  importDanhSachDiemDanh(file: File, id: string) {
    const fd = new FormData();
    fd.append('file', file, file.name);

    return this.http
      .put(this.apiUrl + `/${id}/diem-danh-bu-bang-file-excel`, fd, { observe: 'response', responseType: 'text' })
      .pipe(catchError(this.handleService.handleError));
  }

  updateTrangThaiChuyenThamQuan(id: string, trangThai: string): Observable<ChuyenThamQuan> {
    const params = new HttpParams()
      .set('trangThai', trangThai);
    return this.http.put<ChuyenThamQuan>(this.apiUrl + `/${id}` + '/admin-cap-nhat-trang-thai', {}, { params })
      .pipe(catchError(this.handleService.handleError));
  }


  getListSinhVienPaging(
    id: string,
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string
  ): Observable<PagedResults<SinhVienThamQuan>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ? search : '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http
      .get<PagedResults<SinhVienThamQuan>>(this.apiUrl + `/${id}` + '/paging-danh-sach-sinh-vien-tham-quan', { params })
      .pipe(catchError(this.handleService.handleError));
  }



  updateDanhSachSinhVien(id: string, listSinhVien: string[]): Observable<ChuyenThamQuan> {
    return this.http
      .post<ChuyenThamQuan>(this.apiUrl + `/${id}` + '/chinh-sua-danh-sach-sinh-vien', listSinhVien)
      .pipe(catchError(this.handleService.handleError));
  }

  updateDanhSachCTV(id: string, listCTV: string[]): Observable<ChuyenThamQuan> {
    return this.http
      .post<ChuyenThamQuan>(this.apiUrl + `/${id}` + '/chinh-sua-danh-sach-cong-tac-vien', listCTV)
      .pipe(catchError(this.handleService.handleError));
  }

  deleteSinhVien(id: string, idSv: string): Observable<ChuyenThamQuan> {
    const params = new HttpParams()
      .set('idSV', idSv);
    return this.http
      .delete<ChuyenThamQuan>(this.apiUrl + `/${id}` + '/xoa-sinh-vien', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  getPagingChuyenThamQuan(
    model: FilterChuyenThamQuan,
    page: number,
    size: number,
    sort?: string,
    column?: string): Observable<PagedResults<ChuyenThamQuan>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http
      .post<PagedResults<ChuyenThamQuan>>(this.apiUrl + '/paging-chuyen-tham-quan', model, { params })
      .pipe(catchError(this.handleService.handleError));
  }

  congTacVienDangKy(id: string, huy?: boolean): Observable<ChuyenThamQuan> {
    const params = new HttpParams()
      .set('huy', huy.toString());
    return this.http.post<ChuyenThamQuan>(this.apiUrl + `/${id}` + '/ctv-dang-ky-dan-doan', {}, { params })
      .pipe(catchError(this.handleService.handleError));
  }
  congTacVienCheckinCheckout(id: string, typeCheck: string, fileCheck: CheckinCheckoutDto): Observable<ChuyenThamQuan> {
    return this.http
      .post<ChuyenThamQuan>(this.apiUrl + `/${id}` + '/ctv-check-in-check-out-upload-hinh' + `/${typeCheck}`, fileCheck)
      .pipe(catchError(this.handleService.handleError));
  }

  getChuyenThamQuanById(id: string): Observable<ChuyenThamQuan> {
    return this.http.post<ChuyenThamQuan>(this.apiUrl, `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

  diemDanhSinhVien(id: string, mssv: string): Observable<ChuyenThamQuan> {
    const params = new HttpParams()
      .set('maSV', mssv);

    return this.http.put<ChuyenThamQuan>(this.apiUrl + '/diem-danh' + `/${id}`, {}, { params })
      .pipe(catchError(this.handleService.handleError));
  }

  diemDanhSinhVienBu(id: string, mssv: string, soPhutDiTre: number) {
    const params = new HttpParams()
      .set('maSV', mssv)
      .set('soPhutDiTre', soPhutDiTre.toString());

    return this.http.put(this.apiUrl + `/${id}/diem-danh-bu`, {}, { params, observe: 'response', responseType: 'text' })
      .pipe(catchError(this.handleService.handleError));
  }

  importFileSinhVien(file: File, id: string) {
    const fd = new FormData();
    fd.append('file', file, file.name);
    const params = new HttpParams()
      .set('name', file.name);

    return this.http
      .post(this.apiUrl + `/${id}`, fd, { params, observe: 'response', responseType: 'text' })
      .pipe(catchError(this.handleService.handleError));
  }

  getAllChuyenThamQuanActiveCongTacVien(trangThaiChuyen: string, trangThai?: boolean): Observable<ChuyenThamQuan[]> {
    if (trangThai) {
      const params = new HttpParams()
        .set('trangThai', trangThai.toString())
        .set('trangThaiChuyen', trangThaiChuyen);
      return this.http
        .get<ChuyenThamQuan[]>(this.apiUrl + '/dot-active-cua-cong-tac-vien', { params })
        .pipe(catchError(this.handleService.handleError));
    } else {
      const params = new HttpParams()
        .set('trangThaiChuyen', trangThaiChuyen);
      return this.http
        .get<ChuyenThamQuan[]>(this.apiUrl + '/dot-active-cua-cong-tac-vien', { params })
        .pipe(catchError(this.handleService.handleError));
    }

  }
  //Lấy danh sách chuyến tham quan có trạng thái DA_DUYET, DANG_XU_LY để cộng tác viên đăng kí
  getAllChuyenThamQUanDaDuyet(): Observable<ChuyenThamQuan[]> {
    return this.http
      .get<ChuyenThamQuan[]>(this.apiUrl + '/chuyen-tham-quan-active-cho-ctv')
      .pipe(catchError(this.handleService.handleError));
  }

  getAllChuyenThamQuanActiveGiangVien(): Observable<ChuyenThamQuan[]> {
    return this.http
      .get<ChuyenThamQuan[]>(this.apiUrl + '/dot-tham-quan-active')
      .pipe(catchError(this.handleService.handleError));
  }

  createDotChoListTour(requestTour: RequestChuyenThamQuan): Observable<ChuyenThamQuan[]> {
    return this.http
      .post<ChuyenThamQuan[]>(this.apiUrl + '/create-dot-tham-quan-cho-chuyen-di', requestTour)
      .pipe(catchError(this.handleService.handleError));
  }

  sendMailUpdateTrangThai(id: string, lyDo?: string) {
    if (lyDo) {
      const params = new HttpParams()
        .set('lyDo', lyDo);
      return this.http.post(this.apiUrl + `/${id}` + '/gui-mail-thong-bao-cap-nhat-trang-thai', {}, { params, observe: 'response', responseType: 'text' })
        .pipe(catchError(this.handleService.handleError));
    }
    return this.http.post(this.apiUrl + `/${id}` + '/gui-mail-thong-bao-cap-nhat-trang-thai', {}, { observe: 'response', responseType: 'text' })
      .pipe(catchError(this.handleService.handleError));
  }

  importQuyetDinhCuaBanGiamHieu(idChuyenThamQuan: string, file: File): Observable<ChuyenThamQuan> {
    const fd = new FormData();
    fd.append('file', file, file.name);
    return this.http.post<ChuyenThamQuan>(this.apiUrl + `/${idChuyenThamQuan}/import-file-xac-nhan-ban-giam-hieu-duyet`, fd)
      .pipe(catchError(this.handleService.handleError));
  }

  saoLuuChuyen(model: LuuTruHoSo, id: string): Observable<ChuyenThamQuan> {
    return this.http.post<ChuyenThamQuan>(this.apiUrl + `/${id}/luu-tru-chuyen-tham-quan`, model)
      .pipe(catchError(this.handleService.handleError));
  }
}

