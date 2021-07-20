import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';

import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';
import { Khoa } from 'src/app/core/models/categories/khoa.model';
import { KhoaService } from 'src/app/core/services/management/categories/khoa.service';

@Component({
  selector: 'app-form-faculties',
  templateUrl: './form-faculties.component.html',
  styleUrls: ['./form-faculties.component.scss'],
})
export class FormFacultiesComponent implements OnInit {
  // Ngon ngu hien thi //////////
  @Input() modalData: ModalData<Khoa>;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  form: FormGroup;

  isFieldValid = this.formValidatorSvc.isFieldValid;
  displayFieldCss = this.formValidatorSvc.displayFieldCss;

  constructor(
    private fb: FormBuilder,
    private khoaSvc: KhoaService,
    private formValidatorSvc: FormValidatorService,
    private alert: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      thuTu: ['', [Validators.required, Validators.min(0)]],
      maKhoa: ['', [Validators.required]],
      tenKhoa: ['', [Validators.required]],
      tenKhoaEn: [''],
    });
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        thuTu: this.modalData.data.thuTu,
        maKhoa: this.modalData.data.maKhoa,
        tenKhoa: this.modalData.data.tenKhoa,
        tenKhoaEn: this.modalData.data.tenKhoaEn,
      });
    }
  }

  onCancel(): void {
    this.closeModal.emit(false);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.form.get('maKhoa').setValue(this.form.get('maKhoa').value.toUpperCase());
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.spinner.show();
        this.khoaSvc.update(this.form.value, this.modalData.data.id)
          .subscribe(() => {
            this.closeModal.emit(true);
            this.alert.success(this.langData[this.langCode].CAP_NHAT_THANH_CONG);
            this.spinner.hide();
          }, () => this.spinner.hide());
      } else {
        this.spinner.show();
        this.khoaSvc.create(this.form.value)
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
}
