import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ChuyenThamQuan, FileView } from 'src/app/core/models/main/chuyen-tham-quan.model';
import { CongTacVienDanDoan } from 'src/app/core/models/main/cong-tac-vien-dan-doan.model';
import { CongTacVien } from 'src/app/core/models/users/cong-tac-vien.model';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';
import { ChuyenThamQuanService } from 'src/app/core/services/management/tours/chuyen-tham-quan.service';
import { CongTacVienService } from 'src/app/core/services/management/users/cong-tac-vien.service';


@Component({
  selector: 'app-list-joined-guide',
  templateUrl: './list-joined-guide.component.html',
  styleUrls: ['./list-joined-guide.component.scss']
})
export class ListJoinedGuideComponent implements OnInit {

  @ViewChild('importDanhSachCongTacVien') importDsSvElement: ElementRef;
  @Input() modalDataChuyenThamQuan: ModalData<ChuyenThamQuan>;
  @Output() closeModalCTV: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() isUpdate: boolean;
  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  breadcrumbObj: BreadCrumb = new BreadCrumb({
    heading: this.langData[this.langCode].DANH_SACH_CONG_TAC_VIEN,
    listBreadcrumb: [
      {
        title: this.langData[this.langCode].DANH_MUC,
        link: UrlConstant.ROUTE.MANAGEMENT.TOURS,
      },
    ],
  });

  modalRef: NzModalRef;

  isFieldValid = this.formValidatorSvc.isFieldValid;
  displayFieldCss = this.formValidatorSvc.displayFieldCss;

  chuyenThamQuanTemp: any;
  listCongTacVien: CongTacVienDanDoan[] = [];  //Sinh Vien cua chuyen tham quan
  listAllCtv: CongTacVien[] = [];
  searchValue = '';
  form: FormGroup;
  objBannerView: FileView = new FileView();
  idChuyen = '';
  selectedFileIdForView = '';
  viewer = 'imageViewer';
  listCTVJoined = [];


  searchValueTextChanged = new Subject<string>();
  searchCongTacVienChange = new Subject<string>();

  constructor(
    private spinner: NgxSpinnerService,
    private alert: ToastrService,
    private nzModalSvc: NzModalService,
    private chuyenThamQuanSvc: ChuyenThamQuanService,
    private congTacVienSvc: CongTacVienService,
    private formValidatorSvc: FormValidatorService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.searchCongTacVienChange.pipe(debounceTime(300))
      .subscribe(() => {
        this.getListAllCTV();
      });
    this.patchValue();
    this.getListCongTacVien();
  }

  patchValue() {
    this.idChuyen = this.modalDataChuyenThamQuan.data.id;
  }

  //get DSCTV cua chuyen tham quan
  getListCongTacVien(): void {
    this.spinner.show();
    this.chuyenThamQuanSvc.getById(this.modalDataChuyenThamQuan.data.id)
      .subscribe((res) => {
        this.listCongTacVien = res.congTacViens;
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  getListAllCTV(): void {
    this.spinner.show();
    this.congTacVienSvc.getAllCollaborator()
      .subscribe((res) => {
        this.listAllCtv = res;
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  // //modal cap nhat ctv
  // openModal(template: TemplateRef<unknown>, data?: ChuyenThamQuan): void {
  //   this.createForm();
  //   this.searchCongTacVienChange.next();
  //   this.modalRef = this.nzModalSvc.create({
  //     nzStyle: { top: '20px' },
  //     nzWidth: 500,
  //     nzTitle: (data ? this.langData[this.langCode].CHINH_SUA_TITLE :
  //       this.langData[this.langCode].THEM_MOI_TITLE) + this.langData[this.langCode].SINH_VIEN,
  //     nzContent: template,
  //     nzFooter: null,
  //     nzMaskClosable: false
  //   });
  // }

  ///modal dssv
  closeModal(reload?: boolean): void {
    if (reload) {
      //this.getListCongTacVienPaging();
    }
    this.nzModalSvc.closeAll();
  }


  createForm(): void {
    this.form = this.fb.group({
      congTacViens: [[]],
    });
  }

  changeStatus(congTacVien: CongTacVienDanDoan): void {
    if (!this.isUpdate) {
      this.nzModalSvc.confirm({
        nzWidth: 300,
        nzTitle: this.langData[this.langCode].XAC_NHAN_THAY_DOI_TRANG_THAI,
        nzCancelText: this.langData[this.langCode].HUY,
        nzOkDanger: true,
        nzOkText: this.langData[this.langCode].XAC_NHAN,
        nzOnOk: () => {
          this.spinner.show();
          this.chuyenThamQuanSvc.duyetCTV(this.modalDataChuyenThamQuan.data.id, congTacVien.congTacVien.id, !congTacVien.trangThai)
            .subscribe(() => {
              this.spinner.hide();
              this.getListCongTacVien();
              this.alert.success(this.langData[this.langCode].THAY_DOI_THANH_CONG);
            }, () => this.spinner.hide());
        }
      });
    }
  }

  saveResourceBannerView(idBanner: string, bannerRes: SafeResourceUrl): void {
    this.objBannerView[idBanner] = bannerRes;
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

  hideModalViewFile(): void {
    this.modalRef.close();
  }

  openModal(template: TemplateRef<unknown>, data?: ChuyenThamQuan): void {
    this.createForm();
    this.modalRef = this.nzModalSvc.create({
      nzStyle: { top: '20px' },
      nzWidth: 500,
      nzTitle: (data ? this.langData[this.langCode].CHINH_SUA_TITLE :
        this.langData[this.langCode].THEM_MOI_TITLE) + this.langData[this.langCode].SINH_VIEN,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false
    });
  }

  closeModalThemCTV(): void {
    this.getListCongTacVien();
    this.modalRef.destroy();
  }

  onUpdateListCTV() {
    this.spinner.show();
    if (this.modalDataChuyenThamQuan.data.congTacViens) {
      this.listCTVJoined = [...this.modalDataChuyenThamQuan.data.congTacViens.map(ctv => ctv.congTacVien.id)];
    }
    const listTempt = this.listCTVJoined.concat(this.form.get('congTacViens').value);
    console.log(listTempt);
    this.chuyenThamQuanSvc.updateDanhSachCTV(this.modalDataChuyenThamQuan.data.id, listTempt)
      .subscribe((res) => {
        console.log(res)
        this.closeModalThemCTV();
        this.alert.success(this.langData[this.langCode].CAP_NHAT_THANH_CONG);
        this.spinner.hide();
        this.getListCongTacVien();
      });
  }
}
