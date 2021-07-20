import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { FileManuals } from 'src/app/core/models/setting/file-manuals.model';
import { FileManualsService } from 'src/app/core/services/management/setting/file-manuals.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-file-manuals',
  templateUrl: './list-file-manuals.component.html',
  styleUrls: ['./list-file-manuals.component.scss']
})
export class ListFileManualsComponent implements OnInit {

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  breadcrumbObj: BreadCrumb = new BreadCrumb({
    heading: this.langData[this.langCode].FILE_MANUALS,
    listBreadcrumb: [{
      title: this.langData[this.langCode].CAU_HINH,
      link: UrlConstant.ROUTE.MANAGEMENT.FILE_MANUALS
    }]
  });

  modalData: ModalData<FileManuals> = new ModalData<FileManuals>();
  listFileManuals: Paginate<FileManuals> = new Paginate<FileManuals>();
  searchValue = '';

  constructor(
    private spinner: NgxSpinnerService,
    private alert: ToastrService,
    private nzModalSvc: NzModalService,
    private fileManualaSvc: FileManualsService,

  ) { }

  ngOnInit(): void {
    this.getDataPaging();
  }

  getDataPaging(): void {
    this.spinner.show();
    this.fileManualaSvc.getAllPagingFileManuals(
      this.listFileManuals.currentPage - 1,
      this.listFileManuals.limit,
      this.searchValue)
      .subscribe(res => {
        this.listFileManuals.currentPage = res.pageable.pageNumber + 1;
        this.listFileManuals.limit = res.pageable.pageSize;
        this.listFileManuals.totalPage = res.totalPages;
        this.listFileManuals.totalItem = res.totalElements;
        this.listFileManuals.data = res.content;
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  openModal(template: TemplateRef<unknown>, data?: FileManuals): void {
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
        this.langData[this.langCode].THEM_MOI_TITLE) + this.langData[this.langCode].FILE_MANUALS,
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

  pageChange(page: Paginate<FileManuals>): void {
    this.listFileManuals = page;
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
        this.fileManualaSvc.deleteFileManuals(id)
          .subscribe(() => {
            this.spinner.hide();
            this.alert.success(this.langData[this.langCode].THAY_DOI_THANH_CONG);
            this.getDataPaging();
          }, () => this.spinner.hide());
      }
    });
  }


}
