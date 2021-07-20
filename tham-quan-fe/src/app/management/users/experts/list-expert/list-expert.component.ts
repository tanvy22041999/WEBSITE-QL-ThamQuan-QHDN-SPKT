import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ChuyenVien } from 'src/app/core/models/users/chuyen-vien.model';
import { ChuyenVienService } from 'src/app/core/services/management/users/chuyen-vien.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-expert',
  templateUrl: './list-expert.component.html',
  styleUrls: ['./list-expert.component.scss']
})
export class ListExpertComponent implements OnInit {

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  breadcrumbObj: BreadCrumb = new BreadCrumb({
    heading: this.langData[this.langCode].MANAGEMENT_EXPERT,
    listBreadcrumb: [{
      title: this.langData[this.langCode].MANAGEMENT_USER,
      link: UrlConstant.ROUTE.MANAGEMENT.MANAGEMENT_USERS
    }]
  });

  modalData: ModalData<ChuyenVien> = new ModalData<ChuyenVien>();
  listChuyenVien: Paginate<ChuyenVien> = new Paginate<ChuyenVien>();
  searchValue = '';

  constructor(
    private spinner: NgxSpinnerService,
    private alert: ToastrService,
    private nzModalSvc: NzModalService,
    private expertSvc: ChuyenVienService,

  ) { }

  ngOnInit(): void {
    this.getDataPaging();
  }

  getDataPaging(): void {
    this.spinner.show();
    this.expertSvc.getAllPagingExpert(
      this.listChuyenVien.currentPage - 1,
      this.listChuyenVien.limit,
      this.searchValue)
      .subscribe(res => {
        this.listChuyenVien.currentPage = res.pageable.pageNumber + 1;
        this.listChuyenVien.limit = res.pageable.pageSize;
        this.listChuyenVien.totalPage = res.totalPages;
        this.listChuyenVien.totalItem = res.totalElements;
        this.listChuyenVien.data = res.content;
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  openModal(template: TemplateRef<unknown>, data?: ChuyenVien): void {
    if (data) {
      this.modalData.action = SystemConstant.ACTION.EDIT;
      this.modalData.data = data;
    } else {
      this.modalData.action = SystemConstant.ACTION.ADD;
    }
    this.nzModalSvc.create({
      nzStyle: { top: '20px' },
      nzWidth: 500,
      nzTitle: (data ? this.langData[this.langCode].CHINH_SUA_TITLE :
        this.langData[this.langCode].THEM_MOI_TITLE) + this.langData[this.langCode].EXPERT,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false
    });
  }

  closeModal(reload?: boolean): void {
    if (reload) {
      this.getDataPaging();
    }
    this.nzModalSvc.closeAll();
  }

  pageChange(page: Paginate<ChuyenVien>): void {
    this.listChuyenVien = page;
    this.getDataPaging();
  }

  changeStatus(id: string): void {
    this.nzModalSvc.confirm({
      nzWidth: 300,
      nzTitle: this.langData[this.langCode].XAC_NHAN_THAY_DOI_TRANG_THAI,
      nzCancelText: this.langData[this.langCode].HUY,
      nzOkDanger: true,
      nzOkText: this.langData[this.langCode].XAC_NHAN,
      nzOnOk: () => {
        this.spinner.show();
        this.expertSvc.deleteExpert(id)
          .subscribe(() => {
            this.spinner.hide();
            this.alert.success(this.langData[this.langCode].THAY_DOI_THANH_CONG);
            this.getDataPaging();
          }, () => this.spinner.hide());
      }
    });
  }

}
