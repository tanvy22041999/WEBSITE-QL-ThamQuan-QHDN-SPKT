import { Component, OnInit, TemplateRef } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { SideBanner, SideBannerView } from 'src/app/core/models/homepage/side-banner.model';
import { SideBannerService } from 'src/app/core/services/management/homepage/side-banner.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-side-banner',
  templateUrl: './list-side-banner.component.html',
  styleUrls: ['./list-side-banner.component.scss']
})
export class ListSideBannerComponent implements OnInit {

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ?? 'en';
  //////////////////////////////

  breadcrumbObj: BreadCrumb = new BreadCrumb({
    heading: this.langData[this.langCode].SIDE_BANNER,
    listBreadcrumb: [{
      title: this.langData[this.langCode].CAI_DAT_TRANG_CHU,
      link: UrlConstant.ROUTE.MANAGEMENT.HOMEPAGE
    }]
  });

  modalData: ModalData<SideBanner> = new ModalData<SideBanner>();
  listBanner: Paginate<SideBanner> = new Paginate<SideBanner>();
  searchValue = '';
  selectedFileSideBanner = '';
  objBannerView: SideBannerView = new SideBannerView();
  viewer = 'imageViewer';
  modalRef: NzModalRef;

  constructor(
    private spinner: NgxSpinnerService,
    private alert: ToastrService,
    private nzModalSvc: NzModalService,
    private sideBannerSvc: SideBannerService,
  ) { }

  ngOnInit(): void {
    this.getDataPaging();
  }

  getDataPaging(isSearch?: boolean): void {
    if (isSearch) {
      this.listBanner.currentPage = 1;
    }
    this.spinner.show();
    this.sideBannerSvc.getAllPaging(
      this.listBanner.currentPage - 1,
      this.listBanner.limit,
      this.searchValue)
      .subscribe(res => {
        this.listBanner.currentPage = res.pageable.pageNumber + 1;
        this.listBanner.limit = res.pageable.pageSize;
        this.listBanner.totalPage = res.totalPages;
        this.listBanner.totalItem = res.totalElements;
        this.listBanner.data = res.content;
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  openModal(template: TemplateRef<unknown>, data?: SideBanner): void {
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
        this.langData[this.langCode].THEM_MOI_TITLE) + this.langData[this.langCode].BANNER,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false
    });
  }

  openModalViewBanner(template: TemplateRef<unknown>, idBanner: string): void {
    this.selectedFileSideBanner = idBanner;
    this.modalRef = this.nzModalSvc.create({
      nzStyle: { top: '20px', width: '100%', maxWidth: this.viewer === 'imageViewer' ? '75vmin' : '100vmin' },
      nzTitle: null,
      nzMaskClosable: false,
      nzContent: template,
      nzOnOk: () => this.modalRef.close(),
      nzCancelText: null
    });
  }

  hideModalViewFile(): void {
    this.modalRef.close();
  }
  closeModal(reload?: boolean): void {
    if (reload) {
      this.getDataPaging();
    }
    this.nzModalSvc.closeAll();
  }

  pageChange(page: Paginate<SideBanner>): void {
    this.listBanner = page;
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
        this.sideBannerSvc.changeStatus(id)
          .subscribe(() => {
            this.spinner.hide();
            this.alert.success(this.langData[this.langCode].THAY_DOI_THANH_CONG);
            this.getDataPaging();
          }, () => this.spinner.hide());
      }
    });
  }

  deleteBanner(id: string): void {
    this.nzModalSvc.confirm({
      nzWidth: 300,
      nzTitle: this.langData[this.langCode].XAC_NHAN_XOA_HOAN_TOAN,
      nzCancelText: this.langData[this.langCode].HUY,
      nzOkDanger: true,
      nzOkText: this.langData[this.langCode].XAC_NHAN,
      nzOnOk: () => {
        this.spinner.show();
        this.sideBannerSvc.delete(id)
          .subscribe(() => {
            this.spinner.hide();
            this.alert.success(this.langData[this.langCode].XOA_THANH_CONG);
            this.getDataPaging();
          }, () => this.spinner.hide());
      }
    });
  }

  saveResourceBannerView(idBanner: string, bannerRes: SafeResourceUrl): void {
    this.objBannerView[idBanner] = bannerRes;
  }

}
