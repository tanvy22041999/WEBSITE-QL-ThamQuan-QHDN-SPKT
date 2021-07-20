import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { CauHoiKhaoSatSinhVien } from 'src/app/core/models/categories/cau-hoi-khao-sat-sinh-vien';
import Editor from 'src/assets/libs/ckeditor5/build/ckeditor';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';
import { CauHoiKhaoSatSinhVienService } from 'src/app/core/services/management/categories/cau-hoi-khao-sat-sinh-vien.service';

@Component({
  selector: 'app-form-questions-student',
  templateUrl: './form-questions-student.component.html',
  styleUrls: ['./form-questions-student.component.scss']
})
export class FormQuestionsStudentComponent implements OnInit {

  @Input() modalData: ModalData<CauHoiKhaoSatSinhVien>;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() thuTu: number;


  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  form: FormGroup;
  isShowSoLuaChon = false;
  isShowNhapLuaChon = false;
  isShowEditor = false;


  listLoaiCauHoi = [
    { key: this.langData[this.langCode].CHON_MOT, value: 'CHON_MOT' },
    { key: this.langData[this.langCode].CHON_NHIEU, value: 'CHON_NHIEU' },
    { key: this.langData[this.langCode].SAP_XEP, value: 'SAP_XEP' },
    { key: this.langData[this.langCode].NHAP_LIEU, value: 'NHAP_LIEU' },
  ];


  cfgEditor = SystemConstant.CkEditorCfg;
  editor = Editor;
  isFieldValid = this.formValidatorSvc.isFieldValid;
  displayFieldCss = this.formValidatorSvc.displayFieldCss;
  listLuaChonTemp: { id: number; data: string }[] = [];


  constructor(
    private fb: FormBuilder,
    private cauHoiSvc: CauHoiKhaoSatSinhVienService,
    private formValidatorSvc: FormValidatorService,
    private alert: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    setTimeout(() => {
      this.isShowEditor = true;
    }, 150);
  }

  createForm(): void {
    this.form = this.fb.group({
      cauHoi: ['', [Validators.required]],
      loaiCauHoi: ['', [Validators.required]],
      luaChonToiDa: [1, [Validators.required, Validators.min(1)]],
      danhSachLuaChon: [[]],
      thuTu: [this.thuTu || 1, [Validators.required, Validators.min(1)]],
      cauHoiBatBuoc: [true]
    });
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.listLuaChonTemp = [...this.modalData.data.danhSachLuaChon.map(x => ({ id: Math.random() * 1000000, data: x }))]
      this.form.patchValue({
        cauHoi: this.modalData.data.cauHoi,
        loaiCauHoi: this.modalData.data.loaiCauHoi,
        luaChonToiDa: this.modalData.data.luaChonToiDa,
        danhSachLuaChon: this.modalData.data.danhSachLuaChon || [],
        thuTu: this.modalData.data.thuTu || 1,
        cauHoiBatBuoc: this.modalData.data.cauHoiBatBuoc || false
      });
      this.openQuestion(this.modalData.data.loaiCauHoi)
    }
  }

  onCancel(): void {
    this.closeModal.emit(false);
  }

  onSubmit(): void {
    this.listLuaChonTemp = [...this.listLuaChonTemp.filter(x => x.data)];
    const listTemp = this.listLuaChonTemp.map(x => x.data);
    if (this.form.valid) {
      if (this.isShowNhapLuaChon) {
        this.form.get('danhSachLuaChon').setValue(listTemp);
      }
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.spinner.show();
        this.cauHoiSvc.update(this.form.value, this.modalData.data.id)
          .subscribe(() => {
            this.closeModal.emit(true);
            this.alert.success(this.langData[this.langCode].CAP_NHAT_THANH_CONG);
            this.spinner.hide();
          }, () => this.spinner.hide());
      } else {
        this.spinner.show();
        this.cauHoiSvc.create(this.form.value)
          .subscribe((res) => {
            console.log(res);
            this.closeModal.emit(true);
            this.alert.success(this.langData[this.langCode].THEM_MOI_THANH_CONG);
            this.spinner.hide();
          }, () => this.spinner.hide());
      }
    } else {
      this.formValidatorSvc.validateAllFormFields(this.form);
    }
  }

  openQuestion(loaiLuaChon?: string) {

    switch (loaiLuaChon) {
      case 'NHAP_LIEU':
        this.isShowEditor = true;
        this.isShowNhapLuaChon = false;
        this.isShowSoLuaChon = false;
        this.form.get('luaChonToiDa').setValidators(null);
        this.form.get('luaChonToiDa').updateValueAndValidity();
        break;
      case 'CHON_NHIEU':
        this.isShowNhapLuaChon = true;
        this.isShowSoLuaChon = true;
        this.isShowEditor = false;
        this.form.get('luaChonToiDa').setValidators([Validators.required, Validators.min(1)]);
        this.form.get('luaChonToiDa').updateValueAndValidity();
        break;
      case 'CHON_MOT':
        this.isShowNhapLuaChon = true;
        this.isShowSoLuaChon = false;
        this.isShowEditor = false;
        this.form.get('luaChonToiDa').setValidators([Validators.required, Validators.min(1)]);
        this.form.get('luaChonToiDa').updateValueAndValidity();
        break;
      case 'SAP_XEP':
        this.isShowNhapLuaChon = true;
        this.isShowSoLuaChon = false;
        this.isShowEditor = false;
        this.form.get('luaChonToiDa').setValidators(null);
        this.form.get('luaChonToiDa').updateValueAndValidity();
        break;
      default:
        this.isShowNhapLuaChon = false;
        this.isShowSoLuaChon = false;
        this.isShowEditor = false;
        this.form.get('luaChonToiDa').setValidators(null);
        this.form.get('luaChonToiDa').updateValueAndValidity();
        break;
    }
  }


  them(): void {
    this.listLuaChonTemp.push({ id: Math.random() * 1000000, data: '' });
    this.listLuaChonTemp = [...this.listLuaChonTemp];
  }

  xoa(index: number): void {
    this.listLuaChonTemp.splice(index, 1);
    this.listLuaChonTemp = [...this.listLuaChonTemp];
  }


}
