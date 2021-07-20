import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { SideBanner } from 'src/app/core/models/homepage/side-banner.model';
import { FileService } from 'src/app/core/services/common/file.service';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';
import { SideBannerService } from 'src/app/core/services/management/homepage/side-banner.service';
import { urlValidator } from 'src/app/core/validators/url.validator';

@Component({
  selector: 'app-form-side-banner',
  templateUrl: './form-side-banner.component.html',
  styleUrls: ['./form-side-banner.component.scss']
})
export class FormSideBannerComponent implements OnInit {

  @Input() modalData: ModalData<SideBanner>;
  @Input() lastestThuTu: number;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ?? 'en';
  ///////////////////////////////

  form: FormGroup;
  imageChangedEvent: unknown;
  croppedImage = ''; // base64
  errLowQualityPicInput = false;
  errMaxQualityPicInput = false;
  isSelectedFile = false;

  isFieldValid = this.formValidatorSvc.isFieldValid;
  displayFieldCss = this.formValidatorSvc.displayFieldCss;

  constructor(
    private fbd: FormBuilder,
    private fileSvc: FileService,
    private sideBannerSvc: SideBannerService,
    private formValidatorSvc: FormValidatorService,
    private alert: ToastrService,
    private spinner: NgxSpinnerService,
  ) {
    localStorage.removeItem('tmpBanner');
  }

  ngOnInit(): void {
    this.createForm();
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        thuTu: this.modalData.data.thuTu,
        tieuDe: this.modalData.data.tieuDe,
        lienKetNgoai: this.modalData.data.lienKetNgoai,
        fileSideBanner: this.modalData.data.fileSideBanner,
      });
      this.fileSvc.viewFile(this.modalData.data.fileSideBanner)
        .subscribe(res => {
          this.fileSvc.blobToB64(res.body, 'tmpBanner');
        }, () => { },
          () => {
            const getBannerFromLocalStorage = setInterval(() => {
              if (localStorage.getItem('tmpBanner')) {
                this.croppedImage = 'data:image/jpeg;base64,' + localStorage.getItem('tmpBanner');
                clearInterval(getBannerFromLocalStorage);
              }
            }, 1000);
          });
    }
  }

  createForm() {
    this.form = this.fbd.group({
      thuTu: [this.lastestThuTu ?? 1, [Validators.required, Validators.min(1)]],
      tieuDe: ['', [Validators.required]],
      lienKetNgoai: ['', [urlValidator]],
      fileSideBanner: [''],
    });
  }

  onCancel() {
    localStorage.removeItem('tmpBanner');
    this.closeModal.emit(false);
  }

  onSubmit() {
    if (this.form.valid && (this.croppedImage || this.modalData.action === SystemConstant.ACTION.EDIT)) {
      this.spinner.show();
      this.fileSvc.uploadFile(
        this.fileSvc.blobToFile(this.fileSvc.b64toBlob(this.croppedImage), `side-banner-${Date.now()}`),
        'home-side-banner'
      ).subscribe(res => {
        this.form.get('fileSideBanner').setValue(res.id);
        if (this.modalData.action === SystemConstant.ACTION.EDIT) {
          this.sideBannerSvc.update(this.form.value, this.modalData.data.id)
            .subscribe(() => {
              this.alert.success(this.langData[this.langCode].CAP_NHAT_THANH_CONG);
              this.closeModal.emit(true);
            }, () => this.spinner.hide());
        } else {
          this.sideBannerSvc.create(this.form.value)
            .subscribe(() => {
              this.alert.success(this.langData[this.langCode].THEM_MOI_THANH_CONG);
              this.closeModal.emit(true);
            }, () => this.spinner.hide());
        }
      }, () => this.spinner.hide());
    } else {
      this.formValidatorSvc.validateAllFormFields(this.form);
    }
  }

  // Image crop

  fileChangeEvent(event: unknown): void {
    this.imageChangedEvent = event;
    this.isSelectedFile = true;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imageLoaded(image: any) {
    if (image.original.size.width < 300) {
      this.errLowQualityPicInput = true;
    } else {
      this.errLowQualityPicInput = false;
    }
    if (image.original.size.width > 600) {
      this.errMaxQualityPicInput = true;
    } else {
      this.errMaxQualityPicInput = false;
    }
    // show cropper
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    this.alert.error(this.langData[this.langCode].CO_LOI_KHI_TAI_LEN);
  }

}
