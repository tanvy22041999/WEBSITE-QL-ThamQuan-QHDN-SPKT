import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BarcodeScannerLivestreamComponent } from 'ngx-barcode-scanner';
import { ToastrService } from 'ngx-toastr';
import { BarcodeResult } from 'src/app/core/models/common/barcode-result.model';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';
import { ChuyenThamQuanService } from 'src/app/core/services/management/tours/chuyen-tham-quan.service';

@Component({
  selector: 'app-form-checkin-student',
  templateUrl: './form-checkin-student.component.html',
  styleUrls: ['./form-checkin-student.component.scss']
})
export class FormCheckinStudentComponent implements OnInit {

  @ViewChild(BarcodeScannerLivestreamComponent) barcodeScanner: BarcodeScannerLivestreamComponent;
  @Input() idChuyenThamQuan: string;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////
  isFieldValid = this.formValidatorSvc.isFieldValid;
  displayFieldCss = this.formValidatorSvc.displayFieldCss;


  form: FormGroup;
  showScanner = true;
  barcodeValue = '';
  mssv = '';
  isQrCode = true;
  constructor(
    private fb: FormBuilder,
    private diemDanhSvc: ChuyenThamQuanService,
    private alert: ToastrService,
    private formValidatorSvc: FormValidatorService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterViewInit(): void {
    this.barcodeScanner.start();
  }

  createForm(): void {
    this.form = this.fb.group({
      mssv: ['', [Validators.required]],
    });
  }

  onCancel(): void {
    this.closeModal.emit(false);
  }

  onValueChanges(result: BarcodeResult) {
    this.barcodeValue = result.codeResult.code;
    this.showScanner = this.isQrCode;
  }

  diemDanh(mssv: string) {
    this.diemDanhSvc.diemDanhSinhVien(this.idChuyenThamQuan, mssv)
      .subscribe(() => {
        this.closeModal.emit(true);
        this.alert.success(this.langData[this.langCode].CAP_NHAT_THANH_CONG);
      }, () => this.spinner.hide());
  }

  onStarted(started: boolean) {
    console.log(started);
  }

}
