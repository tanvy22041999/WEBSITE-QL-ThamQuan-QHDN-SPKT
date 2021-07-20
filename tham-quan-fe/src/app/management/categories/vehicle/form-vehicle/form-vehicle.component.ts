import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { PhuongTien } from 'src/app/core/models/categories/phuong-tien.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';
import { PhuongTienService } from 'src/app/core/services/management/categories/phuong-tien.service';

@Component({
  selector: 'app-form-vehicle',
  templateUrl: './form-vehicle.component.html',
  styleUrls: ['./form-vehicle.component.scss']
})
export class FormVehicleComponent implements OnInit {

  // Ngon ngu hien thi //////////
  @Input() modalData: ModalData<PhuongTien>;
  @Input() countThuTu: number;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  form: FormGroup;
  isFieldValid = this.formValidatorSvc.isFieldValid;
  displayFieldCss = this.formValidatorSvc.displayFieldCss;
  color = '';

  constructor(
    private fb: FormBuilder,
    private phuongTienSvc: PhuongTienService,
    private formValidatorSvc: FormValidatorService,
    private alert: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      bienSo: ['', [Validators.required]],
      mauXe: ['', [Validators.required]],
      soChoNgoi: ['', [Validators.required]],
      tenXe: ['', [Validators.required]],
      trangThai: [true, [Validators.required]],
      soThuTu: [this.countThuTu ? this.countThuTu + 1 : 1, [Validators.required]],
    });

    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.color = this.modalData.data.mauXe;
      this.form.patchValue({
        bienSo: this.modalData.data.bienSo,
        mauXe: this.modalData.data.mauXe,
        soChoNgoi: this.modalData.data.soChoNgoi,
        tenXe: this.modalData.data.tenXe,
        soThuTu: this.modalData.data.soThuTu,
        trangThai: this.modalData.data.trangThai,
      });
    }
  }

  onCancel(): void {
    this.closeModal.emit(false);
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.spinner.show();
        this.phuongTienSvc.update(this.form.value, this.modalData.data.id)
          .subscribe(() => {
            this.closeModal.emit(true);
            this.alert.success(this.langData[this.langCode].CAP_NHAT_THANH_CONG);
          }, () => this.spinner.hide());
      } else {
        this.spinner.show();
        console.log(this.form.value);
        this.phuongTienSvc.create(this.form.value)
          .subscribe(() => {
            this.closeModal.emit(true);
            this.alert.success(this.langData[this.langCode].THEM_MOI_THANH_CONG);
          }, () => this.spinner.hide());
      }
    } else {
      this.formValidatorSvc.validateAllFormFields(this.form);
    }
  }

  onColorChange(color: string): void {
    this.form.get('mauXe').setValue(color);
  }

}
