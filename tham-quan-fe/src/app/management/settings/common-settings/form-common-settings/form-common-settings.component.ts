import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { CommonSettings } from 'src/app/core/models/setting/common-settings.model';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';
import { CommonSettingsService } from 'src/app/core/services/management/setting/common-settings.service';


@Component({
  selector: 'app-form-common-settings',
  templateUrl: './form-common-settings.component.html',
  styleUrls: ['./form-common-settings.component.scss']
})
export class FormCommonSettingsComponent implements OnInit {

  // Ngon ngu hien thi //////////
  @Input() modalData: ModalData<CommonSettings>;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  form: FormGroup;
  showPassWord = false;
  showPassWordConfirm = false;
  isMatch = true;
  isFieldValid = this.formValidatorSvc.isFieldValid;
  displayFieldCss = this.formValidatorSvc.displayFieldCss;

  constructor(
    private fb: FormBuilder,
    private senderEmailSvc: CommonSettingsService,
    private formValidatorSvc: FormValidatorService,
    private alert: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      emailGuiThu: ['', [Validators.required, Validators.email]],
      emailNhanThu: ['', [Validators.required, Validators.email]],
      passwordEmailGuiThu: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      phuCapCongTacVien: ['', [Validators.required, Validators.min(0)]],

    });
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        emailGuiThu: this.modalData.data.emailGuiThu,
        emailNhanThu: this.modalData.data.emailNhanThu,
        passwordEmailGuiThu: this.modalData.data.passwordEmailGuiThu,
        confirmPassword: this.modalData.data.passwordEmailGuiThu,
        phuCapCongTacVien: this.modalData.data.phuCapCongTacVien,

      });
    }

    this.matchPassword();
  }

  onCancel(): void {
    this.closeModal.emit(false);
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.spinner.show();
        this.senderEmailSvc.update(this.form.value, this.modalData.data.id)
          .subscribe(() => {
            this.closeModal.emit(true);
            this.alert.success(this.langData[this.langCode].CAP_NHAT_THANH_CONG);
            this.spinner.hide();
          }, () => this.spinner.hide());
      } else {
        this.spinner.show();
        this.senderEmailSvc.create(this.form.value)
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
    this.form.get('confirmPassword').valueChanges.subscribe(data => this.isMatch = data === this.form.get('passwordEmailGuiThu').value);
    this.form.get('passwordEmailGuiThu').valueChanges.subscribe(data => this.isMatch = data === this.form.get('confirmPassword').value);
  }

}
