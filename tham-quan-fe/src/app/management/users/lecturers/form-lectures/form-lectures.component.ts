import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { HocHam } from 'src/app/core/models/categories/hoc-ham.model';
import { HocVi } from 'src/app/core/models/categories/hoc-vi.model';
import { Khoa } from 'src/app/core/models/categories/khoa.model';
import { LinhVuc } from 'src/app/core/models/categories/linh-vuc.model';
import { Nganh } from 'src/app/core/models/categories/nganh.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { GiangVien } from 'src/app/core/models/users/giang-vien.model';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';
import { HocHamService } from 'src/app/core/services/management/categories/hoc-ham.service';
import { HocViService } from 'src/app/core/services/management/categories/hoc-vi.service';
import { KhoaService } from 'src/app/core/services/management/categories/khoa.service';
import { LinhVucService } from 'src/app/core/services/management/categories/linh-vuc.service';
import { NganhService } from 'src/app/core/services/management/categories/nganh.service';
import { ManagementLecturesService } from 'src/app/core/services/management/users/management-lectures.service';
import { customEmailValidator } from 'src/app/core/validators/email.validator';
import { phoneNumberValidator } from 'src/app/core/validators/phone.validator';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-form-lectures',
  templateUrl: './form-lectures.component.html',
  styleUrls: ['./form-lectures.component.scss']
})
export class FormLecturesComponent implements OnInit {

  @Input() modalData: ModalData<GiangVien>;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  form: FormGroup;

  isFieldValid = this.formValidatorSvc.isFieldValid;
  displayFieldCss = this.formValidatorSvc.displayFieldCss;


  listKhoa: Paginate<Khoa> = new Paginate<Khoa>();
  listNganh: Paginate<Nganh> = new Paginate<Nganh>();
  listHocHam: Paginate<HocHam> = new Paginate<HocHam>();
  listHocVi: Paginate<HocVi> = new Paginate<HocVi>();
  listLinhVuc: Paginate<LinhVuc> = new Paginate<LinhVuc>();

  searchValue = '';
  searchKhoaValueChanged = new Subject<string>();
  searchHocHamValueChanged = new Subject<string>();
  searchHocViValueChanged = new Subject<string>();
  searchLinhVucValueChanged = new Subject<string>();

  checked = true;

  constructor(
    private fb: FormBuilder,
    private lecturesSvc: ManagementLecturesService,
    private formValidatorSvc: FormValidatorService,
    private alert: ToastrService,
    private spinner: NgxSpinnerService,
    private khoaSvc: KhoaService,
    private hocHamSvc: HocHamService,
    private hocViSvc: HocViService,
    private linhVucSvc: LinhVucService,
    private nganhSvc: NganhService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllKhoa();
    this.getAllHocHam();
    this.getAllHocVi();
    this.getAllLinhVuc();
    this.searchKhoaValueChanged.pipe(debounceTime(250))
      .subscribe(searchValue => {
        this.getAllKhoa(searchValue);
      });
    this.searchHocHamValueChanged.pipe(debounceTime(250))
      .subscribe(searchValue => {
        this.getAllHocHam(searchValue);
      });
    this.searchHocViValueChanged.pipe(debounceTime(250))
      .subscribe(searchValue => {
        this.getAllHocVi(searchValue);
      });
    this.searchLinhVucValueChanged.pipe(debounceTime(250))
      .subscribe(searchValue => {
        this.getAllLinhVuc(searchValue);
      });
  }

  createForm(): void {
    this.form = this.fb.group({
      hoTen: ['', [Validators.required]],
      gioiTinh: [false, [Validators.required]],
      email:  ['', [Validators.required, customEmailValidator]],
      dienThoai:  ['', [Validators.required, phoneNumberValidator]],
      hocHam:  ['', [Validators.required]],
      hocVi:  ['', [Validators.required]],
      khoa:  ['', [Validators.required]],
      linhVucs:  [[], [Validators.required]],
      maGiangVien: ['', [Validators.required]],
      nganh: ['', [Validators.required]],
      thinhGiang: [false],
    });
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.getAllNganh(this.modalData.data.khoa.id);
      this.form.patchValue({
        hoTen: this.modalData.data.hoTen,
        gioiTinh: this.modalData.data.gioiTinh,
        email: this.modalData.data.email,
        dienThoai: this.modalData.data.dienThoai,
        hocHam: this.modalData.data.hocHam ? this.modalData.data.hocHam.id : null,
        hocVi: this.modalData.data.hocVi.id,
        khoa: this.modalData.data.khoa.id,
        linhVucs: this.modalData.data.linhVucs.map(item => item.id),
        maGiangVien: this.modalData.data.maGiangVien,
        nganh: this.modalData.data.nganh.id,
        thinhGiang: this.modalData.data.thinhGiang,
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.form.get('maGiangVien').setValue(this.form.get('maGiangVien').value.toUpperCase());
      this.form.get('hoTen').setValue(this.form.get('hoTen').value.toUpperCase());
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.spinner.show();
        this.lecturesSvc.updateLectures(this.form.value, this.modalData.data.id)
          .subscribe(() => {
            this.closeModal.emit(true);
            this.alert.success(this.langData[this.langCode].CAP_NHAT_THANH_CONG);
            this.spinner.hide();
          }, () => this.spinner.hide());
      } else {
        this.spinner.show();
        this.lecturesSvc.createLectures(this.form.value)
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

  onCancel(): void {
    this.closeModal.emit(false);
  }


  getAllKhoa(searchValue?: string): void {
    this.khoaSvc.getAllPaging(0, 10, searchValue ?? '')
      .subscribe(res => {
        this.listKhoa.data = res.content.filter(x => x.trangThai);
      });
  }

  getAllNganh(id: string): void {
    this.nganhSvc.getByIdKhoa(id)
      .subscribe(res => {
        this.listNganh.data = res.filter(x => x.trangThai);
      });
    this.form.get('nganh').setValue(null);
  }


  getAllHocHam(searchValue?: string): void {
    this.hocHamSvc.getAllPaging(0, 10, searchValue ?? '')
      .subscribe(res => {
        this.listHocHam.data = res.content.filter(x => x.trangThai);
      });
  }

  getAllHocVi(searchValue?: string): void {
    this.hocViSvc.getAllPaging(0, 10, searchValue ?? '')
      .subscribe(res => {
        this.listHocVi.data = res.content.filter(x => x.trangThai);
      });
  }

  getAllLinhVuc(searchValue?: string): void {
    this.linhVucSvc.getLinhVucActive(searchValue)
      .subscribe(res => {
        this.listLinhVuc.data = res.filter(x => x.trangThai);
      });
  }


}
