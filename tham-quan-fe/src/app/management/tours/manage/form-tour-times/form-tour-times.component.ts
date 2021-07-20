import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { DotThamQuan } from 'src/app/core/models/categories/dot-tham-quan.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';
import { ChuyenThamQuanService } from 'src/app/core/services/management/tours/chuyen-tham-quan.service';



@Component({
  selector: 'app-form-tour-times',
  templateUrl: './form-tour-times.component.html',
  styleUrls: ['./form-tour-times.component.scss']
})
export class FormTourTimesComponent implements OnInit {

  // Ngon ngu hien thi //////////
  @Input() modalData: ModalData<DotThamQuan>;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() listTourId: string[];

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
    private chuyenThamQuanSvc: ChuyenThamQuanService,
    private formValidatorSvc: FormValidatorService,
    private alert: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      dotThamQuan: this.fb.group({
        tenDotThamQuan: ['', [Validators.required, Validators.min(0)]],
        namHoc: ['', [Validators.required]],
        hocKy: ['', [Validators.required]],
        tuNgay: ['', [Validators.required]],
        denNgay: ['', [Validators.required]],
        mucDich: ['', [Validators.required]],
        yeuCau: ['', [Validators.required]],
        noiDungThamQuan: ['', [Validators.required]],
      }),
      chuyenThamQuans: [[]],
    });
  }

  onCancel(): void {
    this.closeModal.emit(false);
  }

  handleTime(date: Date) {
    return new Date(date).toISOString().substring(0, 10);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.form.get('dotThamQuan.tuNgay').setValue(this.handleTime(this.form.get('dotThamQuan.tuNgay').value));
      this.form.get('dotThamQuan.denNgay').setValue(this.handleTime(this.form.get('dotThamQuan.denNgay').value));
      this.form.get('chuyenThamQuans').setValue(this.listTourId);
      this.spinner.show();
      console.log(this.form.value);
      this.chuyenThamQuanSvc.createDotChoListTour(this.form.value)
        .subscribe((res) => {
          console.log(res);
          this.closeModal.emit(true);
          this.alert.success(this.langData[this.langCode].THEM_MOI_THANH_CONG);
          this.spinner.hide();
        }, () => this.spinner.hide());
    } else {

      this.formValidatorSvc.validateAllFormFields(this.form);
    }
  }
}
