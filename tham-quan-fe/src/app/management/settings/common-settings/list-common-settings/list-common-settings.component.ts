import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { CommonSettings } from 'src/app/core/models/setting/common-settings.model';
import { CommonSettingsService } from 'src/app/core/services/management/setting/common-settings.service';

import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-common-settings',
  templateUrl: './list-common-settings.component.html',
  styleUrls: ['./list-common-settings.component.scss']
})
export class ListCommonSettingsComponent implements OnInit {

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  breadcrumbObj: BreadCrumb = new BreadCrumb({
    heading: this.langData[this.langCode].CAU_HINH_HE_THONG_CHUNG,
    listBreadcrumb: [
      {
        title: this.langData[this.langCode].CAU_HINH,
        link: UrlConstant.ROUTE.MANAGEMENT.COMMON_SETTINGS,
      },
    ],
  });

  modalData: ModalData<CommonSettings> = new ModalData<CommonSettings>();
  listCommonSettings: Paginate<CommonSettings> = new Paginate<CommonSettings>();
  searchValue = '';

  constructor(
    private spinner: NgxSpinnerService,
    private alert: ToastrService,
    private nzModalSvc: NzModalService,
    private commonSettingsSvc: CommonSettingsService
  ) { }

  ngOnInit(): void {
    this.getDataPaging();
  }

  getDataPaging(): void {
    this.spinner.show();
    this.commonSettingsSvc.getAllPaging(
      this.listCommonSettings.currentPage - 1,
      this.listCommonSettings.limit,
      this.searchValue)
      .subscribe((res) => {
        this.listCommonSettings.currentPage = res.pageable.pageNumber + 1;
        this.listCommonSettings.limit = res.pageable.pageSize;
        this.listCommonSettings.totalPage = res.totalPages;
        this.listCommonSettings.totalItem = res.totalElements;
        this.listCommonSettings.data = res.content;
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  openModal(template: TemplateRef<unknown>, data?: CommonSettings): void {
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
        this.langData[this.langCode].THEM_MOI_TITLE) + this.langData[this.langCode].CAU_HINH_HE_THONG_CHUNG,
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

  pageChange(page: Paginate<CommonSettings>): void {
    this.listCommonSettings = page;
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
        this.commonSettingsSvc.delete(id)
          .subscribe(() => {
            this.spinner.hide();
            this.alert.success(this.langData[this.langCode].THAY_DOI_THANH_CONG);
            this.getDataPaging();
          }, () => this.spinner.hide());
      }
    });
  }

}
