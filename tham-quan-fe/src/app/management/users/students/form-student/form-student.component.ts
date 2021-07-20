import { Subject } from 'rxjs';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { Nganh } from 'src/app/core/models/categories/nganh.model';

import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { SinhVien } from 'src/app/core/models/users/sinh-vien.model';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';
import { NganhService } from 'src/app/core/services/management/categories/nganh.service';
import { SinhVienService } from 'src/app/core/services/management/users/sinh-vien.service';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-form-student',
  templateUrl: './form-student.component.html',
  styleUrls: ['./form-student.component.scss']
})
export class FormStudentComponent implements OnInit {

  // Ngon ngu hien thi //////////
  @Input() modalData: ModalData<SinhVien>;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  form: FormGroup;
  showPassWord = false;
  showPassWordConfirm = false;
  isMatch = true;
  isEdit = false;

  isFieldValid = this.formValidatorSvc.isFieldValid;
  displayFieldCss = this.formValidatorSvc.displayFieldCss;
  listNganh: Nganh[] = [];

  searchNganhChange = new Subject<string>();

  constructor(
    private fb: FormBuilder,
    private sinhVienSvc: SinhVienService,
    private formValidatorSvc: FormValidatorService,
    private alert: ToastrService,
    private spinner: NgxSpinnerService,
    private nganhSvc: NganhService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.searchNganhChange.pipe(debounceTime(250))
      .subscribe(() => {
        this.getAllNganh();
      });
  }

  createForm(): void {
    this.form = this.fb.group({
      maSV: ['', [Validators.required, Validators.min(0)]],
      hoTen: ['', [Validators.required]],
      lop: ['', [Validators.required]],
      gioiTinh: ['', [Validators.required]],
      ngaySinh: ['', [Validators.required]],
      dienThoai: ['', [Validators.required]],
      nganh: ['', [Validators.required]],
      cmnd: ['', [Validators.required]],
      password: [''],
      passwordConfirm: [''],
    });
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.isEdit = true;
      this.listNganh.push(this.modalData.data?.nganh);
      this.form.patchValue({
        maSV: this.modalData.data.maSV,
        hoTen: this.modalData.data.hoTen,
        lop: this.modalData.data.lop,
        gioiTinh: this.modalData.data.gioiTinh,
        ngaySinh: this.modalData.data.ngaySinh,
        dienThoai: this.modalData.data.dienThoai,
        nganh: this.modalData.data.nganh.id,
        cmnd: this.modalData.data.cmnd,
        password: this.modalData.data.password,
        passwordConfirm: this.modalData.data.password,
      });
    }
  }

  onCancel(): void {
    this.closeModal.emit(false);
  }

  getAllNganh(): void {
    this.spinner.show();
    this.nganhSvc.getAll()
      .subscribe(res => {
        this.listNganh = res;
        this.spinner.hide();
      }, () => this.spinner.hide());
  }
  handleTime(date: Date) {
    return new Date(date).toISOString().substring(0, 10);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.form.get('ngaySinh').setValue(this.handleTime(this.form.get('ngaySinh').value));
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.spinner.show();
        this.sinhVienSvc.update(this.form.value, this.modalData.data.id)
          .subscribe(() => {
            this.closeModal.emit(true);
            this.alert.success(this.langData[this.langCode].CAP_NHAT_THANH_CONG);
            this.spinner.hide();
          }, () => this.spinner.hide());
      } else {
        this.spinner.show();
        this.sinhVienSvc.create(this.form.value)
          .subscribe(() => {
            this.closeModal.emit(true);
            this.alert.success(this.langData[this.langCode].THEM_MOI_THANH_CONG);
            this.spinner.hide();
          }, () => this.spinner.hide());
      }
    } else {
      this.formValidatorSvc.validateAllFormFields(this.form);
    }
  }


  toggleShowPassLogin(value): void {
    if (value === 'showPassWord') {
      this.showPassWord = !this.showPassWord;
    }
    if (value === 'showPassWordConfirm') {
      this.showPassWordConfirm = !this.showPassWordConfirm;
    }
  }

  matchPassword() {
    this.form.get('passwordConfirm').valueChanges.subscribe(data => this.isMatch = data === this.form.get('password').value);
    this.form.get('password').valueChanges.subscribe(data => this.isMatch = data === this.form.get('passwordConfirm').value);
  }


}
