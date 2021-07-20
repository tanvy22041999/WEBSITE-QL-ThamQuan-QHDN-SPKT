import { ManagementLecturesService } from 'src/app/core/services/management/users/management-lectures.service';
import { GiangVien } from 'src/app/core/models/users/giang-vien.model';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { DotThamQuan } from 'src/app/core/models/categories/dot-tham-quan.model';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ChuyenThamQuan, FilterChuyenThamQuan } from 'src/app/core/models/main/chuyen-tham-quan.model';
import { SinhVien } from 'src/app/core/models/users/sinh-vien.model';
import { DotThamQuanService } from 'src/app/core/services/management/categories/dot-tham-quan.service';
import { ChuyenThamQuanService } from 'src/app/core/services/management/tours/chuyen-tham-quan.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';
import { CongTacVien } from 'src/app/core/models/users/cong-tac-vien.model';
import { DoanhNghiepService } from 'src/app/core/services/management/categories/doanh-nghiep.service';
import { CongTacVienService } from 'src/app/core/services/management/users/cong-tac-vien.service';
import { DoanhNghiep } from 'src/app/core/models/categories/doanh-nghiep.model';

@Component({
  selector: 'app-list-tours',
  templateUrl: './list-tours.component.html',
  styleUrls: ['./list-tours.component.scss']
})
export class ListToursComponent implements OnInit {

  @ViewChild('importQuyetDinhBgh') importQuyetDinhBgh: ElementRef;

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  breadcrumbObj: BreadCrumb = new BreadCrumb({
    heading: this.langData[this.langCode].TOURS,
    listBreadcrumb: [
      {
        title: this.langData[this.langCode].TOURS,
        link: UrlConstant.ROUTE.MANAGEMENT.MANAGE_TOURS,
      },
    ],
  });

  modalData: ModalData<ChuyenThamQuan> = new ModalData<ChuyenThamQuan>();
  modalRef: NzModalRef;
  modalDataStudent: ModalData<ChuyenThamQuan> = new ModalData<ChuyenThamQuan>();

  selectedDot = '';
  selectedGiangVien = '';
  selectCongTacVien = '';
  searchValue = '';
  selectDoanhNghiep = '';
  selectedNamHoc = '';
  selectedHocKy = '';
  selectTGBatDau = '';
  selectTGKetThuc = '';

  searchValueTextChanged = new Subject<string>();
  searchDotValueChanged = new Subject<string>();
  searchGiangVienValueChanged = new Subject<string>();
  searchCtvValueChanged = new Subject<string>();
  searchDoanhNghiepValueChanged = new Subject<string>();


  listChuyenThamQuan: Paginate<ChuyenThamQuan> = new Paginate<ChuyenThamQuan>();
  listSinhVien: SinhVien[] = [];
  listTourChecked: string[] = [];
  listDot: DotThamQuan[] = [];
  listGiangVien: GiangVien[] = [];
  listCTV: CongTacVien[] = [];
  listDoanhNghiep: DoanhNghiep[] = [];


  filterData = new FilterChuyenThamQuan();
  filterDangXuLy = [SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN.GIANG_VIEN_CHUA_CO_CONG_TY,
  SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN.GIANG_VIEN_DA_CHON_CONG_TY,
  SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN.DA_LIEN_HE_CONG_TY];
  filterDaDuyet = [SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN.DANG_XU_LY];
  filterHuy = [SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN.HUY];
  filterSanSang = [SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN.SAN_SANG];
  filterHoanTat = [SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN.HOAN_TAT];

  advanceSearch = false;
  checkedAll = false;
  indeterminate = false;
  isUpdate = false;
  setCheckedIdChuyenThamQuan = new Set<string>();
  listTourId: string[] = [];
  selectedIdChuyenThamQuan = '';
  chuyenMoi = false;

  constructor(
    private spinner: NgxSpinnerService,
    private alert: ToastrService,
    private nzModalSvc: NzModalService,
    private dotSvc: DotThamQuanService,
    private doanhNghiepSvc: DoanhNghiepService,
    private ctvSvc: CongTacVienService,
    private giangVienSvc: ManagementLecturesService,
    private chuyenThamQuanSvc: ChuyenThamQuanService,
  ) { }

  ngOnInit(): void {
    this.getDataPaging(this.filterData,
      [SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN.GIANG_VIEN_CHUA_CO_CONG_TY,
      SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN.GIANG_VIEN_DA_CHON_CONG_TY,
      SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN.DA_LIEN_HE_CONG_TY]);
    this.searchValueTextChanged.pipe(debounceTime(300))
      .subscribe(() => {
        this.onSearch();
      });
    this.searchDotValueChanged.pipe(debounceTime(300))
      .subscribe(searchValue => {
        this.getListDot(searchValue);
      });
    this.searchGiangVienValueChanged.pipe(debounceTime(300))
      .subscribe(() => {
        this.getListGiangVien();
      });
    this.searchCtvValueChanged.pipe(debounceTime(300))
      .subscribe(() => {
        this.getListCTV();
      });
    this.searchDoanhNghiepValueChanged.pipe(debounceTime(300))
      .subscribe(() => {
        this.getListDoanhNghiep();
      });
  }

  getDataPaging(filterData: FilterChuyenThamQuan, filterString?: string[]): void {
    this.spinner.show();
    if (filterString) {
      filterData.trangThai = filterString;
    }
    this.chuyenThamQuanSvc.filterChuyenThamQuan(
      filterData,
      this.listChuyenThamQuan.currentPage - 1,
      this.listChuyenThamQuan.limit)
      .subscribe(res => {
        this.listChuyenThamQuan.currentPage = res.pageable.pageNumber + 1;
        this.listChuyenThamQuan.limit = res.pageable.pageSize;
        this.listChuyenThamQuan.totalPage = res.totalPages;
        this.listChuyenThamQuan.totalItem = res.totalElements;
        this.listChuyenThamQuan.data = res.content;
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  getTourChuaCoDot(): void {
    let filterData: FilterChuyenThamQuan = new FilterChuyenThamQuan();
    filterData.chuyenMoi = true;
    filterData.trangThai = this.filterSanSang;
    this.spinner.show();
    this.chuyenThamQuanSvc.filterChuyenThamQuan(
      filterData,
      this.listChuyenThamQuan.currentPage - 1,
      this.listChuyenThamQuan.limit)
      .subscribe(res => {
        this.listChuyenThamQuan.currentPage = res.pageable.pageNumber + 1;
        this.listChuyenThamQuan.limit = res.pageable.pageSize;
        this.listChuyenThamQuan.totalPage = res.totalPages;
        this.listChuyenThamQuan.totalItem = res.totalElements;
        this.listChuyenThamQuan.data = res.content;
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  onSearch() {
    this.chuyenThamQuanSvc.filterChuyenThamQuan(
      this.filterData,
      this.listChuyenThamQuan.currentPage - 1,
      this.listChuyenThamQuan.limit,
      this.searchValue)
      .subscribe(res => {
        this.listChuyenThamQuan.currentPage = res.pageable.pageNumber + 1;
        this.listChuyenThamQuan.limit = res.pageable.pageSize;
        this.listChuyenThamQuan.totalPage = res.totalPages;
        this.listChuyenThamQuan.totalItem = res.totalElements;
        this.listChuyenThamQuan.data = res.content;
        this.spinner.hide();
      });
  }

  openModal(template: TemplateRef<unknown>, data?: ChuyenThamQuan): void {
    if (data) {
      this.modalData.action = SystemConstant.ACTION.EDIT;
      this.modalData.data = data;
    } else {
      this.modalData.action = SystemConstant.ACTION.ADD;
      // this.filterData.trangThai = [];
    }
    this.nzModalSvc.create({
      nzStyle: { top: '20px' },
      nzWidth: 800,
      nzTitle: (data ? this.langData[this.langCode].CHINH_SUA_TITLE :
        this.langData[this.langCode].THEM_MOI_TITLE) + this.langData[this.langCode].TOURS,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false
    });
  }

  onChangeDot(idDot: string): void {
    this.filterData.dotThamQuan = idDot;
    this.getDataPaging(this.filterData);
  }

  onChangeGiangVien(idGv: string): void {
    this.filterData.giangVien = idGv;
    this.getDataPaging(this.filterData);
  }

  onChangeCTV(idCtv: string): void {
    this.filterData.congTacVien = idCtv;
    this.getDataPaging(this.filterData);
  }

  onChangeDoanhNghiep(idDoanhNghiep: string): void {
    this.filterData.doanhNghiep = idDoanhNghiep;
    this.getDataPaging(this.filterData);
  }

  onChangeNamHoc(value: string): void {
    this.filterData.namHoc = value;
    this.getDataPaging(this.filterData);
  }

  onChangeHocKy(value: string): void {
    this.filterData.hocKy = value;
    this.getDataPaging(this.filterData);
  }


  getListDot(searchValue?: string) {
    this.dotSvc.getAllPaging(0, 10, searchValue ?? '')
      .subscribe((res) => {
        this.listDot = res.content.filter(x => x.trangThai);
      });
  }

  getListGiangVien() {
    this.giangVienSvc.getAll()
      .subscribe((res) => {
        this.listGiangVien = res;
      });
  }

  getListCTV() {
    this.ctvSvc.getAllCollaborator()
      .subscribe((res) => {
        this.listCTV = res;
      });
  }

  getListDoanhNghiep() {
    this.doanhNghiepSvc.getAll()
      .subscribe((res) => {
        this.listDoanhNghiep = res;
      });
  }

  closeModal(reload?: boolean, filterString?: string[]): void {
    console.log(this.chuyenMoi);
    if (reload) {
      if (this.chuyenMoi) {
        this.getTourChuaCoDot();
      }
      else {
        this.getDataPaging(this.filterData, filterString);
        this.listChuyenThamQuan.currentPage = 1;
      }
    }
    this.nzModalSvc.closeAll();
  }

  pageChange(page: Paginate<ChuyenThamQuan>, filterString?: string[]): void {
    this.listChuyenThamQuan = page;
    this.getDataPaging(this.filterData, filterString);
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
        this.chuyenThamQuanSvc.delete(id)
          .subscribe((res) => {
            console.log(res);
            this.spinner.hide();
            this.alert.success(this.langData[this.langCode].THAY_DOI_THANH_CONG);
            this.getDataPaging(this.filterData);
          }, () => this.spinner.hide());
      }
    });
  }

  openModalStudent(template: TemplateRef<unknown>, data?: ChuyenThamQuan, isUpdate?: boolean): void {
    this.modalDataStudent.data = data;
    this.isUpdate = isUpdate;
    this.modalRef = this.nzModalSvc.create({
      nzStyle: { top: '20px' },
      nzWidth: 1000,
      nzTitle: this.langData[this.langCode].CHINH_SUA_TITLE + this.langData[this.langCode].DANH_SACH_SINH_VIEN,
      nzContent: template,
      nzFooter: null,
      nzClosable: true,
      nzMaskClosable: false
    });
  }

  openModalCTV(template: TemplateRef<unknown>, data?: ChuyenThamQuan, isUpdate?: boolean): void {
    this.modalDataStudent.data = data;
    this.isUpdate = isUpdate;
    this.modalRef = this.nzModalSvc.create({
      nzStyle: { top: '20px' },
      nzWidth: 1000,
      nzTitle: this.langData[this.langCode].CHINH_SUA_TITLE + this.langData[this.langCode].DANH_SACH_CONG_TAC_VIEN,
      nzContent: template,
      nzFooter: null,
      nzClosable: true,
      nzMaskClosable: false
    });
  }

  closeModalStudent(): void {
    this.modalRef.destroy();
  }

  patchFilterData(filterData: string[]) {
    this.filterData.trangThai = filterData;
  }

  // log2(): void {
  //   console.log('aaaaaaaaaaaaa', this.setCheckedIdChuyenThamQuan, Array.from(this.setCheckedIdChuyenThamQuan));
  // }

  refreshCheckedStatus(): void {
    this.checkedAll = this.listChuyenThamQuan.totalItem === this.setCheckedIdChuyenThamQuan.size;
    this.indeterminate = this.setCheckedIdChuyenThamQuan.size > 0 && !this.checkedAll;
    this.listTourId = Array.from(this.setCheckedIdChuyenThamQuan);
  }

  onItemChecked(id: string, checked: boolean): void {
    if (checked) {
      this.setCheckedIdChuyenThamQuan.add(id);
    } else if (this.setCheckedIdChuyenThamQuan.has(id)) {
      this.setCheckedIdChuyenThamQuan.delete(id);
    }
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    if (checked) {
      this.spinner.show();
      this.setCheckedIdChuyenThamQuan.clear();
      const tmpFilter = new FilterChuyenThamQuan();
      tmpFilter.chuyenMoi = true;
      this.chuyenThamQuanSvc.filterChuyenThamQuan(
        tmpFilter, 0, 1)
        .subscribe(resGet => {
          this.chuyenThamQuanSvc.filterChuyenThamQuan(
            tmpFilter, 0, resGet.totalElements)
            .subscribe(res => {
              res.content.forEach(chuyenThamQuan => {
                this.setCheckedIdChuyenThamQuan.add(chuyenThamQuan.id);
                this.refreshCheckedStatus();
              });
              this.spinner.hide();
            });
        });
    } else {
      this.setCheckedIdChuyenThamQuan.clear();
    }
  }
  openModalDot(template: TemplateRef<unknown>, data?: DotThamQuan): void {
    this.modalRef = this.nzModalSvc.create({
      nzStyle: { top: '20px' },
      nzWidth: 500,
      nzTitle: (data ? this.langData[this.langCode].CHINH_SUA_TITLE :
        this.langData[this.langCode].THEM_MOI_TITLE) + this.langData[this.langCode].DOT_THAM_QUAN,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false
    });
  }

  closeModalDot(): void {
    this.getTourChuaCoDot();
    this.modalRef.destroy();
  }

  clickUploadQuyetDinhBgh(idChuyenThamQuan: string) {
    this.selectedIdChuyenThamQuan = idChuyenThamQuan;
    this.importQuyetDinhBgh.nativeElement.click();
  }

  importQuyetDinhBanGiamHieu(file: File): void {
    this.spinner.show();
    this.chuyenThamQuanSvc.importQuyetDinhCuaBanGiamHieu(this.selectedIdChuyenThamQuan, file)
      .subscribe(() => {
        this.importQuyetDinhBgh.nativeElement.value = '';
        this.getDataPaging(this.filterData, this.filterDaDuyet);
        this.spinner.hide();
        this.alert.success(this.langData[this.langCode].NHAP_QUYET_DINH_BGH_THANH_CONG);
      });
  }

  onChuyenMoi(value?: boolean) {
    this.chuyenMoi = value;
  }
}
