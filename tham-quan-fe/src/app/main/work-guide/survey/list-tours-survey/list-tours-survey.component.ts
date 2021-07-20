import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ChuyenThamQuan, FilterChuyenThamQuan } from 'src/app/core/models/main/chuyen-tham-quan.model';
import { CongTacVien } from 'src/app/core/models/users/cong-tac-vien.model';
import { KetQuaKhaoSatCTVService } from 'src/app/core/services/main/ket-qua-khao-sat-ctv';
import { ChuyenThamQuanService } from 'src/app/core/services/management/tours/chuyen-tham-quan.service';
import { CongTacVienService } from 'src/app/core/services/management/users/cong-tac-vien.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-tours-survey',
  templateUrl: './list-tours-survey.component.html',
  styleUrls: ['./list-tours-survey.component.scss']
})
export class ListToursSurveyComponent implements OnInit {

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  modalData: ModalData<ChuyenThamQuan> = new ModalData<ChuyenThamQuan>();
  listChuyenThamQuan: Paginate<ChuyenThamQuan> = new Paginate<ChuyenThamQuan>();
  thamQuan: ChuyenThamQuan[] = [];
  filterData: FilterChuyenThamQuan = new FilterChuyenThamQuan();
  filterSanSang = [SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN.SAN_SANG];

  searchValue = '';

  currentUserId = '';
  currentUser: CongTacVien = new CongTacVien();
  isDuyet = false;
  trangThai = false;
  isDoSurvey = false;

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private congTacVienSvc: CongTacVienService,
    private ketQuaKhaoSatSvc: KetQuaKhaoSatCTVService,
    private chuyenThamQuanSvc: ChuyenThamQuanService,
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getAllChuyenCuaDoanhNghiep(this.filterData);
  }

  getCurrentUser(): void {
    this.congTacVienSvc.getCurrentCTV()
      .subscribe((res) => {
        this.currentUser = res;
      })
  }

  getAllChuyenCuaDoanhNghiep(filterData: FilterChuyenThamQuan): void {
    this.spinner.show();
    filterData.giangVien = this.currentUser.id;
    filterData.trangThai = this.filterSanSang;
    this.chuyenThamQuanSvc.filterChuyenThamQuan(
      filterData,
      this.listChuyenThamQuan.currentPage - 1,
      this.listChuyenThamQuan.limit)
      .subscribe(res => {
        this.listChuyenThamQuan.currentPage = res.pageable.pageNumber + 1;
        this.listChuyenThamQuan.limit = res.pageable.pageSize;
        this.listChuyenThamQuan.totalPage = res.totalPages;
        this.listChuyenThamQuan.totalItem = res.totalElements;
        this.listChuyenThamQuan.data = res.content;
        console.log(this.listChuyenThamQuan.data);
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  doSurvey(id: string) {
    this.spinner.show();
    this.ketQuaKhaoSatSvc.checkDoSurvey(id)
      .subscribe((res) => {
        if (!res) {
          this.router.navigate(['/work-guide', 'survey', id]);
          this.spinner.hide();
        }
        this.spinner.hide();
      }, () => this.spinner.hide());
  }
}
