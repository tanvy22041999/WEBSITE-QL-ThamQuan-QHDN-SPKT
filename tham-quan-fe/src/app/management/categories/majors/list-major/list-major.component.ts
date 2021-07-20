import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { Nganh } from 'src/app/core/models/categories/nganh.model';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { NganhService } from 'src/app/core/services/management/categories/nganh.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-major',
  templateUrl: './list-major.component.html',
  styleUrls: ['./list-major.component.scss']
})
export class ListMajorComponent implements OnInit {

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';

  //////////////////////////////

  breadcrumbObj: BreadCrumb = new BreadCrumb({
    heading: this.langData[this.langCode].NGANH,
    listBreadcrumb: [{
      title: this.langData[this.langCode].DANH_MUC,
      link: UrlConstant.ROUTE.MANAGEMENT.CATEGORIES
    }]
  });
  modalData: ModalData<Nganh> = new ModalData<Nganh>();
  listNganh: Paginate<Nganh> = new Paginate<Nganh>();
  searchValue = '';

  constructor(
    private spinner: NgxSpinnerService,
    private alert: ToastrService,
    private nzModalSvc: NzModalService,
    private nganhSvc: NganhService,
  ) { }

  ngOnInit(): void {
    this.getDataPaging();
  }

  getDataPaging(): void {
    this.spinner.show();
    this.nganhSvc.getAllPaging(
      this.listNganh.currentPage - 1,
      this.listNganh.limit,
      this.searchValue)
      .subscribe(res => {
        this.listNganh.currentPage = res.pageable.pageNumber + 1;
        this.listNganh.limit = res.pageable.pageSize;
        this.listNganh.totalPage = res.totalPages;
        this.listNganh.totalItem = res.totalElements;
        this.listNganh.data = res.content;
        this.spinner.hide();
      }, () => this.spinner.hide());
  }
  openModal(template: TemplateRef<unknown>, data?: Nganh): void {
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
        this.langData[this.langCode].THEM_MOI_TITLE) + this.langData[this.langCode].NGANH,
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
  pageChange(page: Paginate<Nganh>): void {
    this.listNganh = page;
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
        this.nganhSvc.delete(id)
          .subscribe(() => {
            this.spinner.hide();
            this.alert.success(this.langData[this.langCode].THAY_DOI_THANH_CONG);
            this.getDataPaging();
          }, () => this.spinner.hide());
      }
    });
  }

}
