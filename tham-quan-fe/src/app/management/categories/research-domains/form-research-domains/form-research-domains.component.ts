import { NgxSpinnerService } from 'ngx-spinner';
import { LinhVucService } from './../../../../core/services/management/categories/linh-vuc.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { LinhVuc } from 'src/app/core/models/categories/linh-vuc.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';
import { ToastrService } from 'ngx-toastr';
import { SystemConstant } from 'src/app/core/constants/system.constant';

@Component({
  selector: 'app-form-research-domains',
  templateUrl: './form-research-domains.component.html',
  styleUrls: ['./form-research-domains.component.scss']
})
export class FormResearchDomainsComponent implements OnInit {

  @Input() modalData: ModalData<LinhVuc>;
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
    private linhVucSvc: LinhVucService,
    private formValidatorSvc: FormValidatorService,
    private alert: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      tenLinhVuc: ['', [Validators.required]],
      tenLinhVucEn: [''],
      maLinhVuc: ['', [Validators.required]],
    });
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        tenLinhVuc: this.modalData.data.tenLinhVuc,
        tenLinhVucEn: this.modalData.data.tenLinhVucEn,
        maLinhVuc: this.modalData.data.maLinhVuc,
      });
    }
  }
  onCancel() {
    this.closeModal.emit(false);
  }
  onSubmit() {
    if (this.form.valid) {
      this.form.get('maLinhVuc').setValue(this.form.get('maLinhVuc').value.toUpperCase());
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.spinner.show();
        this.linhVucSvc.update(this.form.value, this.modalData.data.id)
          .subscribe(() => {
            this.closeModal.emit(true);
            this.alert.success(this.langData[this.langCode].CAP_NHAT_THANH_CONG);
            this.spinner.hide();
          }, () => this.spinner.hide());
      } else {
        this.spinner.show();
        this.linhVucSvc.create(this.form.value)
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
