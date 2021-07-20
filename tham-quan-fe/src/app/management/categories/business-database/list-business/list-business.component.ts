import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { DoanhNghiep } from 'src/app/core/models/categories/doanh-nghiep.model';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { DoanhNghiepService } from 'src/app/core/services/management/categories/doanh-nghiep.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-business',
  templateUrl: './list-business.component.html',
  styleUrls: ['./list-business.component.scss']
})
export class ListBusinessComponent implements OnInit {

  @ViewChild('importDanhSachDoanhNghiep') importDSDoanhNghiep: ElementRef;

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  breadcrumbObj: BreadCrumb = new BreadCrumb({
    heading: this.langData[this.langCode].DOANH_NGHIEP,
    listBreadcrumb: [
      {
        title: this.langData[this.langCode].DANH_MUC,
        link: UrlConstant.ROUTE.MANAGEMENT.CATEGORIES,
      },
    ],
  });

  modalData: ModalData<DoanhNghiep> = new ModalData<DoanhNghiep>();
  listDoanhNghiep: Paginate<DoanhNghiep> = new Paginate<DoanhNghiep>();
  listRoles = [
    { name: this.langData[this.langCode].QUYEN_QUAN_TRI, role: 'ROLE_ADMIN' },
    { name: this.langData[this.langCode].QUYEN_DOANH_NGHIEP, role: 'ROLE_DOANH_NGHIEP' },
    { name: this.langData[this.langCode].QUYEN_CONG_TAC_VIEN, role: 'ROLE_CONG_TAC_VIEN' },
  ];

  searchValue = '';
  isFullData = false;

  constructor(
    private spinner: NgxSpinnerService,
    private alert: ToastrService,
    private nzModalSvc: NzModalService,
    private doanhNghiepSvc: DoanhNghiepService
  ) { }

  ngOnInit(): void {
    this.getDataPaging();
  }

  getDataPaging(): void {
    // this.spinner.show();
    this.doanhNghiepSvc.getAllPaging(
      this.listDoanhNghiep.currentPage - 1,
      this.listDoanhNghiep.limit,
      this.searchValue)
      .subscribe((res) => {
        this.listDoanhNghiep.currentPage = res.pageable.pageNumber + 1;
        this.listDoanhNghiep.limit = res.pageable.pageSize;
        this.listDoanhNghiep.totalPage = res.totalPages;
        this.listDoanhNghiep.totalItem = res.totalElements;
        this.listDoanhNghiep.data = res.content;
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  openModal(template: TemplateRef<unknown>, data?: DoanhNghiep): void {
    if (data) {
      this.modalData.action = SystemConstant.ACTION.EDIT;
      this.modalData.data = data;
      this.isFullData = true;
    } else {
      this.modalData.action = SystemConstant.ACTION.ADD;
      this.isFullData = false;
    }
    this.nzModalSvc.create({
      nzStyle: { top: '20px' },
      nzWidth: 500,
      nzTitle: (data ? this.langData[this.langCode].CHINH_SUA_TITLE :
        this.langData[this.langCode].THEM_MOI_TITLE) + this.langData[this.langCode].DOANH_NGHIEP,
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

  pageChange(page: Paginate<DoanhNghiep>): void {
    this.listDoanhNghiep = page;
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
        this.doanhNghiepSvc.delete(id)
          .subscribe(() => {
            this.spinner.hide();
            this.alert.success(this.langData[this.langCode].THAY_DOI_THANH_CONG);
            this.getDataPaging();
            this.spinner.hide();
          }, () => this.spinner.hide());
      }
    });
  }

  downloadMauImportDoanhNghiep() {
    window.location.assign('./assets/files/mau-import-danh-sach-doanh-nghiep.xlsx');
  }

  clickUploadFileImportDoanhNghiep() {
    this.importDSDoanhNghiep.nativeElement.click();
  }

  importDoanhNghiep(file: File): void {
    this.spinner.show();
    this.doanhNghiepSvc.importDanhSachDoanhNghiep(file)
      .subscribe(res => {
        this.importDSDoanhNghiep.nativeElement.value = '';
        this.spinner.hide();
        this.getDataPaging();
        this.alert.success(res.body);
      });
  }

  findRole(role) {
    const result = this.listRoles.find((r) =>
      r.role === role);
    return result;
  }
}
