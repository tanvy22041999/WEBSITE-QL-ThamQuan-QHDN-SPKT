import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';

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
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';


@Component({
  selector: 'app-form-tour-guide',
  templateUrl: './form-tour-guide.component.html',
  styleUrls: ['./form-tour-guide.component.scss']
})
export class FormTourGuideComponent implements OnInit {

  // Ngon ngu hien thi //////////
  @Input() modalData: ModalData<ChuyenThamQuan>;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() filter: string[];
  @Output() filterData: EventEmitter<string[]> = new EventEmitter<string[]>();

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




  constructor(
    private fb: FormBuilder,
    private formValidatorSvc: FormValidatorService,
    private fileSvc: FileService,

  ) { }

  ngOnInit(): void {
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
        danhSachSinhViens: this.modalData.data.danhSachSinhViens,
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


}
