import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { CongTacVien } from 'src/app/core/models/users/cong-tac-vien.model';
import { CongTacVienService } from 'src/app/core/services/management/users/cong-tac-vien.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-guide',
  templateUrl: './list-guide.component.html',
  styleUrls: ['./list-guide.component.scss']
})
export class ListGuideComponent implements OnInit {

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  breadcrumbObj: BreadCrumb = new BreadCrumb({
    heading: this.langData[this.langCode].MANAGEMENT_COLLABORATOR,
    listBreadcrumb: [{
      title: this.langData[this.langCode].MANAGEMENT_USER,
      link: UrlConstant.ROUTE.MANAGEMENT.MANAGEMENT_USERS
    }]
  });

  modalData: ModalData<CongTacVien> = new ModalData<CongTacVien>();
  listCongTacVien: Paginate<CongTacVien> = new Paginate<CongTacVien>();
  searchValue = '';

  constructor(
    private spinner: NgxSpinnerService,
    private alert: ToastrService,
    private nzModalSvc: NzModalService,
    private collaboratorSvc: CongTacVienService,

  ) { }

  ngOnInit(): void {
    this.getDataPaging();
  }

  getDataPaging(): void {
    this.spinner.show();
    this.collaboratorSvc.getAllPagingCollaborator(
      this.listCongTacVien.currentPage - 1,
      this.listCongTacVien.limit,
      this.searchValue)
      .subscribe(res => {
        this.listCongTacVien.currentPage = res.pageable.pageNumber + 1;
        this.listCongTacVien.limit = res.pageable.pageSize;
        this.listCongTacVien.totalPage = res.totalPages;
        this.listCongTacVien.totalItem = res.totalElements;
        this.listCongTacVien.data = res.content;
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  openModal(template: TemplateRef<unknown>, data?: CongTacVien): void {
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
        this.langData[this.langCode].THEM_MOI_TITLE) + this.langData[this.langCode].COLLABORATOR,
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

  pageChange(page: Paginate<CongTacVien>): void {
    this.listCongTacVien = page;
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
        this.collaboratorSvc.deleteCollaborator(id)
          .subscribe(() => {
            this.spinner.hide();
            this.alert.success(this.langData[this.langCode].THAY_DOI_THANH_CONG);
            this.getDataPaging();
          }, () => this.spinner.hide());
      }
    });
  }

}
