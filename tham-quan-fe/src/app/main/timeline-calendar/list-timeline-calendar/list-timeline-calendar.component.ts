/* eslint-disable no-underscore-dangle */
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
// import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ChuyenThamQuan, FilterChuyenThamQuan } from 'src/app/core/models/main/chuyen-tham-quan.model';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { TimelineGraphicService } from 'src/app/core/services/main/timeline-graphic.service';

@Component({
  selector: 'app-list-timeline-calendar',
  templateUrl: './list-timeline-calendar.component.html',
  styleUrls: ['./list-timeline-calendar.component.scss', '../../../../assets/theme/css/main.css']
})
export class ListTimelineCalendarComponent implements OnInit {

  @ViewChild('calendarEl') calendarComponent: FullCalendarComponent;
  @ViewChild('formModal') formModal: TemplateRef<unknown>;

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  breadcrumbObj: BreadCrumb = new BreadCrumb({
    heading: this.langData[this.langCode].DONG_THOI_GIAN,
    listBreadcrumb: [
      {
        title: this.langData[this.langCode].CHUYEN_THAM_QUAN,
        link: UrlConstant.ROUTE.MANAGEMENT.TOURS,
      },
    ],
  });

  modalData: ModalData<ChuyenThamQuan> = new ModalData<ChuyenThamQuan>();
  listChuyenThamQuan: Paginate<ChuyenThamQuan> = new Paginate<ChuyenThamQuan>();
  filterData: FilterChuyenThamQuan = new FilterChuyenThamQuan();

  // listTrangThaiChuyenThamQuan = SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN_TITLE;
  selectedTrangThaiChuyenThamQuan = 'SAN_SANG';
  currentCalendarStart = new Date();
  currentCalendarEnd = new Date();
  listColorClass = ['ev-green', 'ev-amber', 'ev-red', 'ev-purple', 'ev-blue', 'ev-indigo', 'ev-orange'];

  // Calendar Settings
  calendarOptions: CalendarOptions = {
    schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
    headerToolbar: {
      left: 'today prev,next',
      center: 'title',
      right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth,resourceTimelineYear'
    },
    initialView: 'resourceTimelineDay',
    scrollTime: '06:00',
    slotMinTime: '06:00', // Determines the first time slot that will be displayed for each day.
    slotMaxTime: '19:59', // Determines the last time slot that will be displayed for each day.
    aspectRatio: 1,
    buttonText: {
      today: this.langData[this.langCode].F_HOM_NAY,
      year: this.langData[this.langCode].F_NAM,
      month: this.langData[this.langCode].F_THANG,
      week: this.langData[this.langCode].F_TUAN,
      day: this.langData[this.langCode].F_NGAY,
    },
    locale: this.langCode,
    views: {
      resourceTimelineDay: {
        type: 'timeline',
        titleFormat: (dateObj) => {
          let dayName = '';
          const dayValue = dateObj.date.year + '-' + (dateObj.date.month + 1) + '-' + dateObj.date.day;

          const dayShow = (dateObj.date.day < 10 ? '0' + dateObj.date.day : dateObj.date.day) + '/' +
            (dateObj.date.month < 9 ? '0' + (dateObj.date.month + 1) : (dateObj.date.month + 1)) + '/' + dateObj.date.year;

          const day = new Date(dayValue + ' 00:00:00');
          switch (day.getDay()) {
            case 0:
              dayName = `${this.langData[this.langCode].F_CHU_NHAT}, `;
              break;
            case 1:
              dayName = `${this.langData[this.langCode].F_THU_HAI}, `;
              break;
            case 2:
              dayName = `${this.langData[this.langCode].F_THU_BA}, `;
              break;
            case 3:
              dayName = `${this.langData[this.langCode].F_THU_TU}, `;
              break;
            case 4:
              dayName = `${this.langData[this.langCode].F_THU_NAM}, `;
              break;
            case 5:
              dayName = `${this.langData[this.langCode].F_THU_SAU}, `;
              break;
            case 6:
              dayName = `${this.langData[this.langCode].F_THU_BAY}, `;
              break;
            default:
              break;
          }
          return dayName + dayShow;
        },
        slotLabelFormat: [{
          hour: '2-digit',
          minute: '2-digit',
          omitZeroMinute: false,
          hour12: false,
        }],
        slotLabelInterval: { minute: 60 }
      },
      resourceTimelineWeek: {
        type: 'timeline',
        titleFormat: (dateObj) => {
          const dayShowStart = (dateObj.start.day < 10 ? '0' + dateObj.start.day : dateObj.start.day) + '/' +
            (dateObj.start.month < 9 ? '0' + (dateObj.start.month + 1) : (dateObj.start.month + 1)) + '/' + dateObj.start.year;

          const dayShowEnd = (dateObj.end.day < 10 ? '0' + dateObj.end.day : dateObj.end.day) + '/' +
            (dateObj.end.month < 9 ? '0' + (dateObj.end.month + 1) : (dateObj.end.month + 1)) + '/' + dateObj.end.year;

          return dayShowStart + ' → ' + dayShowEnd;
        },
        slotLabelFormat: [
          {
            weekday: 'long',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          },
          {
            hour: '2-digit',
            minute: '2-digit',
            omitZeroMinute: false,
            hour12: false
          }],
        slotLabelInterval: { hour: 1 }
      },
      resourceTimelineMonth: {
        type: 'timeline',
        titleFormat: (dateObj) => `${this.langData[this.langCode].F_THANG} ${(dateObj.date.month + 1)}
          ${this.langData[this.langCode].F_NAM} ${dateObj.date.year}`,
        slotLabelFormat: [{
          weekday: 'narrow',
          day: '2-digit',
          month: '2-digit'
        }]
      },
      resourceTimelineYear: {
        type: 'timeline',
        titleFormat: (dateObj) => `${this.langData[this.langCode].F_NAM} ${dateObj.date.year}`,
        slotLabelFormat: [{
          day: '2-digit',
          month: '2-digit'
        }]
      }
    },
    editable: false,
    height: 'auto',
    contentHeight: 'auto',
    firstDay: 1,
    now: new Date(),
    nowIndicator: true,
    displayEventTime: false,
    displayEventEnd: true,
    resourceAreaWidth: '150px',
    resourceAreaHeaderContent: this.langData[this.langCode].F_THOI_GIAN,
    resources: [{ id: 'default', title: this.langData[this.langCode].CHUYEN_THAM_QUAN }],
    events: [
      // { id: 'sk1|0.142453',
      // resourceId: '5df9a0c53b4da47f23ce9434',
      // title: 'If you see this line, this carlendar has an error',
      // start: '2020-01-01T00:00:00',
      // end: '2020-12-31T23:59:59',
      // classNames: 'ev-red' },
    ],
    // eventContent: (ev) => ({ html: 'AAAAAAAAAA<br>' + ev.event.title }), // change from eventRender
    eventClick: (info) => {
      this.openModal(this.formModal, info.event._def.extendedProps.extData);
    },
    datesSet: (dateInfo) => {
      this.currentCalendarStart = dateInfo.start;
      this.currentCalendarEnd = dateInfo.end;
      this.getDataChuyenThamQuanTimeline(dateInfo.start, dateInfo.end);
    }
  };
  // END Calendar Settings

  constructor(
    private spinner: NgxSpinnerService,
    private nzModalSvc: NzModalService,
    private timelineSvc: TimelineGraphicService,
  ) { }

  ngOnInit(): void {
  }

  getDataChuyenThamQuanTimeline(batDau: Date, ketThuc: Date): void {
    this.spinner.show();
    this.calendarComponent.getApi().removeAllEventSources();
    this.timelineSvc.getChuyenThamQuanByThoiGianTrangThai(batDau, ketThuc, this.selectedTrangThaiChuyenThamQuan)
      .subscribe(res => {
        res.forEach(chuyenThamQuan => {
          this.calendarComponent.getApi().addEventSource([{
            id: chuyenThamQuan.id,
            resourceId: 'default',
            title: chuyenThamQuan.tenChuyenThamQuan,
            start: new Date(chuyenThamQuan.thoiGianBatDauThamQuan),
            end: new Date(chuyenThamQuan.thoiGianKetThucThamQuan),
            classNames: this.listColorClass[Math.floor(Math.random() * this.listColorClass.length)],
            extData: chuyenThamQuan
          }]);
        });
        this.spinner.hide();
      });
  }

  onChangeTrangThaiChuyenThamQuan(): void {
    this.getDataChuyenThamQuanTimeline(this.currentCalendarStart, this.currentCalendarEnd);
  }

  openModal(template: TemplateRef<unknown>, chuyenThamQuan: ChuyenThamQuan): void {
    this.modalData.action = SystemConstant.ACTION.VIEW;
    this.modalData.data = chuyenThamQuan;
    this.nzModalSvc.create({
      nzStyle: { top: '20px' },
      nzWidth: 700,
      nzTitle: this.langData[this.langCode].TOURS,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: true
    });
  }

  closeModal(): void {
    this.nzModalSvc.closeAll();
  }

}
