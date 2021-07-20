import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';
import { DiaDiem } from '../../../../core/models/categories/dia-diem.model';
import { GiangVien } from 'src/app/core/models/users/giang-vien.model';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { DoanhNghiep } from 'src/app/core/models/categories/doanh-nghiep.model';
import { DotThamQuan } from 'src/app/core/models/categories/dot-tham-quan.model';
import { PhuongTien } from 'src/app/core/models/categories/phuong-tien.model';

import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { FileService } from 'src/app/core/services/common/file.service';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';
import { DoanhNghiepService } from 'src/app/core/services/management/categories/doanh-nghiep.service';
import { DotThamQuanService } from 'src/app/core/services/management/categories/dot-tham-quan.service';
import { PhuongTienService } from 'src/app/core/services/management/categories/phuong-tien.service';
import { ChuyenThamQuanService } from 'src/app/core/services/management/tours/chuyen-tham-quan.service';
import { ManagementLecturesService } from 'src/app/core/services/management/users/management-lectures.service';
import { DiaDiemService } from 'src/app/core/services/management/categories/dia-diem.service';
import { ChuyenThamQuan, LuuTruHoSo } from 'src/app/core/models/main/chuyen-tham-quan.model';
import { CongTacVienDanDoan } from 'src/app/core/models/main/cong-tac-vien-dan-doan.model';

@Component({
  selector: 'app-form-tours',
  templateUrl: './form-tours.component.html',
  styleUrls: ['./form-tours.component.scss']
})
export class FormToursComponent implements OnInit {

  // Ngon ngu hien thi //////////
  @Input() modalData: ModalData<ChuyenThamQuan>;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() filter: string[];
  @Output() filterData: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() chuyenMoi: EventEmitter<boolean> = new EventEmitter<boolean>();

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  // Upload file /////////////////////////////////////////
  setListIdFileToForm = this.fileSvc.setListIdFileToForm;
  setIdFileToForm = this.fileSvc.setIdFileToForm;
  extractFileFromListId = this.fileSvc.extractFileFromListId;
  // End Upload file //////////////////////////////////////


  form: FormGroup;
  date = null;
  isEdit = false;
  luuTruHoSo: LuuTruHoSo = new LuuTruHoSo();

  listPhuongTien: PhuongTien[] = [];
  listDoanhNghiep: DoanhNghiep[] = [];
  listDotThamQuan: Paginate<DotThamQuan> = new Paginate<DotThamQuan>();
  listCongTacVien: CongTacVienDanDoan[] = [];
  listGiangVien: GiangVien[] = [];
  listDiaDiem: DiaDiem[] = [];

  isFieldValid = this.formValidatorSvc.isFieldValid;
  displayFieldCss = this.formValidatorSvc.displayFieldCss;
  modalRef: NzModalRef;
  modalDataDoanhNghiep: ModalData<DoanhNghiep> = new ModalData<DoanhNghiep>();
  // @Output() closeModalDoanhNghiep: EventEmitter<boolean> = new EventEmitter<boolean>();

  searchDoanhNghiepChange = new Subject<string>();
  searchPhuongTienChange = new Subject<string>();
  searchGiangVienChange = new Subject<string>();
  searchCongTacVienChange = new Subject<string>();
  searchDiaDiemChange = new Subject<string>();

  filterDangXuLy = [SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN.GIANG_VIEN_CHUA_CO_CONG_TY,
  SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN.GIANG_VIEN_DA_CHON_CONG_TY,
  SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN.DA_LIEN_HE_CONG_TY];


  constructor(
    private fb: FormBuilder,
    private chuyenThamQuanSvc: ChuyenThamQuanService,
    private formValidatorSvc: FormValidatorService,
    private alert: ToastrService,
    private spinner: NgxSpinnerService,
    private fileSvc: FileService,
    private nzModalSvc: NzModalService,
    private doanhNghiepSvc: DoanhNghiepService,
    private phuongTienSvc: PhuongTienService,
    private dotThamQuanSvc: DotThamQuanService,
    private giangVienSvc: ManagementLecturesService,
    private diaDiemSvc: DiaDiemService
  ) { }

  ngOnInit(): void {
    this.getDotThamQuan();
    this.searchDoanhNghiepChange.pipe(debounceTime(300))
      .subscribe(() => {
        this.getListDoanhNghiep();
      });
    this.searchPhuongTienChange.pipe(debounceTime(300))
      .subscribe(() => {
        this.getListPhuongTien();
      });
    this.searchGiangVienChange.pipe(debounceTime(300))
      .subscribe(() => {
        this.getListGiangVien();
      });
    this.searchDiaDiemChange.pipe(debounceTime(300))
      .subscribe(() => {
        this.getListDiaDiem();
      });
    this.createForm();
  }

  createForm(): void {
    this.isEdit = false;
    this.form = this.fb.group({
      tenChuyenThamQuan: ['', [Validators.required]],
      noiDungThamQuan: [''],
      thoiGianKhoiHanh: ['', [Validators.required]],
      diaDiemKhoiHanh: ['', [Validators.required]],
      phuongTien: [[]],
      dotThamQuan: [''],
      doanhNghiep: [''],
      thoiGianBatDauThamQuan: ['', [Validators.required]],
      thoiGianKetThucThamQuan: ['', [Validators.required]],
      danhSachSinhViens: [[]],
      congTacViens: [[]],
      phuCapCongTacVien: [''],
      kinhPhi: ['', [Validators.required]],
      thueXeNgoaiTruong: [''],
      giangVienDangKy: ['', [Validators.required]],
      fileXacNhanDuyetTuBanGiamHieu: [''],
      fileScanGiayXacNhanDoanhNghiep: [''],
      fileScanKeHoach: [''],
      duongDan: [''],
      lyDoKhongDuyet: [''],
    });
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.isEdit = true;
      this.listDoanhNghiep.push(this.modalData.data?.doanhNghiep);
      this.listDotThamQuan.data.push(this.modalData.data?.dotThamQuan);
      if (this.modalData.data.phuongTien) {
        this.listPhuongTien = [...this.modalData.data?.phuongTien];
      }
      if (this.modalData.data.congTacViens) {
        this.listCongTacVien = [...this.modalData.data?.congTacViens];
      }
      this.listDiaDiem.push(this.modalData.data?.diaDiemKhoiHanh);
      this.listGiangVien.push(this.modalData.data?.giangVienDangKy);
      this.form.patchValue({
        tenChuyenThamQuan: this.modalData.data.tenChuyenThamQuan,
        noiDungThamQuan: this.modalData.data.noiDungThamQuan,
        thoiGianKhoiHanh: this.modalData.data.thoiGianKhoiHanh,
        diaDiemKhoiHanh: this.modalData.data.diaDiemKhoiHanh.id,
        phuongTien: this.modalData.data.phuongTien?.map(pt => pt.id),
        dotThamQuan: this.modalData.data.dotThamQuan?.id,
        doanhNghiep: this.modalData.data.doanhNghiep?.id,
        thoiGianBatDauThamQuan: this.modalData.data.thoiGianBatDauThamQuan,
        thoiGianKetThucThamQuan: this.modalData.data.thoiGianKetThucThamQuan,
        danhSachSinhViens: this.modalData.data?.danhSachSinhViens.map(sv => sv.sinhVien.id),
        congTacViens: this.modalData.data.congTacViens?.map(ctv => ctv.congTacVien.id),
        phuCapCongTacVien: this.modalData.data.phuCapCongTacVien,
        kinhPhi: this.modalData.data.kinhPhi,
        giangVienDangKy: this.modalData.data.giangVienDangKy.id,
        fileXacNhanDuyetTuBanGiamHieu: this.modalData.data?.fileXacNhanDuyetTuBanGiamHieu,
        fileScanGiayXacNhanDoanhNghiep: this.modalData.data?.fileScanGiayXacNhanDoanhNghiep,
        fileScanKeHoach: this.modalData.data?.fileScanKeHoach,
        duongDan: this.modalData.data?.duongDan,
        thueXeNgoaiTruong: this.modalData.data.thueXeNgoaiTruong,
      });
    }
  }



  onCancel(): void {
    this.closeModal.emit(false);
  }

  handleTime(date: Date) {
    return new Date(date).toISOString();
  }

  onLuuDuyet(): void {
    if (this.form.valid) {
      this.form.get('thoiGianKhoiHanh').setValue(this.handleTime(this.form.get('thoiGianKhoiHanh').value));
      this.form.get('thoiGianBatDauThamQuan').setValue(this.handleTime(this.form.get('thoiGianBatDauThamQuan').value));
      this.form.get('thoiGianKetThucThamQuan').setValue(this.handleTime(this.form.get('thoiGianKetThucThamQuan').value));

      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.spinner.show();
        this.chuyenThamQuanSvc.update(this.form.value, this.modalData.data.id)
          .subscribe((res) => {
            this.onUpdateTrangThai(res.id, SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN.DANG_XU_LY);
          }, () => this.spinner.hide());
      } else {
        this.spinner.show();
        this.chuyenThamQuanSvc.create(this.form.value)
          .subscribe((res) => {
            this.onUpdateTrangThai(res.id, SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN.DANG_XU_LY);
          }, () => this.spinner.hide());
      }
    } else {
      this.formValidatorSvc.validateAllFormFields(this.form);
    }
  }

  onSave(): void {
    if (this.form.valid) {
      this.form.get('thoiGianKhoiHanh').setValue(this.handleTime(this.form.get('thoiGianKhoiHanh').value));
      this.form.get('thoiGianBatDauThamQuan').setValue(this.handleTime(this.form.get('thoiGianBatDauThamQuan').value));
      this.form.get('thoiGianKetThucThamQuan').setValue(this.handleTime(this.form.get('thoiGianKetThucThamQuan').value));
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.spinner.show();
        this.chuyenThamQuanSvc.update(this.form.value, this.modalData.data.id)
          .subscribe(() => {
            this.chuyenMoi.emit(!this.modalData.data.dotThamQuan);
            this.closeModal.emit(true);
            this.alert.success(this.langData[this.langCode].CAP_NHAT_THANH_CONG);
            this.spinner.hide();
          }, () => this.spinner.hide());
      } else {
        this.spinner.show();
        this.chuyenThamQuanSvc.create(this.form.value)
          .subscribe(() => {
            this.closeModal.emit(true);
            this.alert.success(this.langData[this.langCode].CAP_NHAT_THANH_CONG);
            this.spinner.hide();
          }, () => this.spinner.hide());
      }
    } else {
      this.formValidatorSvc.validateAllFormFields(this.form);
    }
  }

  onUpdateTrangThai(id: string, trangThai: string): void {
    this.spinner.show();
    this.chuyenThamQuanSvc.updateTrangThaiChuyenThamQuan(id, trangThai)
      .subscribe(() => {
        this.chuyenThamQuanSvc.sendMailUpdateTrangThai(id).subscribe();

        this.filterData.emit(this.filterDangXuLy);
        this.closeModal.emit(true);
        this.alert.success(this.langData[this.langCode].CAP_NHAT_THANH_CONG);
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  onKhongDuyet(): void {
    if (this.form.valid) {
      this.spinner.show();
      this.chuyenThamQuanSvc.updateTrangThaiChuyenThamQuan(this.modalData.data.id, SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN.HUY)
        .subscribe(() => {
          this.chuyenThamQuanSvc.sendMailUpdateTrangThai(this.modalData.data.id, this.form.get('lyDoKhongDuyet').value).subscribe();
          this.chuyenMoi.emit(!this.modalData.data.dotThamQuan);
          this.closeModal.emit(true);
          this.alert.success(this.langData[this.langCode].CAP_NHAT_THANH_CONG);
          this.spinner.hide();
        }, () => this.spinner.hide());
    } else {
      this.formValidatorSvc.validateAllFormFields(this.form);
    }

  }

  getListDoanhNghiep(): void {
    this.spinner.show();
    this.doanhNghiepSvc.getAll()
      .subscribe(res => {
        this.listDoanhNghiep = res;
        this.spinner.hide();
      }, () => this.spinner.hide());
  }


  getListPhuongTien(): void {
    this.spinner.show();
    this.phuongTienSvc.getAll()
      .subscribe(res => {
        this.listPhuongTien = res;
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  getDotThamQuan(): void {
    this.spinner.show();
    this.dotThamQuanSvc.getAll()
      .subscribe(res => {
        this.listDotThamQuan.data = res.content;
        this.spinner.hide();
      }, () => this.spinner.hide());

  }

  getListCongTacVien(): void {
    this.spinner.show();
    this.chuyenThamQuanSvc.getListCTVDangKy(this.modalData.data.id)
      .subscribe(res => {
        this.listCongTacVien = res;
        this.spinner.hide();
      }, () => this.spinner.hide());
    this.spinner.hide();
  }

  getListGiangVien(): void {
    this.spinner.show();
    this.giangVienSvc.getAll()
      .subscribe(res => {
        this.listGiangVien = res;
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  getListDiaDiem(): void {
    this.spinner.show();
    this.diaDiemSvc.getAll()
      .subscribe(res => {
        this.listDiaDiem = res;
        this.spinner.hide();
      }, () => this.spinner.hide());
  }



  //Modal doanh nghiep
  openModal(template: TemplateRef<unknown>, data?: DoanhNghiep): void {
    if (data) {
      this.modalDataDoanhNghiep.action = SystemConstant.ACTION.EDIT;
      this.modalDataDoanhNghiep.data = data;
    } else {
      this.modalDataDoanhNghiep.action = SystemConstant.ACTION.ADD;
    }

    this.modalRef = this.nzModalSvc.create({
      nzStyle: { top: '20px' },
      nzWidth: 500,
      nzTitle: (data ? this.langData[this.langCode].CHINH_SUA_TITLE :
        this.langData[this.langCode].THEM_MOI_TITLE) + this.langData[this.langCode].DOANH_NGHIEP,
      nzContent: template,
      nzFooter: null,
      nzClosable: true,
      nzMaskClosable: false
    });
  }

  closeModalDoanhNghiep(): void {
    this.modalRef.destroy();
    this.getListDoanhNghiep();
  }


  openModalLyDo(template: TemplateRef<unknown>): void {
    this.nzModalSvc.create({
      nzStyle: { top: '20px' },
      nzWidth: 400,
      nzTitle: this.langData[this.langCode].CAP_NHAT_LY_DO_KHONG_DUYET,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false
    });
  }

  openModalSaoLuu(template: TemplateRef<unknown>): void {
    this.nzModalSvc.create({
      nzStyle: { top: '20px' },
      nzWidth: 500,
      nzTitle: this.langData[this.langCode].CAP_NHAT_THONG_TIN_SAO_LUU,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false
    });
  }

  onLuuTru() {
    this.spinner.show();
    this.luuTruHoSo.duongDan = this.form.get('duongDan').value;
    this.luuTruHoSo.fileKeHoach = this.form.get('fileScanKeHoach').value;
    this.luuTruHoSo.fileXacNhan = this.form.get('fileScanGiayXacNhanDoanhNghiep').value;
    this.chuyenThamQuanSvc.saoLuuChuyen(this.luuTruHoSo, this.modalData.data.id)
      .subscribe(() => {
        this.closeModal.emit(true);
        this.alert.success(this.langData[this.langCode].CAP_NHAT_THANH_CONG);
        this.spinner.hide();
      })
  }

  checkFilterData(filterData: string) {
    return this.filter.includes(filterData) && !!this.filter;
  }


}
