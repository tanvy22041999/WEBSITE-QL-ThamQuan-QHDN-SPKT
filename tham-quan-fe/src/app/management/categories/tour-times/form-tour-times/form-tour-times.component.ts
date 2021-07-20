import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { DotThamQuan } from 'src/app/core/models/categories/dot-tham-quan.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';
import { DotThamQuanService } from 'src/app/core/services/management/categories/dot-tham-quan.service';



@Component({
  selector: 'app-form-tour-times',
  templateUrl: './form-tour-times.component.html',
  styleUrls: ['./form-tour-times.component.scss']
})
export class FormTourTimesComponent implements OnInit {

  // Ngon ngu hien thi //////////
  @Input() modalData: ModalData<DotThamQuan>;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  form: FormGroup;
  date = null;
  isValid: boolean;
  isFieldValid = this.formValidatorSvc.isFieldValid;
  displayFieldCss = this.formValidatorSvc.displayFieldCss;
  dateFormat = 'dd/MM/yyyy';
  constructor(
    private fb: FormBuilder,
    private dotThamQuanSvc: DotThamQuanService,
    private formValidatorSvc: FormValidatorService,
    private alert: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      tenDotThamQuan: ['', [Validators.required, Validators.min(0)]],
      namHoc: ['', [Validators.required]],
      hocKy: ['', [Validators.required]],
      tuNgay: ['', [Validators.required]],
      denNgay: ['', [Validators.required]],
      mucDich: ['', [Validators.required]],
      yeuCau: ['', [Validators.required]],
      noiDungThamQuan: ['', [Validators.required]],
    });
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        tenDotThamQuan: this.modalData.data.tenDotThamQuan,
        namHoc: this.modalData.data.namHoc,
        hocKy: this.modalData.data.hocKy,
        tuNgay: this.modalData.data.tuNgay,
        denNgay: this.modalData.data.denNgay,
        mucDich: this.modalData.data.mucDich,
        yeuCau: this.modalData.data.yeuCau,
        noiDungThamQuan: this.modalData.data.noiDungThamQuan,
      });
    }
  }

  onCancel(): void {
    this.closeModal.emit(false);
  }

  handleTime(date: Date) {
    return new Date(date).toISOString().substring(0, 10);
  }
  onSubmit(): void {
    if (this.form.valid) {
      this.form.get('tuNgay').setValue(this.handleTime(this.form.get('tuNgay').value));
      this.form.get('denNgay').setValue(this.handleTime(this.form.get('denNgay').value));
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.spinner.show();
        this.dotThamQuanSvc.update(this.form.value, this.modalData.data.id)
          .subscribe(() => {
            this.closeModal.emit(true);
            this.alert.success(this.langData[this.langCode].CAP_NHAT_THANH_CONG);
            this.spinner.hide();
          }, () => this.spinner.hide());
      } else {
        this.spinner.show();
        this.dotThamQuanSvc.create(this.form.value)
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
