import { DiaDiemService } from './../../../../core/services/management/categories/dia-diem.service';
import { DiaDiem } from './../../../../core/models/categories/dia-diem.model';
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
  selector: 'app-list-location',
  templateUrl: './list-location.component.html',
  styleUrls: ['./list-location.component.scss']
})
export class ListLocationComponent implements OnInit {

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  breadcrumbObj: BreadCrumb = new BreadCrumb({
    heading: this.langData[this.langCode].DIA_DIEM,
    listBreadcrumb: [
      {
        title: this.langData[this.langCode].DANH_MUC,
        link: UrlConstant.ROUTE.MANAGEMENT.CATEGORIES,
      },
    ],
  });

  modalData: ModalData<DiaDiem> = new ModalData<DiaDiem>();
  listDiaDiem: Paginate<DiaDiem> = new Paginate<DiaDiem>();
  searchValue = '';

  constructor(
    private spinner: NgxSpinnerService,
    private alert: ToastrService,
    private nzModalSvc: NzModalService,
    private diaDiemSvc: DiaDiemService
  ) { }

  ngOnInit(): void {
    this.getDataPaging();
  }

  getDataPaging(): void {
    this.spinner.show();
    this.diaDiemSvc.getAllPaging(
      this.listDiaDiem.currentPage - 1,
      this.listDiaDiem.limit,
      this.searchValue)
      .subscribe((res) => {
        this.listDiaDiem.currentPage = res.pageable.pageNumber + 1;
        this.listDiaDiem.limit = res.pageable.pageSize;
        this.listDiaDiem.totalPage = res.totalPages;
        this.listDiaDiem.totalItem = res.totalElements;
        this.listDiaDiem.data = res.content;
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  openModal(template: TemplateRef<unknown>, data?: DiaDiem): void {
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
        this.langData[this.langCode].THEM_MOI_TITLE) + this.langData[this.langCode].DIA_DIEM,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false
    });
  }

  closeModal(reload?: boolean): void {
    if (reload) {
      this.listDiaDiem.currentPage = 1;
      this.getDataPaging();
    }
    this.nzModalSvc.closeAll();
  }

  pageChange(page: Paginate<DiaDiem>): void {
    this.listDiaDiem = page;
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
        this.diaDiemSvc.delete(id)
          .subscribe(() => {
            this.spinner.hide();
            this.alert.success(this.langData[this.langCode].THAY_DOI_THANH_CONG);
            this.getDataPaging();
          }, () => this.spinner.hide());
      }
    });
  }

}
