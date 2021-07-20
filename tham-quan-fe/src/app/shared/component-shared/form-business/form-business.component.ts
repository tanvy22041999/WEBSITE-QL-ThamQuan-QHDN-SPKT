import { Subject } from 'rxjs';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { DoanhNghiep } from 'src/app/core/models/categories/doanh-nghiep.model';
import { LinhVuc } from 'src/app/core/models/categories/linh-vuc.model';

import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';

import { DoanhNghiepService } from 'src/app/core/services/management/categories/doanh-nghiep.service';
import { LinhVucService } from 'src/app/core/services/management/categories/linh-vuc.service';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-form-business',
  templateUrl: './form-business.component.html',
  styleUrls: ['./form-business.component.scss']
})
export class FormBusinessComponent implements OnInit {

  // Ngon ngu hien thi //////////
  @Input() modalData: ModalData<DoanhNghiep>;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() isFullData: boolean;


  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  form: FormGroup;
  listLinhVucs: LinhVuc[] = [];
  listRoles = [
    { name: this.langData[this.langCode].QUYEN_QUAN_TRI, role: 'ROLE_ADMIN' },
    { name: this.langData[this.langCode].QUYEN_DOANH_NGHIEP, role: 'ROLE_DOANH_NGHIEP' },
    { name: this.langData[this.langCode].QUYEN_CONG_TAC_VIEN, role: 'ROLE_CONG_TAC_VIEN' },
  ];
  isFieldValid = this.formValidatorSvc.isFieldValid;
  displayFieldCss = this.formValidatorSvc.displayFieldCss;
  searchLinhVucChange = new Subject<string>();

  constructor(
    private fb: FormBuilder,
    private doanhNghiepSvc: DoanhNghiepService,
    private linhVucSvc: LinhVucService,
    // private taiKhoanSvc: TaiKhoanService,
    private formValidatorSvc: FormValidatorService,
    private alert: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.searchLinhVucChange.pipe(debounceTime(250))
      .subscribe(() => {
        this.getListLinhVuc();
      });
  }

  createForm(): void {
    this.form = this.fb.group({
      congTy: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      hoTen: ['', [Validators.required]],
      gioiTinh: ['', [Validators.required]],
      dienThoai: ['', [Validators.required]],
      diaChi: ['', [Validators.required]],
      maSoThue: ['', [Validators.required]],
      linhVucs: [[], [Validators.required]],
      roles: [[], [Validators.required]],
    });
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.listLinhVucs = [...this.modalData.data.linhVucs];
      this.form.patchValue({
        congTy: this.modalData.data.congTy,
        email: this.modalData.data.email,
        hoTen: this.modalData.data.hoTen,
        gioiTinh: this.modalData.data.gioiTinh,
        dienThoai: this.modalData.data.dienThoai,
        diaChi: this.modalData.data.diaChi,
        maSoThue: this.modalData.data.maSoThue,
        linhVucs: this.modalData.data.linhVucs.map(linhVuc => linhVuc.id),
        roles: this.modalData.data.roles.map(role => role),
      });
    }
  }

  getListLinhVuc(): void {
    this.linhVucSvc.getAll()
      .subscribe(res => {
        this.listLinhVucs = res;
      });
  }


  onCancel(): void {
    this.closeModal.emit(false);
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.spinner.show();
        this.doanhNghiepSvc.update(this.form.value, this.modalData.data.id)
          .subscribe(() => {
            this.closeModal.emit(true);
            this.alert.success(this.langData[this.langCode].CAP_NHAT_THANH_CONG);
            this.spinner.hide();
          }, () => this.spinner.hide());
      } else {
        this.spinner.show();
        this.doanhNghiepSvc.create(this.form.value)
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

