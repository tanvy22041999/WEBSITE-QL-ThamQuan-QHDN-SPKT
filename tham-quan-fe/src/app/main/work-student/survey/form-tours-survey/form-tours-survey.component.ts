import { CauHoiKhaoSatCTV } from './../../../../core/models/categories/cau-hoi-khao-sat-ctv';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { KetQuaKhaoSatDoanhNghiepDto, CauHoiKhaoSatDoanhNghiep } from 'src/app/core/models/categories/cau-hoi-khao-sat-doanh-nghiep';
import { CauHoiKhaoSatSinhVienService } from 'src/app/core/services/management/categories/cau-hoi-khao-sat-sinh-vien.service';
import { KetQuaKhaoSatSinhVienService } from 'src/app/core/services/main/ket-qua-khao-sat-sinh-vien';

@Component({
  selector: 'app-form-tours-survey',
  templateUrl: './form-tours-survey.component.html',
  styleUrls: ['./form-tours-survey.component.scss']
})
export class FormToursSurveyComponent implements OnInit {

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  tourId = '';

  listCauHoi: CauHoiKhaoSatCTV[] = [];
  setCauHoiBatBuocChuaTraLoiId = new Set<string>();
  isTouchedSubmit = false;

  constructor(
    private alert: ToastrService,
    private cauHoiSvc: CauHoiKhaoSatSinhVienService,
    private ketQuaKhaoSatSvc: KetQuaKhaoSatSinhVienService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.tourId = this.route.snapshot.paramMap.get('id');
    this.getDataCauHoi();
  }

  getDataCauHoi() {
    this.spinner.show();
    this.cauHoiSvc.getListCauHoiByIdTour(this.tourId)
      .subscribe(res => {
        this.listCauHoi = res.map(cauHoi => {
          if (['NHAP_LIEU', 'CHON_MOT', 'SAP_XEP'].includes(cauHoi.loaiCauHoi)) {
            return {
              id: cauHoi.id,
              cauHoi: cauHoi.cauHoi,
              danhSachLuaChon: cauHoi.danhSachLuaChon,
              loaiCauHoi: cauHoi.loaiCauHoi,
              luaChonToiDa: cauHoi.luaChonToiDa,
              thuTu: cauHoi.thuTu,
              trangThai: cauHoi.trangThai,
              cauTraLoi: [],
              cauTraLoiSingle: '',
              cauTraLoiMulti: [],
              cauHoiBatBuoc: cauHoi.cauHoiBatBuoc
            };
          } else if (cauHoi.loaiCauHoi === 'CHON_NHIEU') {
            return {
              id: cauHoi.id,
              cauHoi: cauHoi.cauHoi,
              danhSachLuaChon: cauHoi.danhSachLuaChon,
              loaiCauHoi: cauHoi.loaiCauHoi,
              luaChonToiDa: cauHoi.luaChonToiDa,
              thuTu: cauHoi.thuTu,
              trangThai: cauHoi.trangThai,
              cauTraLoi: [],
              cauTraLoiSingle: '',
              cauTraLoiMulti: cauHoi.danhSachLuaChon.reduce(
                (objCauTraLoiMulti, luaChon) => Object.assign(objCauTraLoiMulti, { [luaChon]: false }), {}),
              cauHoiBatBuoc: cauHoi.cauHoiBatBuoc
            };
          }
        });
        this.spinner.hide();
      }, () => this.spinner.hide());
  }


  onSubmit() {
    this.isTouchedSubmit = true;
    this.listCauHoi.reduce((_nope, cauHoi) => {
      this.mappingCauTraLoi(cauHoi);
      return 0;
    }, 0);
    if (this.setCauHoiBatBuocChuaTraLoiId.size) {
      this.alert.error(this.langData[this.langCode].PHAI_HOAN_TAT_CAU_HOI_BAT_BUOC);
    } else {
      const finalResult: KetQuaKhaoSatDoanhNghiepDto = {
        chuyenThamQuan: this.tourId,
        ketQuaKhaoSats: this.listCauHoi.map(x => ({
          cauHoiKhaoSat: x.id,
          cauTraLoi: x.cauTraLoi
        }))
      };
      this.ketQuaKhaoSatSvc.create(finalResult)
        .subscribe(() => {
          this.alert.success(this.langData[this.langCode].THUC_HIEN_KHAO_SAT_THANH_CONG);
          this.router.navigate(['/work-student', 'survey']);
          this.spinner.hide();
        }, () => this.spinner.hide());
      // TODO: Call api sumbit cau tra loi
    }
  }

  mappingCauTraLoi(cauHoi: CauHoiKhaoSatDoanhNghiep): void {
    let tmpCauTraLoi = [];
    switch (cauHoi.loaiCauHoi) {
      case 'NHAP_LIEU':
        tmpCauTraLoi = [cauHoi.cauTraLoiSingle.trim()].flat().filter(x => x !== '' && x.charCodeAt(0) !== 173);
        if (cauHoi.cauHoiBatBuoc && !tmpCauTraLoi.length) {
          this.setCauHoiBatBuocChuaTraLoiId.add(cauHoi.id);
        } else {
          this.setCauHoiBatBuocChuaTraLoiId.delete(cauHoi.id);
          cauHoi.cauTraLoi = tmpCauTraLoi;
        }
        break;
      case 'CHON_MOT':
        tmpCauTraLoi = [cauHoi.cauTraLoiSingle].flat().filter(x => x !== '');
        if (cauHoi.cauHoiBatBuoc && !tmpCauTraLoi.length) {
          this.setCauHoiBatBuocChuaTraLoiId.add(cauHoi.id);
        } else {
          this.setCauHoiBatBuocChuaTraLoiId.delete(cauHoi.id);
          cauHoi.cauTraLoi = tmpCauTraLoi;
        }
        break;
      case 'CHON_NHIEU':
        tmpCauTraLoi = Object.keys(cauHoi.cauTraLoiMulti)
          .filter((_x, i) => Object.values(cauHoi.cauTraLoiMulti)[i] === true);
        if (cauHoi.cauHoiBatBuoc && !tmpCauTraLoi.length) {
          this.setCauHoiBatBuocChuaTraLoiId.add(cauHoi.id);
        } else {
          this.setCauHoiBatBuocChuaTraLoiId.delete(cauHoi.id);
          cauHoi.cauTraLoi = tmpCauTraLoi;
        }
        break;
      case 'SAP_XEP': // Required default
        cauHoi.cauTraLoi = cauHoi.danhSachLuaChon;
        break;
      default:
        break;
    }
  }

  dragDropChangeOrderAndStore(event: CdkDragDrop<string[]>, cauHoiKhaoSat: CauHoiKhaoSatDoanhNghiep): void {
    moveItemInArray(cauHoiKhaoSat.danhSachLuaChon, event.previousIndex, event.currentIndex);
    cauHoiKhaoSat.cauTraLoi = cauHoiKhaoSat.danhSachLuaChon = [...cauHoiKhaoSat.danhSachLuaChon];
  }

  classStyleCauHoiBatBuocChuaTraLoi(idCauHoi: string): string {
    return (this.setCauHoiBatBuocChuaTraLoiId.has(idCauHoi) && this.isTouchedSubmit) ? 'text-red' : '';
  }



}
