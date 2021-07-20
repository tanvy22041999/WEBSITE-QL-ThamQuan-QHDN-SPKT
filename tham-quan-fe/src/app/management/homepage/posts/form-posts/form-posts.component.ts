import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { BaiViet } from 'src/app/core/models/homepage/bai-viet.model';
import { FileService } from 'src/app/core/services/common/file.service';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';
import { BaiVietService } from 'src/app/core/services/management/homepage/bai-viet.service';
import Editor from 'src/assets/libs/ckeditor5/build/ckeditor';
@Component({
  selector: 'app-form-posts',
  templateUrl: './form-posts.component.html',
  styleUrls: ['./form-posts.component.scss']
})
export class FormPostsComponent implements OnInit {

  @Input() modalData: ModalData<BaiViet>;
  @Input() couterSoThuTu: number;
  @Input() selectedLoaiBaiViet: string;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ?? 'en';
  //////////////////////////////

  editor = Editor;
  cfgEditor = SystemConstant.CkEditorCfg;
  imageChangedEvent: unknown;
  croppedImage = ''; // base64
  errLowQualityPicInput = false;
  errMaxQualityPicInput = false;
  isSelectedFile = false;
  loadedCkeditor = false;

  listLoaiBaiViet = SystemConstant.LIST_POST_TYPE_TITLE;
  form: FormGroup;

  isFieldValid = this.formValidatorSvc.isFieldValid;
  displayFieldCss = this.formValidatorSvc.displayFieldCss;

  constructor(
    private fb: FormBuilder,
    private baiVietSvc: BaiVietService,
    private formValidatorSvc: FormValidatorService,
    private alert: ToastrService,
    private spinner: NgxSpinnerService,
    private fileSvc: FileService,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loadedCkeditor = true;
      this.spinner.hide();
    }, 200);
    this.createForm();
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.fileSvc.viewFile(this.modalData.data.fileAnhBia)
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

  createForm(): void {
    this.form = this.fb.group({
      fileAnhBia: [''],
      loaiBaiViet: [this.selectedLoaiBaiViet ?? null, [Validators.required]],
      thuTu: [this.couterSoThuTu ?? 1, [Validators.required]],
      tieuDe: ['', [Validators.required]],
      noiDung: ['', [Validators.required]],
    });
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        fileAnhBia: this.modalData.data.fileAnhBia,
        loaiBaiViet: this.modalData.data.loaiBaiViet,
        thuTu: this.modalData.data.thuTu,
        tieuDe: this.modalData.data.tieuDe,
        noiDung: this.modalData.data.noiDung,
      });
    }
  }

  onCancel(): void {
    this.closeModal.emit(false);
  }

  onSubmit(): void {
    if (this.form.valid && (this.croppedImage || this.modalData.action === SystemConstant.ACTION.EDIT)) {
      this.spinner.show();
      this.fileSvc.uploadFile(
        this.fileSvc.blobToFile(this.fileSvc.b64toBlob(this.croppedImage), `posts-cover-${Date.now()}`),
        'posts-cover'
      ).subscribe(res => {
        this.form.get('fileAnhBia').setValue(res.id);
        if (this.modalData.action === SystemConstant.ACTION.EDIT) {
          this.spinner.show();
          this.baiVietSvc.update(this.form.value, this.modalData.data.id)
            .subscribe(() => {
              this.closeModal.emit(true);
              this.alert.success(this.langData[this.langCode].CAP_NHAT_THANH_CONG);
            }, () => this.spinner.hide());
        } else {
          this.spinner.show();
          this.baiVietSvc.create(this.form.value)
            .subscribe(() => {
              this.closeModal.emit(true);
              this.alert.success(this.langData[this.langCode].THEM_MOI_THANH_CONG);
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
    if (image.original.size.width < 500) {
      this.errLowQualityPicInput = true;
    } else {
      this.errLowQualityPicInput = false;
    }
    if (image.original.size.width > 800) {
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
