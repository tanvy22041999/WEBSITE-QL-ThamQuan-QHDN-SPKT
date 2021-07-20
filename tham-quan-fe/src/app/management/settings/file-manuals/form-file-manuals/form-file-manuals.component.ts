import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { FileManuals } from 'src/app/core/models/setting/file-manuals.model';
import { FileService } from 'src/app/core/services/common/file.service';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';
import { FileManualsService } from 'src/app/core/services/management/setting/file-manuals.service';

@Component({
  selector: 'app-form-file-manuals',
  templateUrl: './form-file-manuals.component.html',
  styleUrls: ['./form-file-manuals.component.scss']
})
export class FormFileManualsComponent implements OnInit {

  @Input() modalData: ModalData<FileManuals>;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  form: FormGroup;

  isFieldValid = this.formValidatorSvc.isFieldValid;
  displayFieldCss = this.formValidatorSvc.displayFieldCss;

  // Upload file /////////////////////////////////////////
  setListIdFileToForm = this.fileSvc.setListIdFileToForm;
  setIdFileToForm = this.fileSvc.setIdFileToForm;
  extractFileFromListId = this.fileSvc.extractFileFromListId;
  // End Upload file //////////////////////////////////////


  constructor(
    private fb: FormBuilder,
    private fileManualsSvc: FileManualsService,
    private formValidatorSvc: FormValidatorService,
    private alert: ToastrService,
    private spinner: NgxSpinnerService,
    private fileSvc: FileService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      tieuDe: ['', [Validators.required]],
      fileHuongDan: ['', [Validators.required]],
    });
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        tieuDe: this.modalData.data.tieuDe,
        fileHuongDan: this.modalData.data.fileHuongDan,
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
        this.fileManualsSvc.updateFileManuals(this.form.value, this.modalData.data.id)
          .subscribe(() => {
            this.closeModal.emit(true);
            this.alert.success(this.langData[this.langCode].CAP_NHAT_THANH_CONG);
          }, () => this.spinner.hide());
      } else {
        this.spinner.show();
        this.fileManualsSvc.createFileManuals(this.form.value)
          .subscribe(() => {
            this.closeModal.emit(true);
            this.alert.success(this.langData[this.langCode].THEM_MOI_THANH_CONG);
          }, () => this.spinner.hide());
      }
    } else {
      this.formValidatorSvc.validateAllFormFields(this.form);
    }
  }



}
