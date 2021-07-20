import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ChuyenThamQuan, FilterChuyenThamQuan } from 'src/app/core/models/main/chuyen-tham-quan.model';
import { GiangVien } from 'src/app/core/models/users/giang-vien.model';
import { ChuyenThamQuanService } from 'src/app/core/services/management/tours/chuyen-tham-quan.service';
import { ManagementLecturesService } from 'src/app/core/services/management/users/management-lectures.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-tour',
  templateUrl: './list-tour.component.html',
  styleUrls: ['./list-tour.component.scss']
})
export class ListTourComponent implements OnInit {
  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  modalData: ModalData<ChuyenThamQuan> = new ModalData<ChuyenThamQuan>();
  listChuyenThamQuan: Paginate<ChuyenThamQuan> = new Paginate<ChuyenThamQuan>();
  thamQuan: ChuyenThamQuan[] = [];
  filterData: FilterChuyenThamQuan = new FilterChuyenThamQuan();
  filterDangXuLy = [SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN.GIANG_VIEN_CHUA_CO_CONG_TY,
  SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN.GIANG_VIEN_DA_CHON_CONG_TY,
  SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN.DA_LIEN_HE_CONG_TY,
  SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN.DANG_XU_LY,
  SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN.SAN_SANG];

  searchValue = '';

  currentUserId = '';
  currentUser: GiangVien = new GiangVien();
  isDuyet = false;
  trangThai = false;

  constructor(
    private spinner: NgxSpinnerService,
    private nzModalSvc: NzModalService,
    private giangVienSvc: ManagementLecturesService,
    private chuyenThamQuanSvc: ChuyenThamQuanService,
  ) { }

  ngOnInit(): void {
    // this.getDataDotThamQuanActiveGiangVien();
    this.getCurrentUser();
    this.getAllChuyenCuaGiangVien(this.filterData);
  }

  // getDataDotThamQuanActiveGiangVien(): void {
  //   this.spinner.show();
  //   this.chuyenThamQuanSvc.getAllChuyenThamQuanActiveGiangVien()
  //     .subscribe(res => {
  //       this.thamQuan = res;
  //       this.spinner.hide();
  //     }, () => this.spinner.hide());
  // }

  getCurrentUser(): void {
    this.giangVienSvc.getCurrentLecture()
      .subscribe((res) => {
        this.currentUser = res;
      })
  }

  getAllChuyenCuaGiangVien(filterData: FilterChuyenThamQuan): void {
    this.spinner.show();
    filterData.giangVien = this.currentUser.id;
    filterData.trangThai = this.filterDangXuLy;
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

  openModal(template: TemplateRef<unknown>, data?: ChuyenThamQuan, isDuyet?: boolean): void {
    if (data) {
      this.modalData.action = SystemConstant.ACTION.EDIT;
      this.modalData.data = data;
      this.trangThai = isDuyet;
    } else {
      this.modalData.action = SystemConstant.ACTION.ADD;
    }
    this.nzModalSvc.create({
      nzStyle: { top: '20px' },
      nzWidth: 800,
      nzTitle: (data ? this.langData[this.langCode].CHINH_SUA_TITLE :
        this.langData[this.langCode].THEM_MOI_TITLE) + this.langData[this.langCode].CHUYEN_THAM_QUAN,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false
    });
  }

  closeModal(reload?: boolean): void {
    if (reload) {
      this.getAllChuyenCuaGiangVien(this.filterData);
    }
    this.nzModalSvc.closeAll();
  }

  checkTrangThai(chuyenThamQuan: ChuyenThamQuan) {
    return this.isDuyet = (chuyenThamQuan.trangThai === SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN.SAN_SANG)
      || (chuyenThamQuan.trangThai === SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN.DANG_XU_LY);
  }

}

