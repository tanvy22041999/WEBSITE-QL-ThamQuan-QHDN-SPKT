import { SystemConstant } from './../../../core/constants/system.constant';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LanguageConstant } from 'src/app/core/constants/language.constant';

import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ChuyenThamQuan } from 'src/app/core/models/main/chuyen-tham-quan.model';
import { SinhVienThamQuan } from 'src/app/core/models/main/sinh-vien-tham-quan.model';
import { FilterSinhVien, SinhVien } from 'src/app/core/models/users/sinh-vien.model';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';
import { ChuyenThamQuanService } from 'src/app/core/services/management/tours/chuyen-tham-quan.service';
import { SinhVienService } from 'src/app/core/services/management/users/sinh-vien.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-join-student',
  templateUrl: './list-join-student.component.html',
  styleUrls: ['./list-join-student.component.scss']
})
export class ListJoinStudentComponent implements OnInit {

  @ViewChild('importDanhSachSinhVien') importDsSvElement: ElementRef;
  @ViewChild('importDanhSachDiemDanh') importDsDiemDanhElement: ElementRef;

  @Input() modalDataChuyenThamQuan: ModalData<ChuyenThamQuan>;
  @Output() closeModalStudent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() isUpdate: boolean;

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  breadcrumbObj: BreadCrumb = new BreadCrumb({
    heading: this.langData[this.langCode].DANH_SACH_SINH_VIEN_THAM_QUAN,
    listBreadcrumb: [
      {
        title: this.langData[this.langCode].DANH_MUC,
        link: UrlConstant.ROUTE.MANAGEMENT.CATEGORIES,
      },
    ],
  });

  modalRef: NzModalRef;


  isFieldValid = this.formValidatorSvc.isFieldValid;
  displayFieldCss = this.formValidatorSvc.displayFieldCss;

  listSinhVien: Paginate<SinhVienThamQuan> = new Paginate<SinhVienThamQuan>();  //Sinh Vien cua chuyen tham quan
  listAllSinhVien: SinhVien[] = []; // tat ca sinh vien;
  listSinhVienJoined = [];
  searchValue = '';
  form: FormGroup;
  formDiemDanh: FormGroup;

  filterDataSinhVien: FilterSinhVien = new FilterSinhVien();

  searchValueTextChanged = new Subject<string>();
  searchSinhVienChange = new Subject<string>();

  constructor(
    private spinner: NgxSpinnerService,
    private alert: ToastrService,
    private nzModalSvc: NzModalService,
    private chuyenThamQuanSvc: ChuyenThamQuanService,
    private sinhVienSvc: SinhVienService,
    private formValidatorSvc: FormValidatorService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getListSinhVienPaging();
    this.searchValueTextChanged.pipe(debounceTime(300))
      .subscribe(searchValue => {
        this.onSearch(searchValue);
      });
    this.searchSinhVienChange.pipe(debounceTime(300))
      .subscribe(() => {
        this.getAllSinhVien(this.filterDataSinhVien);
      });

  }


  //get tat ca sinh vien
  getAllSinhVien(filterData: FilterSinhVien): void {
    this.spinner.show();
    this.sinhVienSvc.getAllSinhVien(filterData.hoTen)
      .subscribe(res => {
        this.listAllSinhVien = res;
        this.spinner.hide();
      }, () => this.spinner.hide());
  }


  //get DSSV cua chuyen tham quan
  getListSinhVienPaging(): void {
    this.spinner.show();
    this.chuyenThamQuanSvc.getListSinhVienPaging(
      this.modalDataChuyenThamQuan.data.id,
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


  //modal them sv
  openModal(template: TemplateRef<unknown>, data?: ChuyenThamQuan): void {
    this.createForm();
    this.searchSinhVienChange.next();
    this.modalRef = this.nzModalSvc.create({
      nzStyle: { top: '20px' },
      nzWidth: 500,
      nzTitle: (data ? this.langData[this.langCode].CHINH_SUA_TITLE :
        this.langData[this.langCode].THEM_MOI_TITLE) + this.langData[this.langCode].SINH_VIEN,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false
    });
  }

  openModalDiemDanh(template: TemplateRef<unknown>): void {
    this.createFormDiemDanh();
    this.searchSinhVienChange.next();
    this.modalRef = this.nzModalSvc.create({
      nzStyle: { top: '20px' },
      nzWidth: 300,
      nzTitle: this.langData[this.langCode].DIEM_DANH_BU,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false
    });
  }

  createFormDiemDanh() {
    this.formDiemDanh = this.fb.group({
      mssv: ['', [Validators.required]],
      soPhut: ['', [Validators.required, Validators.min(1)]]
    })
  }

  ///modal dssv
  closeModal(reload?: boolean): void {
    if (reload) {
      this.getListSinhVienPaging();
    }
    this.nzModalSvc.closeAll();
  }

  pageChange(page: Paginate<SinhVienThamQuan>): void {
    this.listSinhVien = page;
    this.getListSinhVienPaging();
  }


  closeModalThemSinhVien(): void {
    this.getListSinhVienPaging();
    this.modalRef.destroy();
  }



  createForm(): void {
    this.form = this.fb.group({
      danhSachSinhViens: [[]],
    });
  }

  downloadMauImportSinhVien() {
    window.location.assign('./assets/files/mau-import-danh-sach-sinh-vien.xlsx');
  }

  downloadMauImportDiemDanh() {
    window.location.assign('./assets/files/mau-import-danh-sach-sinh-vien-diem-danh-bu.xlsx');
  }


  clickUploadFileImportSinhVien() {
    this.importDsSvElement.nativeElement.click();
  }

  importSinhVien(file: File): void {
    this.spinner.show();
    this.chuyenThamQuanSvc.importDanhSachSinhVien(file, this.modalDataChuyenThamQuan.data.id)
      .subscribe(res => {
        this.spinner.hide();
        this.importDsSvElement.nativeElement.value = '';
        this.getListSinhVienPaging();
        this.alert.success(res.body);
      });
  }


  onUpdateListSinhVien() {
    this.spinner.show();
    if (this.modalDataChuyenThamQuan.data.danhSachSinhViens) {
      this.listSinhVienJoined = [...this.modalDataChuyenThamQuan.data.danhSachSinhViens.map(sv => sv.sinhVien.id)];
    }
    const listTempt = this.listSinhVienJoined.concat(this.form.get('danhSachSinhViens').value);
    this.chuyenThamQuanSvc.updateDanhSachSinhVien(this.modalDataChuyenThamQuan.data.id, listTempt)
      .subscribe((res) => {
        console.log(res)
        this.closeModalThemSinhVien();
        this.alert.success(this.langData[this.langCode].CAP_NHAT_THANH_CONG);
        this.spinner.hide();
        this.getListSinhVienPaging();
      });
  }

  onSearch(value): void {
    this.filterDataSinhVien.hoTen = value.target.value;
    this.getListSinhVienPaging();
  }

  onDeleteSinhVien(idSv: string): void {
    this.spinner.show();
    this.chuyenThamQuanSvc.deleteSinhVien(this.modalDataChuyenThamQuan.data.id, idSv)
      .subscribe(() => {
        this.spinner.hide();
        this.alert.success(this.langData[this.langCode].THAY_DOI_THANH_CONG);
        this.getListSinhVienPaging();
      }, () => this.spinner.hide());
  }

  checkTrangThai() {
    return this.modalDataChuyenThamQuan.data.trangThai.includes(SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN.SAN_SANG);
  }

  clickUploadFileImportFileDiemDanh() {
    this.importDsDiemDanhElement.nativeElement.click();
  }

  importDSDiemDanhBu(file: File): void {
    this.spinner.show();
    this.chuyenThamQuanSvc.importDanhSachDiemDanh(file, this.modalDataChuyenThamQuan.data.id)
      .subscribe(() => {
        this.importDsDiemDanhElement.nativeElement.value = '';
        this.spinner.hide();
        this.getListSinhVienPaging();
        this.alert.success(this.langData[this.langCode].NHAP_DS_DIEM_DANH_THANH_CONG);
      });
  }

  diemDanhBu() {
    if (this.formDiemDanh.valid) {
      this.chuyenThamQuanSvc.diemDanhSinhVienBu(this.modalDataChuyenThamQuan.data.id, this.formDiemDanh.get('mssv').value, this.formDiemDanh.get('soPhut').value)
        .subscribe((res) => {
          this.closeModalThemSinhVien();
          this.alert.success(res.body);
        }, () => this.spinner.hide());
    } else {
      this.formValidatorSvc.validateAllFormFields(this.formDiemDanh);
    }
  }
}
