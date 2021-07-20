import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { DiaDiem } from 'src/app/core/models/categories/dia-diem.model';
import { DoanhNghiep } from 'src/app/core/models/categories/doanh-nghiep.model';
import { DotThamQuan } from 'src/app/core/models/categories/dot-tham-quan.model';
import { PhuongTien } from 'src/app/core/models/categories/phuong-tien.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ChuyenThamQuan } from 'src/app/core/models/main/chuyen-tham-quan.model';
import { CongTacVienDanDoan } from 'src/app/core/models/main/cong-tac-vien-dan-doan.model';
import { GiangVien } from 'src/app/core/models/users/giang-vien.model';
import { FileService } from 'src/app/core/services/common/file.service';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';
import { DiaDiemService } from 'src/app/core/services/management/categories/dia-diem.service';
import { DoanhNghiepService } from 'src/app/core/services/management/categories/doanh-nghiep.service';
import { DotThamQuanService } from 'src/app/core/services/management/categories/dot-tham-quan.service';
import { PhuongTienService } from 'src/app/core/services/management/categories/phuong-tien.service';
import { ChuyenThamQuanService } from 'src/app/core/services/management/tours/chuyen-tham-quan.service';
import { ManagementLecturesService } from 'src/app/core/services/management/users/management-lectures.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-form-tour',
  templateUrl: './form-tour.component.html',
  styleUrls: ['./form-tour.component.scss']
})
export class FormTourComponent implements OnInit {

  // Ngon ngu hien thi //////////
  @Input() modalData: ModalData<ChuyenThamQuan>;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() trangThai: boolean;

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

  currentUserId = '';
  currentUser: GiangVien = new GiangVien();


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
    private diaDiemSvc: DiaDiemService,
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
    console.log(this.trangThai);
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
      giangVienDangKy: [''],
      lyDoKhongDuyet: [''],
    });
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.isEdit = this.trangThai;
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

  getCurrentUser(): void {
    this.giangVienSvc.getCurrentLecture()
      .subscribe((res) => {
        this.currentUser = res;
      })
  }

  onSave(): void {
    this.getCurrentUser();
    if (this.form.valid) {
      this.form.get('thoiGianKhoiHanh').setValue(this.handleTime(this.form.get('thoiGianKhoiHanh').value));
      this.form.get('thoiGianBatDauThamQuan').setValue(this.handleTime(this.form.get('thoiGianBatDauThamQuan').value));
      this.form.get('thoiGianKetThucThamQuan').setValue(this.handleTime(this.form.get('thoiGianKetThucThamQuan').value));
      this.form.get('giangVienDangKy').setValue(this.currentUser.id);
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.spinner.show();
        this.chuyenThamQuanSvc.update(this.form.value, this.modalData.data.id)
          .subscribe(() => {
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

}
