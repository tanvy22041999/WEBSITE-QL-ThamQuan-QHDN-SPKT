import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ChuyenVien } from 'src/app/core/models/users/chuyen-vien.model';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';
import { ChuyenVienService } from 'src/app/core/services/management/users/chuyen-vien.service';
import { customEmailValidator } from 'src/app/core/validators/email.validator';

@Component({
  selector: 'app-form-expert',
  templateUrl: './form-expert.component.html',
  styleUrls: ['./form-expert.component.scss']
})
export class FormExpertComponent implements OnInit {

  @Input() modalData: ModalData<ChuyenVien>;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  form: FormGroup;

  passwordVisible = false;

  isFieldValid = this.formValidatorSvc.isFieldValid;
  displayFieldCss = this.formValidatorSvc.displayFieldCss;


  constructor(
    private fb: FormBuilder,
    private expertSvc: ChuyenVienService,
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
      password: [''],
    });
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        email: this.modalData.data.email,
        hoTen: this.modalData.data.hoTen,
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
        this.expertSvc.updateExpert(tmpFormValue, this.modalData.data.id)
          .subscribe(() => {
            this.closeModal.emit(true);
            this.alert.success(this.langData[this.langCode].CAP_NHAT_THANH_CONG);
            this.spinner.hide();
          }, () => this.spinner.hide());
      } else {
        this.spinner.show();
        this.expertSvc.createExpert(this.form.value)
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
