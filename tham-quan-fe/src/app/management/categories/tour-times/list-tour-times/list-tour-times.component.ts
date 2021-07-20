import { DotThamQuanService } from './../../../../core/services/management/categories/dot-tham-quan.service';
import { DotThamQuan } from './../../../../core/models/categories/dot-tham-quan.model';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-tour-times',
  templateUrl: './list-tour-times.component.html',
  styleUrls: ['./list-tour-times.component.scss']
})
export class ListTourTimesComponent implements OnInit {

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  breadcrumbObj: BreadCrumb = new BreadCrumb({
    heading: this.langData[this.langCode].DOT_THAM_QUAN,
    listBreadcrumb: [
      {
        title: this.langData[this.langCode].DANH_MUC,
        link: UrlConstant.ROUTE.MANAGEMENT.CATEGORIES,
      },
    ],
  });

  modalData: ModalData<DotThamQuan> = new ModalData<DotThamQuan>();
  listDotThamQuan: Paginate<DotThamQuan> = new Paginate<DotThamQuan>();
  searchValue = '';

  constructor(
    private spinner: NgxSpinnerService,
    private alert: ToastrService,
    private nzModalSvc: NzModalService,
    private dotThamQuanSvc: DotThamQuanService
  ) { }

  ngOnInit(): void {
    this.getDataPaging();

  }

  getDataPaging(): void {
    this.spinner.show();
    this.dotThamQuanSvc.getAllPaging(
      this.listDotThamQuan.currentPage - 1,
      this.listDotThamQuan.limit,
      this.searchValue)
      .subscribe((res) => {
        this.listDotThamQuan.currentPage = res.pageable.pageNumber + 1;
        this.listDotThamQuan.limit = res.pageable.pageSize;
        this.listDotThamQuan.totalPage = res.totalPages;
        this.listDotThamQuan.totalItem = res.totalElements;
        this.listDotThamQuan.data = res.content;
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  openModal(template: TemplateRef<unknown>, data?: DotThamQuan): void {
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
        this.langData[this.langCode].THEM_MOI_TITLE) + this.langData[this.langCode].DOT_THAM_QUAN,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false
    });
  }

  closeModal(reload?: boolean): void {
    if (reload) {
      this.listDotThamQuan.currentPage = 1;
      this.getDataPaging();
    }
    this.nzModalSvc.closeAll();
  }

  pageChange(page: Paginate<DotThamQuan>): void {
    this.listDotThamQuan = page;
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
        this.dotThamQuanSvc.delete(id)
          .subscribe(() => {
            this.spinner.hide();
            this.alert.success(this.langData[this.langCode].THAY_DOI_THANH_CONG);
            this.getDataPaging();
          }, () => this.spinner.hide());
      }
    });
  }
}
