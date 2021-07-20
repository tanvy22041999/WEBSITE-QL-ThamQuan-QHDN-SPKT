import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { FilterGiangVien, GiangVien } from 'src/app/core/models/users/giang-vien.model';
import { KhoaService } from 'src/app/core/services/management/categories/khoa.service';
import { LinhVucService } from 'src/app/core/services/management/categories/linh-vuc.service';
import { NganhService } from 'src/app/core/services/management/categories/nganh.service';
import { ManagementLecturesService } from 'src/app/core/services/management/users/management-lectures.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-lectures',
  templateUrl: './list-lectures.component.html',
  styleUrls: ['./list-lectures.component.scss']
})
export class ListLecturesComponent implements OnInit {

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  breadcrumbObj: BreadCrumb = new BreadCrumb({
    heading: this.langData[this.langCode].MANAGEMENT_LECTURERS,
    listBreadcrumb: [{
      title: this.langData[this.langCode].MANAGEMENT_USER,
      link: UrlConstant.ROUTE.MANAGEMENT.MANAGEMENT_USERS
    }]
  });

  modalData: ModalData<GiangVien> = new ModalData<GiangVien>();
  listGiangVien: Paginate<GiangVien> = new Paginate<GiangVien>();
  searchValue = '';
  filterGiangVien: FilterGiangVien = new FilterGiangVien();

  listKhoa = [];
  listNganh = [];
  listLinhVuc = [];
  filterKhoa: string = null;
  filterNganh: string = null;
  filterLinhVuc: string = null;

  filterNganhValueChanged = new Subject<string>();
  filterKhoaValueChanged = new Subject<string>();
  filterLinhVucValueChanged = new Subject<string>();

  constructor(
    private spinner: NgxSpinnerService,
    private alert: ToastrService,
    private nzModalSvc: NzModalService,
    private lecturesSvc: ManagementLecturesService,
    private giangVienSvc: ManagementLecturesService,
    private khoaSvc: KhoaService,
    private nganhSvc: NganhService,
    private linhVucSvc: LinhVucService,

  ) { }

  ngOnInit(): void {
    this.getDataFilterGiangVien(this.filterGiangVien);
    this.getListKhoa();
    this.getListLinhVuc();
    this.getListNganh();
    this.filterKhoaValueChanged.pipe(debounceTime(250))
      .subscribe(searchValue => {
        this.getListKhoa(searchValue);
      });
    this.filterNganhValueChanged.pipe(debounceTime(250))
      .subscribe(searchValue => {
        this.getListNganh(searchValue);
      });
    this.filterLinhVucValueChanged.pipe(debounceTime(250))
      .subscribe(searchValue => {
        this.getListLinhVuc(searchValue);
      });
  }

  getDataFilterGiangVien(filterGiangVien: FilterGiangVien): void {
    this.spinner.show();
    this.lecturesSvc.getLecturers(
      filterGiangVien,
      this.listGiangVien.currentPage - 1,
      this.listGiangVien.limit)
      .subscribe(res => {
        this.listGiangVien.currentPage = res.pageable.pageNumber + 1;
        this.listGiangVien.limit = res.pageable.pageSize;
        this.listGiangVien.totalPage = res.totalPages;
        this.listGiangVien.totalItem = res.totalElements;
        this.listGiangVien.data = res.content;
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  openModal(template: TemplateRef<unknown>, data?: GiangVien): void {
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
        this.langData[this.langCode].THEM_MOI_TITLE) + this.langData[this.langCode].LECTURERS,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false
    });
  }

  onSearch(): void {
    this.filterGiangVien.search = this.searchValue;
    this.getDataFilterGiangVien(this.filterGiangVien);
  }

  closeModal(reload?: boolean): void {
    if (reload) {
      this.getDataFilterGiangVien(this.filterGiangVien);
    }
    this.nzModalSvc.closeAll();
  }

  pageChange(page: Paginate<GiangVien>): void {
    this.listGiangVien = page;
    this.getDataFilterGiangVien(this.filterGiangVien);
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
        this.giangVienSvc.deleteLectures(id)
          .subscribe(() => {
            this.spinner.hide();
            this.alert.success(this.langData[this.langCode].THAY_DOI_THANH_CONG);
            this.getDataFilterGiangVien(this.filterGiangVien);
          }, () => this.spinner.hide());
      }
    });
  }

  onChangeKhoa(idKhoa?: string): void {
    if (idKhoa) {
      this.filterKhoa = idKhoa;
      this.nganhSvc.getByIdKhoa(idKhoa)
        .subscribe(res => {
          this.listNganh = res;
        });
    } else {
      this.getListNganh();
    }
    this.filterNganh = null;
    this.filterGiangVien.nganh = '';
    // Get data
    this.filterGiangVien.khoa = idKhoa;
    this.getDataFilterGiangVien(this.filterGiangVien);
  }

  onChangeNganh(idNganh?: string): void {
    this.linhVucSvc.getLinhVucActive()
      .subscribe(res => {
        this.listLinhVuc = res;
      });
    this.filterGiangVien.nganh = idNganh;
    this.getDataFilterGiangVien(this.filterGiangVien);
  }

  onChangeLinhVuc(idLinhVuc?: string): void {
    this.filterGiangVien.linhVuc = idLinhVuc;
    this.getDataFilterGiangVien(this.filterGiangVien);
  }

  getListKhoa(searchValue?: string): void {
    this.khoaSvc.getAllPaging(0, 10, searchValue ?? '')
      .subscribe(res => {
        this.listKhoa = res.content.filter(x => x.trangThai);
      });
  }

  getListNganh(searchValue?: string): void {
    if (!this.filterKhoa || searchValue !== '') {
      this.nganhSvc.getAllPaging(0, 10, searchValue)
        .subscribe(res => {
          this.listNganh = res.content.filter(x => x.trangThai);
        });
    }
  }

  getListLinhVuc(searchValue?: string): void {
    this.linhVucSvc.getLinhVucActive(searchValue)
      .subscribe(res => {
        this.listLinhVuc = res.filter(x => x.trangThai);
      });
  }

}
