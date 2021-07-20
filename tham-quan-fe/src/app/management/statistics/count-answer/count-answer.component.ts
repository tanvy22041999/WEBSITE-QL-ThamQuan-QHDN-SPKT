import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { ChuyenThamQuan } from 'src/app/core/models/main/chuyen-tham-quan.model';
import { KetQuaKhaoSatCongTacVienloaiCauHoiNhapLieu, KetQuaKhaoSatDoanhNghiepLoaiCauHoiNhapLieu,
  KetQuaKhaoSatSinhVienLoaiCauHoiNhapLieu, ThongKe,
  ThongKeMulti, ValueMulti } from 'src/app/core/models/statistic/statistic.model';
import { ChuyenThamQuanService } from 'src/app/core/services/management/tours/chuyen-tham-quan.service';
import { ThongKeService } from 'src/app/core/services/statistic/statistic.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-count-answer',
  templateUrl: './count-answer.component.html',
  styleUrls: ['./count-answer.component.scss']
})
export class CountAnswerComponent implements OnInit {

  @Input() view: [number, number];

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ?? 'en';
  //////////////////////////////

  listChuyenThamQuan: Paginate<ChuyenThamQuan> = new Paginate<ChuyenThamQuan>();
  searchChuyenThamQuanValueChanged = new Subject<string>();

  dataSetForDisplay: Array<ThongKeMulti[]> = [[]];
  dataSetForDisplayPie: Array<ThongKe[]> = [[]];


  thongKeCauTLDNTheoChonLua: ThongKe[] = [];
  thongKeCauTLDNTheoSapXep: ThongKeMulti[] = [];


  thongKeCauTLSVTheoChonLua: ThongKe[] = [];
  thongKeCauTLSVTheoSapXep: ThongKeMulti[] = [];

  thongKeCauTLCTVTheoChonLua: ThongKe[] = [];
  thongKeCauTLCTVTheoSapXep: ThongKeMulti[] = [];

  series: ValueMulti[] = [];

  thongKeCauTLDNTheoNhapLieu: KetQuaKhaoSatDoanhNghiepLoaiCauHoiNhapLieu[] = [];
  thongKeCauTLSVTheoNhapLieu: KetQuaKhaoSatSinhVienLoaiCauHoiNhapLieu[] = [];
  thongKeCauTLCTVTheoNhapLieu: KetQuaKhaoSatCongTacVienloaiCauHoiNhapLieu[] = [];

  selectedOption: string = null;
  selectedCTQ: string = null;

  //chart option
  legendTitle: string;

  //dummy Data
  // thuTuUuTiens: ThuTuUuTien[] = [
  //   {
  //     thuTuUuTien: 0,
  //     soLuotChon: 5
  //   },
  //   {
  //     thuTuUuTien: 1,
  //     soLuotChon: 4
  //   },
  //   {
  //     thuTuUuTien: 2,
  //     soLuotChon: 3
  //   }
  // ];

  // cauTraLois: CauTraLoi[] = [
  //   {
  //     dapAn: 'a',
  //     thuTuUuTiens: this.thuTuUuTiens
  //   },
  //   {
  //     dapAn: 'b',
  //     thuTuUuTiens: this.thuTuUuTiens
  //   },
  //   {
  //     dapAn: 'c',
  //     thuTuUuTiens: this.thuTuUuTiens
  //   }
  // ];

  // cauHois: CauHoiKhaoSatDoanhNghiep[] = [
  //   {
  //     cauHoi: 'string',
  //     loaiCauHoi: 'string',
  //     luaChonToiDa: 1,
  //     danhSachLuaChon: ['string'],
  //     thuTu: 0,
  //     trangThai: true,
  //     cauHoiBatBuoc: true,
  //   },
  //   {
  //     cauHoi: 'string1',
  //     loaiCauHoi: 'string',
  //     luaChonToiDa: 1,
  //     danhSachLuaChon: ['string'],
  //     thuTu: 0,
  //     trangThai: true,
  //     cauHoiBatBuoc: true,
  //   }
  // ];

  // cauHoiSVs: CauHoiKhaoSatSinhVien[] = [
  //   {
  //     cauHoi: 'string',
  //     loaiCauHoi: 'string',
  //     luaChonToiDa: 1,
  //     danhSachLuaChon: ['string'],
  //     thuTu: 0,
  //     trangThai: true,
  //     cauHoiBatBuoc: true,
  //   },
  //   {
  //     cauHoi: 'string1',
  //     loaiCauHoi: 'string',
  //     luaChonToiDa: 1,
  //     danhSachLuaChon: ['string'],
  //     thuTu: 0,
  //     trangThai: true,
  //     cauHoiBatBuoc: true,
  //   }
  // ];

  // thongKeCauTLSVTheoSapXeps: KetQuaKhaoSatDoanhNghiepLoaiCauHoiSapXep[] = [
  //   {
  //     cauHoi: this.cauHois[0],
  //     cauTraLoi: this.cauTraLois
  //   },
  //   {
  //     cauHoi: this.cauHois[1],
  //     cauTraLoi: this.cauTraLois
  //   }
  // ];

  // soLuotTraLois: SoLuotTraLoi[] = [
  //   {
  //     cauTraLoi: '100%',
  //     soLuotTraLoi: 2,
  //     tiLe: 50
  //   },
  //   {
  //     cauTraLoi: '75%',
  //     soLuotTraLoi: 1,
  //     tiLe: 25
  //   },
  //   {
  //     cauTraLoi: '25%',
  //     soLuotTraLoi: 1,
  //     tiLe: 25
  //   }
  // ];

  // thongKeCauTLDNTheoChonLuas: KetQuaKhaoSatDoanhNghiepLoaiCauHoiLuaChon[] = [
  //   {
  //     cauHoi: this.cauHois[0],
  //     soLuotTraLoi: this.soLuotTraLois
  //   },
  //   {
  //     cauHoi: this.cauHois[1],
  //     soLuotTraLoi: this.soLuotTraLois
  //   }
  // ];

  // thongKeCauTLSVTheoChonLuas: KetQuaKhaoSatSinhVienLoaiCauHoiLuaChon[] = [
  //   {
  //     cauHoi: this.cauHoiSVs[0],
  //     soLuotTraLoi: this.soLuotTraLois
  //   },
  //   {
  //     cauHoi: this.cauHoiSVs[1],
  //     soLuotTraLoi: this.soLuotTraLois
  //   }
  // ];

  constructor(
    private thongKeSvc: ThongKeService,
    private ctqSvc: ChuyenThamQuanService,
  ) { }

  ngOnInit(): void {
    this.searchChuyenThamQuanValueChanged.pipe(debounceTime(250))
      .subscribe(() => {
        this.getListCTQPaging();
      });
  }

  getListCTQPaging(seachValue?: string): void {
    this.ctqSvc.getAllPaging(0, 10, seachValue ?? '')
      .subscribe(res => {
        this.listChuyenThamQuan.data = res.content;
      });
  }

  onSelect(event): void {
    console.log(typeof event, event);
  }

  loadCauTLDNTheoCauHoiLuaChon(selectedCTQ): void {
    this.dataSetForDisplay = [];
    this.thongKeCauTLDNTheoChonLua = [];
    console.log(selectedCTQ);

    this.thongKeSvc.thongKeDNAnswerTheoCauHoiChonLua(selectedCTQ).subscribe(res => {
      //lay cau hoi
      let i = 0;
      for (i; i < res.length; i++) {
        //lay so luot tra loi
        let j = 0;
        for (j; j < res[i].soLuotTraLoi.length; j++) {
          this.thongKeCauTLDNTheoChonLua.push({
            name: res[i].soLuotTraLoi[j].cauTraLoi,
            value: res[i].soLuotTraLoi[j].soLuotTraLoi,
          });
        }
        this.dataSetForDisplayPie.push(this.thongKeCauTLDNTheoChonLua);
      }
    });
  }

  loadCauTLDNTheoCauHoiSapXep(selectedCTQ): void {
    this.dataSetForDisplay = [];
    this.legendTitle = this.langData[this.langCode].THU_TU_UU_TIEN;
    this.thongKeCauTLDNTheoSapXep = [];

    this.thongKeSvc.thongKeDNAnswerTheoCauHoiSapXep(selectedCTQ).subscribe(res => {
      let i = 0;
      //lay cau hoi
      for (i; i < res.length; i++) {

        //lay cau tra loi cho cau hoi
        let j = 0;
        for (j; j < res[i].cauTraLoi.length; j++) {

          //lay thu tu uu tien cho cau tra loi
          let k = 0;
          for (k; k < res[i].cauTraLoi[j].thuTuUuTiens.length; k++) {
            this.series.push({
              name: res[i].cauTraLoi[j].thuTuUuTiens[k].thuTuUuTien.toString(),
              value: res[i].cauTraLoi[j].thuTuUuTiens[k].soLuotChon
            });
          }
          this.thongKeCauTLDNTheoSapXep.push({
            name: res[i].cauTraLoi[j].dapAn,
            series: this.series
          });
          //reset series
          this.series = [];
        }
        this.dataSetForDisplay.push(this.thongKeCauTLDNTheoSapXep);

        //reset thongKeCauTLDNTheoSapXep
        this.thongKeCauTLDNTheoSapXep = [];
      }
    });
  }

  loadCauTLDNTheoCauHoiNhapLieu(selectedCTQ): void {
    this.thongKeCauTLDNTheoNhapLieu = [];
    this.thongKeSvc.thongKeDNAnswerTheoCauHoiNhapLieu(selectedCTQ).subscribe(res => {
      this.thongKeCauTLDNTheoNhapLieu = res;
    });
  }

  loadCauTLSVTheoCauHoiNhapLieu(selectedCTQ): void {
    this.thongKeCauTLSVTheoNhapLieu = [];
    this.thongKeSvc.thongKeSVAnswerTheoCauHoiNhapLieu(selectedCTQ).subscribe(res => {
      this.thongKeCauTLSVTheoNhapLieu = res;
    });
  }

  loadCauTLSVTheoCauHoiSapXep(selectedCTQ): void {
    this.legendTitle = this.langData[this.langCode].THU_TU_UU_TIEN;
    this.dataSetForDisplay = [];
    this.thongKeCauTLSVTheoSapXep = [];

    this.thongKeSvc.thongKeSVAnswerTheoCauHoiSapXep(selectedCTQ).subscribe(res => {
      let i = 0;
      //lay cau hoi
      for (i; i < res.length; i++) {

        //lay cau tra loi cho cau hoi
        let j = 0;
        for (j; j < res[i].cauTraLoi.length; j++) {

          //lay thu tu uu tien cho cau tra loi
          let k = 0;
          for (k; k < res[i].cauTraLoi[j].thuTuUuTiens.length; k++) {
            this.series.push({
              name: res[i].cauTraLoi[j].thuTuUuTiens[k].thuTuUuTien.toString(),
              value: res[i].cauTraLoi[j].thuTuUuTiens[k].soLuotChon
            });
          }
          this.thongKeCauTLSVTheoSapXep.push({
            name: res[i].cauTraLoi[j].dapAn,
            series: this.series
          });
          //reset series
          this.series = [];
        }
        this.dataSetForDisplay.push(this.thongKeCauTLSVTheoSapXep);

        //reset thongKeCauTLDNTheoSapXep
        this.thongKeCauTLSVTheoSapXep = [];
      }
    });
  }

  loadCauTLSVTheoCauHoiLuaChon(selectedCTQ): void {
    this.dataSetForDisplay = [];
    this.thongKeCauTLSVTheoChonLua = [];

    this.thongKeSvc.thongKeSVAnswerTheoCauHoiChonLua(selectedCTQ).subscribe(res => {
      //lay cau hoi
      let i = 0;
      for (i; i < res.length; i++) {
        //lay so luot tra loi
        let j = 0;
        for (j; j < res[i].soLuotTraLoi.length; j++) {
          this.thongKeCauTLSVTheoChonLua.push({
            name: res[i].soLuotTraLoi[j].cauTraLoi,
            value: res[i].soLuotTraLoi[j].soLuotTraLoi,
          });
        }
        this.dataSetForDisplayPie.push(this.thongKeCauTLSVTheoChonLua);
      }
    });
  }

  loadCauTLCTVTheoCauHoiNhapLieu(selectedCTQ): void {
    this.thongKeCauTLCTVTheoNhapLieu = [];
    this.thongKeSvc.thongKeCTVAnswerTheoCauHoiNhapLieu(selectedCTQ).subscribe(res => {
      this.thongKeCauTLCTVTheoNhapLieu = res;
    });
  }
  loadCauTLCTVTheoCauHoiSapXep(selectedCTQ): void {
    this.dataSetForDisplay = [];
    this.legendTitle = this.langData[this.langCode].THU_TU_UU_TIEN;
    this.thongKeCauTLCTVTheoSapXep = [];

    this.thongKeSvc.thongKeCTVAnswerTheoCauHoiSapXep(selectedCTQ).subscribe(res => {
      let i = 0;
      //lay cau hoi
      for (i; i < res.length; i++) {

        //lay cau tra loi cho cau hoi
        let j = 0;
        for (j; j < res[i].cauTraLoi.length; j++) {

          //lay thu tu uu tien cho cau tra loi
          let k = 0;
          for (k; k < res[i].cauTraLoi[j].thuTuUuTiens.length; k++) {
            this.series.push({
              name: res[i].cauTraLoi[j].thuTuUuTiens[k].thuTuUuTien.toString(),
              value: res[i].cauTraLoi[j].thuTuUuTiens[k].soLuotChon
            });
          }
          this.thongKeCauTLCTVTheoSapXep.push({
            name: res[i].cauTraLoi[j].dapAn,
            series: this.series
          });
          //reset series
          this.series = [];
        }
        this.dataSetForDisplay.push(this.thongKeCauTLCTVTheoSapXep);

        //reset thongKeCauTLDNTheoSapXep
        this.thongKeCauTLCTVTheoSapXep = [];
      }
    });
  }
  loadCauTLCTVTheoCauHoiLuaChon(selectedCTQ): void {
    this.dataSetForDisplay = [];
    this.thongKeCauTLCTVTheoChonLua = [];

    this.thongKeSvc.thongKeCTVAnswerTheoCauHoiChonLua(selectedCTQ).subscribe(res => {
      //lay cau hoi
      let i = 0;
      for (i; i < res.length; i++) {
        //lay so luot tra loi
        let j = 0;
        for (j; j < res[i].soLuotTraLoi.length; j++) {
          this.thongKeCauTLCTVTheoChonLua.push({
            name: res[i].soLuotTraLoi[j].cauTraLoi,
            value: res[i].soLuotTraLoi[j].soLuotTraLoi,
          });
        }
        this.dataSetForDisplayPie.push(this.thongKeCauTLCTVTheoChonLua);
      }
    });
  }

  onCTQ(selectedCTQ): void {
    switch (this.selectedOption) {
      case 'dnTheoCauTLNhapLieu':
        this.loadCauTLDNTheoCauHoiNhapLieu(selectedCTQ);
        break;
      case 'dnTheoCauTLSapXep':
        this.loadCauTLDNTheoCauHoiSapXep(selectedCTQ);
        break;
      case 'dnTheoCauTLLuaChon':
        this.loadCauTLDNTheoCauHoiLuaChon(selectedCTQ);
        break;

      case 'svTheoCauTLLuaChon':
        this.loadCauTLSVTheoCauHoiLuaChon(selectedCTQ);
        break;
      case 'svTheoCauTLNhapLieu':
        this.loadCauTLSVTheoCauHoiNhapLieu(selectedCTQ);
        break;
      case 'svTheoCauTLSapXep':
        this.loadCauTLSVTheoCauHoiSapXep(selectedCTQ);
        break;

      case 'ctvTheoCauTLNhapLieu':
        this.loadCauTLCTVTheoCauHoiNhapLieu(selectedCTQ);
        break;
      case 'ctvTheoCauTLLuaChon':
        this.loadCauTLCTVTheoCauHoiSapXep(selectedCTQ);
        break;
      case 'ctvTheoCauTLSapXep':
        this.loadCauTLCTVTheoCauHoiSapXep(selectedCTQ);
        break;

      default:
        this.dataSetForDisplay = [];
        break;
    }
  }
}
