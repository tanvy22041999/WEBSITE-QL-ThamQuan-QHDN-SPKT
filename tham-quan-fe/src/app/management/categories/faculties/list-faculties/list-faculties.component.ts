import { Component, OnInit, TemplateRef } from '@angular/core';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Khoa } from 'src/app/core/models/categories/khoa.model';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { KhoaService } from 'src/app/core/services/management/categories/khoa.service';

@Component({
  selector: 'app-list-faculties',
  templateUrl: './list-faculties.component.html',
  styleUrls: ['./list-faculties.component.scss'],
})
export class ListFacultiesComponent implements OnInit {
  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  breadcrumbObj: BreadCrumb = new BreadCrumb({
    heading: this.langData[this.langCode].KHOA,
    listBreadcrumb: [
      {
        title: this.langData[this.langCode].DANH_MUC,
        link: UrlConstant.ROUTE.MANAGEMENT.CATEGORIES,
      },
    ],
  });

  modalData: ModalData<Khoa> = new ModalData<Khoa>();
  listKhoa: Paginate<Khoa> = new Paginate<Khoa>();
  searchValue = '';

  constructor(
    private spinner: NgxSpinnerService,
    private alert: ToastrService,
    private nzModalSvc: NzModalService,
    private khoaSvc: KhoaService
  ) { }

  ngOnInit(): void {
    this.getDataPaging();
  }

  getDataPaging(): void {
    this.spinner.show();
    this.khoaSvc.getAllPaging(
      this.listKhoa.currentPage - 1,
      this.listKhoa.limit,
      this.searchValue)
      .subscribe((res) => {
        this.listKhoa.currentPage = res.pageable.pageNumber + 1;
        this.listKhoa.limit = res.pageable.pageSize;
        this.listKhoa.totalPage = res.totalPages;
        this.listKhoa.totalItem = res.totalElements;
        this.listKhoa.data = res.content;
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  openModal(template: TemplateRef<unknown>, data?: Khoa): void {
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
        this.langData[this.langCode].THEM_MOI_TITLE) + this.langData[this.langCode].KHOA,
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

  pageChange(page: Paginate<Khoa>): void {
    this.listKhoa = page;
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
        this.khoaSvc.delete(id)
          .subscribe(() => {
            this.spinner.hide();
            this.alert.success(this.langData[this.langCode].THAY_DOI_THANH_CONG);
            this.getDataPaging();
          }, () => this.spinner.hide());
      }
    });
  }
}
