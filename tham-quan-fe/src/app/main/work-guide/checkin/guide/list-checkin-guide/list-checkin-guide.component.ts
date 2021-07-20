import { CheckinCheckoutDto, CongTacVienDanDoan } from './../../../../../core/models/main/cong-tac-vien-dan-doan.model';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { FileService } from 'src/app/core/services/common/file.service';
import { ChuyenThamQuan, FileView } from 'src/app/core/models/main/chuyen-tham-quan.model';
import { ChuyenThamQuanService } from 'src/app/core/services/management/tours/chuyen-tham-quan.service';
import { SafeResourceUrl } from '@angular/platform-browser';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { CongTacVienService } from 'src/app/core/services/management/users/cong-tac-vien.service';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';

@Component({
  selector: 'app-list-checkin-guide',
  templateUrl: './list-checkin-guide.component.html',
  styleUrls: ['./list-checkin-guide.component.scss']
})
export class ListCheckinGuideComponent implements OnInit {

  @ViewChild('selectImg') uploadImg: ElementRef<HTMLElement>;

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////


  isFieldValid = this.formValidatorSvc.isFieldValid;
  displayFieldCss = this.formValidatorSvc.displayFieldCss;

  //Lấy danh sách tất cả các cộng tác viên
  form: FormGroup;
  listChuyenThamQuan: ChuyenThamQuan[] = [];
  searchValue = '';
  isUploading = false;
  noiLuuHinh = '';
  typeCheck = '';
  selectedFileIdForView = '';
  chuyenThamQuanId = '';
  objBannerView: FileView = new FileView();
  viewer = 'imageViewer';
  currentGuide: CongTacVienDanDoan = new CongTacVienDanDoan();
  currentUserId = '';
  fileCheck = []; //luu list file check của ctv

  modalRef: NzModalRef;

  // Upload file /////////////////////////////////////////
  setListIdFileToForm = this.fileSvc.setListIdFileToForm;
  setIdFileToForm = this.fileSvc.setIdFileToForm;
  extractFileFromListId = this.fileSvc.extractFileFromListId;

  // End Upload file //////////////////////////////////////

  constructor(
    private spinner: NgxSpinnerService,
    private alert: ToastrService,
    private nzModalSvc: NzModalService,
    private formValidatorSvc: FormValidatorService,
    private fb: FormBuilder,
    private congTacVienSvc: CongTacVienService,
    private chuyenThamQuanSvc: ChuyenThamQuanService,
    private fileSvc: FileService,
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getDataChuyenThamQuanActiveCongTacVien();
  }


  createForm() {
    this.form = this.fb.group({
      file: [''],
    })
  }

  diemDanh() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        if (latitude === 0 || longitude === 0) {
          this.alert.error('latitude = 0 or longitude = 0');
        } else {
          let fileCheck = new CheckinCheckoutDto();
          fileCheck.file = this.form.get('file').value;
          fileCheck.kinhDo = longitude.toString();
          fileCheck.viDo = latitude.toString();
          console.log(this.chuyenThamQuanId, this.typeCheck, fileCheck);
          this.chuyenThamQuanSvc.congTacVienCheckinCheckout(this.chuyenThamQuanId, this.typeCheck, fileCheck)
            .subscribe(() => {
              this.alert.success(this.langData[this.langCode].CAP_NHAT_THANH_CONG);
              this.getDataChuyenThamQuanActiveCongTacVien();
              this.spinner.hide();
              this.hideModalViewFile();
            }, () => this.spinner.hide());
        }
      });
    } else {
      this.alert.error('No support for geolocation');
    }
  }

  selectFile(id: string) {
    this.uploadImg.nativeElement.click();
    this.chuyenThamQuanId = id;
  }

  openModalViewFile(template: TemplateRef<unknown>, fileId: string): void {
    this.selectedFileIdForView = fileId;
    this.modalRef = this.nzModalSvc.create({
      nzStyle: { top: '20px', width: '100%', maxWidth: this.viewer === 'imageViewer' ? '75vmin' : '100vmin' },
      nzTitle: null,
      nzMaskClosable: false,
      nzContent: template,
      nzOnOk: () => this.modalRef.close(),
      nzCancelText: null
    });
  }

  openModalUploadFile(template: TemplateRef<unknown>): void {
    this.createForm();
    this.modalRef = this.nzModalSvc.create({
      nzStyle: { top: '20px' },
      nzWidth: 400,
      nzTitle: this.langData[this.langCode].CAP_NHAT_FILE,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false
    });
  }


  getDataChuyenThamQuanActiveCongTacVien(): void {
    this.spinner.show();
    this.fileCheck = []
    this.chuyenThamQuanSvc.getAllChuyenThamQuanActiveCongTacVien(SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN.SAN_SANG, true)
      .subscribe((res) => {
        this.listChuyenThamQuan = res;
        this.listChuyenThamQuan.forEach(tour => {
          this.fileCheck.push(tour.congTacViens.find(ctv => ctv.congTacVien.id === this.currentUserId));
        })
        console.log(this.fileCheck);
        this.spinner.hide();
      }, () => this.spinner.hide());
  }
  hideModalViewFile(): void {
    this.modalRef.close();
  }
  saveResourceBannerView(idBanner: string, bannerRes: SafeResourceUrl): void {
    this.objBannerView[idBanner] = bannerRes;
  }

  getCurrentUser(): void {
    this.congTacVienSvc.getCurrentCTV()
      .subscribe((res) => {
        this.currentUserId = res.id;
      })
  }
}
