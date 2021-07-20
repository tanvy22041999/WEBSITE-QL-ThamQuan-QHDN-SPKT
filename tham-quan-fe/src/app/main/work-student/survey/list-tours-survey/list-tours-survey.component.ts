import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ChuyenThamQuan, FilterChuyenThamQuan } from 'src/app/core/models/main/chuyen-tham-quan.model';
import { SinhVien } from 'src/app/core/models/users/sinh-vien.model';
import { KetQuaKhaoSatSinhVienService } from 'src/app/core/services/main/ket-qua-khao-sat-sinh-vien';
import { ChuyenThamQuanService } from 'src/app/core/services/management/tours/chuyen-tham-quan.service';
import { SinhVienService } from 'src/app/core/services/management/users/sinh-vien.service';
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
  currentUser: SinhVien = new SinhVien();
  isDuyet = false;
  trangThai = false;

  constructor(
    private spinner: NgxSpinnerService,
    private sinhVienSvc: SinhVienService,
    private ketQuaKhaoSatSvc: KetQuaKhaoSatSinhVienService,
    private router: Router,
    private chuyenThamQuanSvc: ChuyenThamQuanService,
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getAllChuyenCuaSinhVien(this.filterData);
  }

  getCurrentUser(): void {
    this.sinhVienSvc.getCurrentStudent()
      .subscribe((res) => {
        this.currentUser = res;
      })
  }

  getAllChuyenCuaSinhVien(filterData: FilterChuyenThamQuan): void {
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
        this.spinner.hide();
      }, () => this.spinner.hide());
  }
  doSurvey(id: string) {
    this.spinner.show();
    this.ketQuaKhaoSatSvc.checkDoSurvey(id)
      .subscribe((res) => {
        if (!res) {
          this.router.navigate(['/work-student', 'survey', id]);
          this.spinner.hide();
        }
        this.spinner.hide();
      }, () => this.spinner.hide());
  }


}
