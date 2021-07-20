import { CongTacVienDanDoan } from 'src/app/core/models/main/cong-tac-vien-dan-doan.model';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ChuyenThamQuan } from 'src/app/core/models/main/chuyen-tham-quan.model';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';
import { CongTacVienService } from 'src/app/core/services/management/users/cong-tac-vien.service';
import { ChuyenThamQuanService } from 'src/app/core/services/management/tours/chuyen-tham-quan.service';

@Component({
  selector: 'app-list-register-guide',
  templateUrl: './list-register-guide.component.html',
  styleUrls: ['./list-register-guide.component.scss']
})
export class ListRegisterGuideComponent implements OnInit {

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  modalData: ModalData<ChuyenThamQuan> = new ModalData<ChuyenThamQuan>();
  listChuyenThamQuan: ChuyenThamQuan[] = [];
  listChuyenThamQuaPaginate: Paginate<ChuyenThamQuan> = new Paginate<ChuyenThamQuan>();

  searchValue = '';
  format;
  deNgay: Date = new Date();
  currentUser: CongTacVienDanDoan;
  currentUserId: string;

  isRegistered = false;
  isDuyet = false;

  constructor(
    private spinner: NgxSpinnerService,
    private alert: ToastrService,
    private chuyenThamQuanSvc: ChuyenThamQuanService,
    private congTacVienSvc: CongTacVienService,
    private nzModalSvc: NzModalService,
    //Dòng để service lấy id cộng tác viên
  ) { }

  ngOnInit(): void {
    this.getAllChuyenThamQuan();
    this.getCurrentUser();
  }


  getAllChuyenThamQuan(): void {
    this.spinner.show();
    this.chuyenThamQuanSvc
      .getAllChuyenThamQUanDaDuyet()
      .subscribe(
        (res) => {
          this.listChuyenThamQuan = res;
          this.spinner.hide();
        }, () => this.spinner.hide()
      );
  }

  congTacVienDangKy(id: string, huy?: boolean): void {
    this.nzModalSvc.confirm({
      nzWidth: 300,
      nzTitle: (huy ? this.langData[this.langCode].XAC_NHAN_HUY_DANG_KY : this.langData[this.langCode].XAC_NHAN_DANG_KY),
      nzCancelText: this.langData[this.langCode].HUY,
      nzOkDanger: true,
      nzOkText: this.langData[this.langCode].XAC_NHAN,
      nzOnOk: () => {
        this.spinner.show();
        this.chuyenThamQuanSvc.congTacVienDangKy(id, huy)
          .subscribe(() => {
            this.spinner.hide();
            this.alert.success(huy ? this.langData[this.langCode].HUY_THANH_CONG : this.langData[this.langCode].DANG_KY_THANH_CONG);
            this.getAllChuyenThamQuan();
            this.spinner.hide();
          }, () => this.spinner.hide());
      }
    });
  }


  getCurrentUser() {
    this.congTacVienSvc.getCurrentCTV()
      .subscribe((res) => {
        this.currentUserId = res.id;
      })
  }

  openModal(template: TemplateRef<unknown>, data?: ChuyenThamQuan): void {
    if (data) {
      this.modalData.action = SystemConstant.ACTION.EDIT;
      this.modalData.data = data;
    } else {
      this.modalData.action = SystemConstant.ACTION.ADD;
    }
    this.nzModalSvc.create({
      nzStyle: { top: '20px' },
      nzWidth: 800,
      nzTitle: this.langData[this.langCode].THONG_TIN_CHUYEN_THAM_QUAN,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false
    });
  }

  closeModal(): void {
    this.nzModalSvc.closeAll();
  }


  checkTrangThai(chuyenThamQuan: ChuyenThamQuan) {
    this.currentUser = chuyenThamQuan.congTacViens?.find(x => x.congTacVien.id === this.currentUserId);
    this.isRegistered = !!this.currentUser;
  }




}
