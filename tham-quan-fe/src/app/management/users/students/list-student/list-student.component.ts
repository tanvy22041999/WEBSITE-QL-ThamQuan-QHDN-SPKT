import { SinhVienService } from './../../../../core/services/management/users/sinh-vien.service';
import { FilterSinhVien, SinhVien } from '../../../../core/models/users/sinh-vien.model';
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
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { KhoaService } from 'src/app/core/services/management/categories/khoa.service';
import { NganhService } from 'src/app/core/services/management/categories/nganh.service';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss']
})
export class ListStudentComponent implements OnInit {

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  breadcrumbObj: BreadCrumb = new BreadCrumb({
    heading: this.langData[this.langCode].QUAN_LY_SINH_VIEN,
    listBreadcrumb: [
      {
        title: this.langData[this.langCode].DANH_MUC,
        link: UrlConstant.ROUTE.MANAGEMENT.CATEGORIES,
      },
    ],
  });

  listKhoa = [];
  listNganh = [];

  searchValueTextChanged = new Subject<string>();
  searchNganhValueChanged = new Subject<string>();
  searchKhoaValueChanged = new Subject<string>();

  selectedKhoa: string = null;
  selectedNganh: string = null;

  modalData: ModalData<SinhVien> = new ModalData<SinhVien>();
  listSinhVien: Paginate<SinhVien> = new Paginate<SinhVien>();
  searchValue = '';

  filterData: FilterSinhVien = new FilterSinhVien();

  constructor(
    private spinner: NgxSpinnerService,
    private alert: ToastrService,
    private khoaSvc: KhoaService,
    private nganhSvc: NganhService,
    private nzModalSvc: NzModalService,
    private sinhVienSvc: SinhVienService
  ) { }

  ngOnInit(): void {
    this.getDataPaging(this.filterData);
    this.searchValueTextChanged.pipe(debounceTime(300))
      .subscribe(() => {
        this.getDataPaging(this.filterData);
      });


    this.searchKhoaValueChanged.pipe(debounceTime(250))
      .subscribe(searchValue => {
        this.getListKhoa(searchValue);
      });
    this.searchNganhValueChanged.pipe(debounceTime(250))
      .subscribe(searchValue => {
        console.log(searchValue);
        this.getListNganh(searchValue);
      });
  }

  getDataPaging(filterData: FilterSinhVien): void {
    this.spinner.show();
    this.sinhVienSvc.getFilterSinhVien(
      filterData,
      this.listSinhVien.currentPage - 1,
      this.listSinhVien.limit,
      this.searchValue)
      .subscribe((res) => {
        this.listSinhVien.currentPage = res.pageable.pageNumber + 1;
        this.listSinhVien.limit = res.pageable.pageSize;
        this.listSinhVien.totalPage = res.totalPages;
        this.listSinhVien.totalItem = res.totalElements;
        this.listSinhVien.data = res.content;
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  openModal(template: TemplateRef<unknown>, data?: SinhVien): void {
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
        this.langData[this.langCode].THEM_MOI_TITLE) + this.langData[this.langCode].SINH_VIEN,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false
    });
  }

  closeModal(reload?: boolean): void {
    if (reload) {
      this.getDataPaging(this.filterData);
    }
    this.nzModalSvc.closeAll();
  }

  pageChange(page: Paginate<SinhVien>): void {
    this.listSinhVien = page;
    this.getDataPaging(this.filterData);
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
        this.sinhVienSvc.delete(id)
          .subscribe(() => {
            this.spinner.hide();
            this.alert.success(this.langData[this.langCode].THAY_DOI_THANH_CONG);
            this.getDataPaging(this.filterData);
          }, () => this.spinner.hide());
      }
    });
  }

  onChangeKhoa(idKhoa?: string): void {
    if (idKhoa) {
      this.selectedKhoa = idKhoa;
      this.nganhSvc.getByIdKhoa(idKhoa)
        .subscribe(res => {
          this.listNganh = res;
        });
    } else {
      this.getListNganh();
    }
    // Reset lại filter biến ngành
    this.selectedNganh = null;
    this.filterData.nganh = '';
    // Get data
    this.filterData.khoa = idKhoa;
    this.getDataPaging(this.filterData);
  }

  onChangeNganh(idNganh?: string): void {
    console.log(idNganh);
    idNganh ? this.filterData.nganh = idNganh : this.filterData.nganh = null;
    // if (idNganh) {
    //   this.filterData.nganh = idNganh;
    // } else {
    //   this.filterData.nganh = null;
    // }
    this.getDataPaging(this.filterData);

  }

  getListKhoa(searchValue?: string): void {
    this.khoaSvc.getAllPaging(0, 10, searchValue ?? '')
      .subscribe(res => {
        this.listKhoa = res.content.filter(x => x.trangThai);
      });
  }

  getListNganh(searchValue?: string): void {
    if (!this.selectedKhoa || searchValue !== '') {
      this.nganhSvc.getAllPaging(0, 10, searchValue)
        .subscribe(res => {
          this.listNganh = res.content.filter(x => x.trangThai);
        });
    }
  }
}
