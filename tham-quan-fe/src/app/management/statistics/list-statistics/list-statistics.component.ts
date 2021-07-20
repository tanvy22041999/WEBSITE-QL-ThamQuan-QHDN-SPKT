import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { TrackingAdminLayoutCollapseState } from 'src/app/core/services/common/tracking-admin-layout-collapse-state.service';

@Component({
  selector: 'app-list-statistics',
  templateUrl: './list-statistics.component.html',
  styleUrls: ['./list-statistics.component.scss']
})
export class ListStatisticsComponent implements OnInit, AfterViewInit {

  @ViewChild('chartSection', { static: false }) chartSection: ElementRef;

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ?? 'en';
  //////////////////////////////

  breadcrumbObj: BreadCrumb = new BreadCrumb({
    heading: this.langData[this.langCode].THONG_KE,
    listBreadcrumb: [{
      title: this.langData[this.langCode].THONG_KE,
      link: UrlConstant.ROUTE.MANAGEMENT.STATISTICS
    }]
  });

  settingHeight = 200;

  view: [number, number] = null;

  constructor(
    private trackingCollapseStateSvc: TrackingAdminLayoutCollapseState,
    private spinner: NgxSpinnerService,
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.view = [this.chartSection.nativeElement.offsetWidth, this.settingHeight];
  }

  ngAfterViewInit(): void {
    this.trackingCollapseStateSvc.getState().subscribe(() => {
      setTimeout(() => {
        this.view = [this.chartSection.nativeElement.offsetWidth, this.settingHeight];
      }, 250);
    });
  }

  ngOnInit(): void {
    this.spinner.hide();
  }

  setupChartsHeight(): void {
    if (this.settingHeight < 100) {
      this.settingHeight = 100;
      this.view = [this.chartSection.nativeElement.offsetWidth, this.settingHeight];
    } else if (this.settingHeight > 999) {
      this.settingHeight = 999;
      this.view = [this.chartSection.nativeElement.offsetWidth, this.settingHeight];
    } else {
      this.view = [this.chartSection.nativeElement.offsetWidth, this.settingHeight];
    }
  }

}
