import { Component, Input, OnInit } from '@angular/core';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { ThongKe } from 'src/app/core/models/statistic/statistic.model';
import { ThongKeService } from 'src/app/core/services/statistic/statistic.service';

@Component({
  selector: 'app-count-travel',
  templateUrl: './count-travel.component.html',
  styleUrls: ['./count-travel.component.scss']
})
export class CountTravelComponent implements OnInit {

  @Input() view: [number, number];

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ?? 'en';
  //////////////////////////////

  name: string[] = [this.langData[this.langCode].TU_NAM, this.langData[this.langCode].DEN_NAM];
  namae: string[] = [this.langData[this.langCode].TU_NGAY, this.langData[this.langCode].DEN_NGAY];


  selectedOption: string = null;
  pickedYear = null;
  range: Date[] = null;

  dataSetForDisplay: ThongKe[] = null;
  thongKeTheoMocTime: ThongKe[] = null;

  constructor(
    private thongKeSvc: ThongKeService,
  ) { }

  ngOnInit(): void {
    this.thongKeSvc.thongKeDNAnswerTheoCauHoiNhapLieu('60b99b4245732348040a835a')
      .subscribe(res => {
        console.log(res);
      });
  }


  loadTheoMocThoiGian(range): void {
    const startDate = range[0].toLocaleDateString();
    const endDate = range[1].toLocaleDateString();
    this.thongKeTheoMocTime = [];
    this.thongKeSvc.thongKeTravelTheoMocThoiGian(range[0].toISOString(), range[1].toISOString())
      .subscribe(res => {
        this.thongKeTheoMocTime.push({
          name: startDate + ' - ' + endDate,
          value: res
        });
        this.dataSetForDisplay = [...this.thongKeTheoMocTime];
      });
  }
  loadTheoDN(range): void {
    const startDate = range[0].toLocaleDateString();
    const endDate = range[1].toLocaleDateString();
    this.thongKeTheoMocTime = [];
    this.thongKeSvc.thongKeTravelTheoDN(range[0].toISOString(), range[1].toISOString())
      .subscribe(res => {
        this.thongKeTheoMocTime.push({
          name: startDate + ' - ' + endDate,
          value: res
        });
        this.dataSetForDisplay = [...this.thongKeTheoMocTime];
      });
  }

  onTheoMocThoiGian(range): void {
    if (range[0] == null || range[1] == null) {
      [...this.dataSetForDisplay] = [];
    } else {
      this.loadTheoMocThoiGian(range);
    }
  }
  onTheoDN(range): void {
    if (range[0] == null || range[1] == null) {
      [...this.dataSetForDisplay] = [];
    } else {
      this.loadTheoDN(range);
    }
  }

}
