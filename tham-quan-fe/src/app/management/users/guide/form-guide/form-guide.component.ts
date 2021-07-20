import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { CongTacVien } from 'src/app/core/models/users/cong-tac-vien.model';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';
import { CongTacVienService } from 'src/app/core/services/management/users/cong-tac-vien.service';
import { customEmailValidator } from 'src/app/core/validators/email.validator';

@Component({
  selector: 'app-form-guide',
  templateUrl: './form-guide.component.html',
  styleUrls: ['./form-guide.component.scss']
})
export class FormGuideComponent implements OnInit {

  @Input() modalData: ModalData<CongTacVien>;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  form: FormGroup;

  isFieldValid = this.formValidatorSvc.isFieldValid;
  displayFieldCss = this.formValidatorSvc.displayFieldCss;


  passwordVisible = false;

  constructor(
    private fb: FormBuilder,
    private congTacVienSvc: CongTacVienService,
    private formValidatorSvc: FormValidatorService,
    private alert: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, customEmailValidator]],
      hoTen:	['', [Validators.required]],
      maSV: [''],
      password: [''],
    });
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        email: this.modalData.data.email,
        hoTen: this.modalData.data.hoTen,
        maSV: this.modalData.data.maSV,
        // password: this.modalData.data.password,
      });
    }
  }

  onCancel(): void {
    this.closeModal.emit(false);
  }

  onSubmit(): void {
    if (this.form.valid) {
      const tmpFormValue = this.form.value;
      if (!tmpFormValue.password){
        delete tmpFormValue.password;
      }
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.spinner.show();
        this.congTacVienSvc.updateCollaborator(tmpFormValue, this.modalData.data.id)
          .subscribe(() => {
            this.closeModal.emit(true);
            this.alert.success(this.langData[this.langCode].CAP_NHAT_THANH_CONG);
            this.spinner.hide();
          }, () => this.spinner.hide());
      } else {
        this.spinner.show();
        this.congTacVienSvc.createCollaborator(this.form.value)
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
