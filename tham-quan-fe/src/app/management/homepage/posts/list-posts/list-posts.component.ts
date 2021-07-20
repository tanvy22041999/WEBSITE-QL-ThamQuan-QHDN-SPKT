import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { BaiViet } from 'src/app/core/models/homepage/bai-viet.model';
import { BaiVietService } from 'src/app/core/services/management/homepage/bai-viet.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss']
})
export class ListPostsComponent implements OnInit {

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langDataLoaiBaiViet = SystemConstant.LIST_POST_TYPE_TITLE;
  langCode = localStorage.getItem('language') ?? 'en';
  //////////////////////////////

  breadcrumbObj: BreadCrumb = new BreadCrumb({
    heading: this.langData[this.langCode].CHUYEN_MUC_BAI_VIET,
    listBreadcrumb: [{
      title: this.langData[this.langCode].CAI_DAT_TRANG_CHU,
      link: UrlConstant.ROUTE.MANAGEMENT.CATEGORIES
    }]
  });

  modalData: ModalData<BaiViet> = new ModalData<BaiViet>();
  listBaiViet: Paginate<BaiViet> = new Paginate<BaiViet>();
  searchValue = '';
  listChuyenMuc = SystemConstant.LIST_POST_TYPE;
  selectedChuyenMuc = '';

  constructor(
    private spinner: NgxSpinnerService,
    private alert: ToastrService,
    private nzModalSvc: NzModalService,
    private baiVietSvc: BaiVietService,
  ) { }

  ngOnInit(): void {
    this.getAllPaging();
  }

  getAllPaging(): void {
    this.spinner.show();
    this.baiVietSvc.getAllPagingAdmin(
      this.selectedChuyenMuc,
      this.listBaiViet.currentPage - 1,
      this.listBaiViet.limit,
      this.searchValue)
      .subscribe(res => {
        this.listBaiViet.currentPage = res.pageable.pageNumber + 1;
        this.listBaiViet.limit = res.pageable.pageSize;
        this.listBaiViet.totalPage = res.totalPages;
        this.listBaiViet.totalItem = res.totalElements;
        this.listBaiViet.data = res.content;
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  openModal(template: TemplateRef<unknown>, data?: BaiViet): void {
    this.spinner.show();
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
        this.langData[this.langCode].THEM_MOI_TITLE) + this.langData[this.langCode].BAI_VIET,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false
    });
  }

  closeModal(reload?: boolean): void {
    if (reload) {
      this.getAllPaging();
    }
    this.nzModalSvc.closeAll();
  }

  pageChange(page: Paginate<BaiViet>): void {
    this.listBaiViet = page;
    this.getAllPaging();
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
        this.baiVietSvc.changeStatus(id)
          .subscribe(() => {
            this.spinner.hide();
            this.alert.success(this.langData[this.langCode].THAY_DOI_THANH_CONG);
            this.getAllPaging();
          }, () => this.spinner.hide());
      }
    });
  }

}
