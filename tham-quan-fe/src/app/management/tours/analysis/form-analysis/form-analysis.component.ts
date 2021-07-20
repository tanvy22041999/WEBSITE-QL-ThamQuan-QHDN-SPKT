import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
// import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { DoanhNghiep } from 'src/app/core/models/categories/doanh-nghiep.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ThongKe } from 'src/app/core/models/tours/thong-ke.model';
import { FileService } from 'src/app/core/services/common/file.service';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';
import { DoanhNghiepService } from 'src/app/core/services/management/categories/doanh-nghiep.service';


@Component({
  selector: 'app-form-analysis',
  templateUrl: './form-analysis.component.html',
  styleUrls: ['./form-analysis.component.scss']
})
export class FormAnalysisComponent implements OnInit {

  // Ngon ngu hien thi //////////
  @Input() modalData: ModalData<ThongKe>;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  // Upload file /////////////////////////////////////////
  setListIdFileToForm = this.fileSvc.setListIdFileToForm;
  setIdFileToForm = this.fileSvc.setIdFileToForm;
  extractFileFromListId = this.fileSvc.extractFileFromListId;
  // End Upload file //////////////////////////////////////


  form: FormGroup;
  date = null;
  isValid: boolean;
  listDoanhNghieps: DoanhNghiep[] = [];
  listCongTacVien: [];
  isFieldValid = this.formValidatorSvc.isFieldValid;
  displayFieldCss = this.formValidatorSvc.displayFieldCss;
  modalRef: NzModalRef;
  modalDataDoanhNghiep: ModalData<DoanhNghiep> = new ModalData<DoanhNghiep>();
  // @Output() closeModalDoanhNghiep: EventEmitter<boolean> = new EventEmitter<boolean>();
  searchDoanhNghiepChange = new Subject<string>();

  constructor(
    private fb: FormBuilder,
    // private thongKeSvc: ThongKeService,
    private formValidatorSvc: FormValidatorService,
    // private alert: ToastrService,
    private spinner: NgxSpinnerService,
    private fileSvc: FileService,
    private nzModalSvc: NzModalService,
    private doanhNghiepSvc: DoanhNghiepService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.searchDoanhNghiepChange.pipe(debounceTime(300))
      .subscribe(() => {
        this.getListDoanhNghiep();
      });
  }


  createForm(): void {
    this.form = this.fb.group({
      tenDN: ['', [Validators.required]],
      diaChi: ['', [Validators.required]],
      ngayThamQuan: ['', [Validators.required]],
      giangVien: ['', [Validators.required]],
      khoa: ['', [Validators.required]],
      soLuongSV: ['', [Validators.required]],
      soLuongGV: ['', [Validators.required]],
      congTacViens: [''],
      time: ['', [Validators.required]],
    });
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        tenDN: this.modalData.data.tenDN,
        diaChi: this.modalData.data.diaChi,
        ngayThamQuan: this.modalData.data.ngayThamQuan,
        giangVien: this.modalData.data.giangVien,
        khoa: this.modalData.data.khoa,
        soLuongGV: this.modalData.data.soLuongGV,
        soLuongSv: this.modalData.data.soLuongSV,
        congTacViens: this.modalData.data.congTacVien,
        time: this.modalData.data.time,
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
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.spinner.show();
        // this.thongKeSvc.update(this.form.value, this.modalData.data)
        //   .subscribe(() => {
        //     this.closeModal.emit(true);
        //     this.alert.success(this.langData[this.langCode].CAP_NHAT_THANH_CONG);
        //     this.spinner.hide();
        //   }, () => this.spinner.hide());
      } else {
        console.log(this.form.value);
        this.spinner.show();
        // this.thongKeSvc.create(this.form.value)
        //   .subscribe(() => {
        //     this.closeModal.emit(true);
        //     this.alert.success(this.langData[this.langCode].THEM_MOI_THANH_CONG);
        //     this.spinner.hide();
        //   }, () => this.spinner.hide());
      }
    } else {
      this.formValidatorSvc.validateAllFormFields(this.form);
    }
  }

  getListDoanhNghiep(): void {
    this.spinner.show();
    this.doanhNghiepSvc.getAll()
      .subscribe(res => {
        this.listDoanhNghieps = res;
        this.spinner.hide();
      }, () => this.spinner.hide());
    this.spinner.hide();
  }

  //Modal doanh nghiep
  openModal(template: TemplateRef<unknown>, data?: DoanhNghiep): void {
    if (data) {
      this.modalDataDoanhNghiep.action = SystemConstant.ACTION.EDIT;
      this.modalDataDoanhNghiep.data = data;
    } else {
      this.modalDataDoanhNghiep.action = SystemConstant.ACTION.ADD;
    }

    this.modalRef = this.nzModalSvc.create({
      nzStyle: { top: '20px' },
      nzWidth: 500,
      nzTitle: (data ? this.langData[this.langCode].CHINH_SUA_TITLE :
        this.langData[this.langCode].THEM_MOI_TITLE) + this.langData[this.langCode].DOANH_NGHIEP,
      nzContent: template,
      nzFooter: null,
      nzClosable: true,
      nzMaskClosable: false
    });
  }

  closeModalDoanhNghiep(): void {
    this.modalRef.destroy();
  }

}
