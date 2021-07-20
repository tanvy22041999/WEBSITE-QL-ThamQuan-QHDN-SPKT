import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ChuyenThamQuan, FilterChuyenThamQuan } from 'src/app/core/models/main/chuyen-tham-quan.model';
import { ChuyenThamQuanService } from 'src/app/core/services/management/tours/chuyen-tham-quan.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-archived-tours',
  templateUrl: './list-archived-tours.component.html',
  styleUrls: ['./list-archived-tours.component.scss']
})
export class ListArchivedToursComponent implements OnInit {

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  breadcrumbObj: BreadCrumb = new BreadCrumb({
    heading: this.langData[this.langCode].BACKUP_TOURS,
    listBreadcrumb: [{
      title: this.langData[this.langCode].TOURS,
      link: UrlConstant.ROUTE.MANAGEMENT.BACKUP_TOURS
    }]
  });

  isUpdate = false;


  filterData: FilterChuyenThamQuan = new FilterChuyenThamQuan();
  filterHoanTat = [SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN.HOAN_TAT];


  modalData: ModalData<ChuyenThamQuan> = new ModalData<ChuyenThamQuan>();
  modalRef: NzModalRef;
  listChuyenThamQuan: Paginate<ChuyenThamQuan> = new Paginate<ChuyenThamQuan>();
  searchValue = '';
  filterChuyenThamQuan: FilterChuyenThamQuan = new FilterChuyenThamQuan();

  constructor(
    private spinner: NgxSpinnerService,
    private nzModalSvc: NzModalService,
    private chuyenThamQuanSvc: ChuyenThamQuanService
  ) { }

  ngOnInit(): void {
    this.getDataPaging(this.filterData, this.filterHoanTat);
  }

  getDataPaging(filterData: FilterChuyenThamQuan, filterString?: string[], filterDot?: string): void {
    this.spinner.show();
    filterData.trangThai = filterString;
    filterData.dotThamQuan = filterDot
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


  openModal(template: TemplateRef<unknown>, data?: ChuyenThamQuan): void {
    if (data) {
      this.modalData.action = SystemConstant.ACTION.EDIT;
      this.modalData.data = data;
    } else {
      this.modalData.action = SystemConstant.ACTION.ADD;
    }
    this.nzModalSvc.create({
      nzStyle: { top: '20px' },
      nzWidth: 800,
      nzTitle: (data ? this.langData[this.langCode].CHINH_SUA_TITLE :
        this.langData[this.langCode].THEM_MOI_TITLE) + this.langData[this.langCode].BACKUP_TOURS,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false
    });
  }

  closeModal(reload?: boolean): void {
    if (reload) {
      this.getDataPaging(this.filterData, this.filterHoanTat);
    }
    this.nzModalSvc.closeAll();
  }

  pageChange(page: Paginate<ChuyenThamQuan>, filterString?: string[]): void {
    this.listChuyenThamQuan = page;
    this.getDataPaging(this.filterData, filterString);
  }

  openModalStudent(template: TemplateRef<unknown>, data?: ChuyenThamQuan, isUpdate?: boolean): void {
    this.modalData.data = data;
    this.isUpdate = isUpdate;
    this.modalRef = this.nzModalSvc.create({
      nzStyle: { top: '20px' },
      nzWidth: 1000,
      nzTitle: this.langData[this.langCode].CHINH_SUA_TITLE + this.langData[this.langCode].DANH_SACH_SINH_VIEN,
      nzContent: template,
      nzFooter: null,
      nzClosable: true,
      nzMaskClosable: false
    });
  }

  openModalCTV(template: TemplateRef<unknown>, data?: ChuyenThamQuan, isUpdate?: boolean): void {
    this.modalData.data = data;
    this.isUpdate = isUpdate;
    this.modalRef = this.nzModalSvc.create({
      nzStyle: { top: '20px' },
      nzWidth: 1000,
      nzTitle: this.langData[this.langCode].CHINH_SUA_TITLE + this.langData[this.langCode].DANH_SACH_CONG_TAC_VIEN,
      nzContent: template,
      nzFooter: null,
      nzClosable: true,
      nzMaskClosable: false
    });
  }

  closeModalStudent(): void {
    this.modalRef.destroy();
  }

  // changeStatus(id: string): void {
  //   this.nzModalSvc.confirm({
  //     nzWidth: 300,
  //     nzTitle: this.langData[this.langCode].XAC_NHAN_THAY_DOI_TRANG_THAI,
  //     nzCancelText: this.langData[this.langCode].HUY,
  //     nzOkDanger: true,
  //     nzOkText: this.langData[this.langCode].XAC_NHAN,
  //     nzOnOk: () => {
  //       this.spinner.show();
  //       this.chuyenThamQuanSvc.deleteSaoLuu(id)
  //         .subscribe(() => {
  //           this.spinner.hide();
  //           this.alert.success(this.langData[this.langCode].THAY_DOI_THANH_CONG);
  //           this.getDataPaging();
  //         }, () => this.spinner.hide());
  //     }
  //   });
  // }

}
