import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
// import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ThongKe } from 'src/app/core/models/tours/thong-ke.model';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-analysis',
  templateUrl: './list-analysis.component.html',
  styleUrls: ['./list-analysis.component.scss']
})
export class ListAnalysisComponent implements OnInit {

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  breadcrumbObj: BreadCrumb = new BreadCrumb({
    heading: this.langData[this.langCode].ANALYSIS,
    listBreadcrumb: [
      {
        title: this.langData[this.langCode].TOURS,
        link: UrlConstant.ROUTE.MANAGEMENT.ANALYSIS,
      },
    ],
  });

  modalData: ModalData<ThongKe> = new ModalData<ThongKe>();
  listThongKe: Paginate<ThongKe> = new Paginate<ThongKe>();
  // filterData: FilterThongKe = new FilterThongKe();
  searchValue = '';

  constructor(
    private spinner: NgxSpinnerService,
    // private alert: ToastrService,
    private nzModalSvc: NzModalService,
    // private ThongKeSvc: ThongKeService
  ) { }

  ngOnInit(): void {
    //this.getDataPaging();
    this.listThongKe.data = [

    ];
  }

  getDataPaging(): void {
    this.spinner.show();
    // this.ThongKeSvc.filterThongKe(
    //   this.filterData,
    //   this.listThongKe.currentPage - 1,
    //   this.listThongKe.limit)
    //   .subscribe((res) => {
    //     this.listThongKe.currentPage = res.pageable.pageNumber + 1;
    //     this.listThongKe.limit = res.pageable.pageSize;
    //     this.listThongKe.totalPage = res.totalPages;
    //     this.listThongKe.totalItem = res.totalElements;
    //     this.listThongKe.data = res.content;
    //     this.spinner.hide();
    //   }, () => this.spinner.hide());
  }

  openModal(template: TemplateRef<unknown>, data?: ThongKe): void {
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
        this.langData[this.langCode].THEM_MOI_TITLE) + this.langData[this.langCode].TOURS,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false
    });
  }

  closeModal(reload?: boolean): void {
    if (reload) {
      this.listThongKe.currentPage = 1;
      this.getDataPaging();
    }
    this.nzModalSvc.closeAll();
  }

  pageChange(page: Paginate<ThongKe>): void {
    this.listThongKe = page;
    this.getDataPaging();
  }

  changeStatus(): void {
    this.nzModalSvc.confirm({
      nzWidth: 300,
      nzTitle: this.langData[this.langCode].XAC_NHAN_THAY_DOI_TRANG_THAI,
      nzCancelText: this.langData[this.langCode].HUY,
      nzOkDanger: true,
      nzOkText: this.langData[this.langCode].XAC_NHAN,
      nzOnOk: () => {
        this.spinner.show();
        // this.thongKeSvc.delete(id)
        //   .subscribe(() => {
        //     this.spinner.hide();
        //     this.alert.success(this.langData[this.langCode].THAY_DOI_THANH_CONG);
        //     this.getDataPaging();
        //   }, () => this.spinner.hide());
      }
    });
  }
}
