import { LinhVucService } from './../../../../core/services/management/categories/linh-vuc.service';
import { LinhVuc } from './../../../../core/models/categories/linh-vuc.model';
import { LanguageConstant } from './../../../../core/constants/language.constant';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SystemConstant } from 'src/app/core/constants/system.constant';

@Component({
  selector: 'app-list-research-domains',
  templateUrl: './list-research-domains.component.html',
  styleUrls: ['./list-research-domains.component.scss']
})
export class ListResearchDomainsComponent implements OnInit {

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  breadcrumbObj: BreadCrumb = new BreadCrumb({
    heading: this.langData[this.langCode].LINH_VUC,
    listBreadcrumb: [{
      title: this.langData[this.langCode].DANH_MUC,
      link: UrlConstant.ROUTE.MANAGEMENT.CATEGORIES
    }]
  });

  modalData: ModalData<LinhVuc> = new ModalData<LinhVuc>();
  listLinhVuc: Paginate<LinhVuc> = new Paginate<LinhVuc>();
  searchValue = '';

  constructor(
    private spinner: NgxSpinnerService,
    private alert: ToastrService,
    private nzModalSvc: NzModalService,
    private linhVucSvc: LinhVucService,
  ) { }

  ngOnInit(): void {
    this.getDataPaging();
  }

  getDataPaging() {
    this.spinner.show();
    this.linhVucSvc.getAllPaging(
      this.listLinhVuc.currentPage - 1,
      this.listLinhVuc.limit,
      this.searchValue)
      .subscribe(res => {
        this.listLinhVuc.currentPage = res.pageable.pageNumber + 1;
        this.listLinhVuc.limit = res.pageable.pageSize;
        this.listLinhVuc.totalPage = res.totalPages;
        this.listLinhVuc.totalItem = res.totalElements;
        this.listLinhVuc.data = res.content;
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  openModal(template: TemplateRef<unknown>, data?: LinhVuc) {
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
        this.langData[this.langCode].THEM_MOI_TITLE) + this.langData[this.langCode].LINH_VUC,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false
    });
  }

  closeModal(reload?: boolean) {
    if (reload) {
      this.getDataPaging();
    }
    this.nzModalSvc.closeAll();
  }

  pageChange(page: Paginate<LinhVuc>) {
    this.listLinhVuc = page;
    this.getDataPaging();
  }

  changeStatus(id: string) {
    this.nzModalSvc.confirm({
      nzWidth: 300,
      nzTitle: this.langData[this.langCode].XAC_NHAN_THAY_DOI_TRANG_THAI,
      nzCancelText: this.langData[this.langCode].HUY,
      nzOkDanger: true,
      nzOkText: this.langData[this.langCode].XAC_NHAN,
      nzOnOk: () => {
        this.spinner.show();
        this.linhVucSvc.delete(id)
          .subscribe(() => {
            this.spinner.hide();
            this.alert.success(this.langData[this.langCode].THAY_DOI_THANH_CONG);
            this.getDataPaging();
          }, () => this.spinner.hide());
      }
    });
  }
}
