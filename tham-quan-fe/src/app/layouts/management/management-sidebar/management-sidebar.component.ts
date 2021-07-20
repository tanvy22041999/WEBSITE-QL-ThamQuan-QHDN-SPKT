import { Component, OnInit } from '@angular/core';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { AuthenticateService } from 'src/app/core/services/auth/authenticate.service';

@Component({
  selector: 'app-management-sidebar',
  templateUrl: './management-sidebar.component.html',
  styleUrls: ['./management-sidebar.component.scss']
})
export class ManagementSidebarComponent implements OnInit {

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  nameOfUser = '';
  avatarOfUser = '';

  isAdmin = false;

  listMenu: {
    icon: string;
    title: string;
    routerLink: string;
    isHaveChild: boolean;
    listChild: {
      icon: string;
      title: string;
      routerLink: string;
    }[];
  }[] = [];

  constructor(
    private authSvc: AuthenticateService,
  ) { }

  ngOnInit(): void {
    if (this.authSvc.checkRole(SystemConstant.ROLE.ADMIN)) {
      this.isAdmin = true;
    }

    this.nameOfUser = this.authSvc.getNameOfLogin();
    this.avatarOfUser = this.authSvc.getAvatarOfLogin();

    this.listMenu = [
      {
        icon: 'fas fa-solar-panel', // If have child, this icon must using from zorro
        title: this.langData[this.langCode].TONG_QUAN,
        routerLink: UrlConstant.ROUTE.MANAGEMENT.DASHBOARD,
        isHaveChild: false,
        listChild: []
      },
      {
        icon: 'pic-left', // If have child, this icon must using from zorro
        title: this.langData[this.langCode].DANH_MUC,
        routerLink: '',
        isHaveChild: true,
        listChild: [
          {
            icon: 'fas fa-certificate',
            title: this.langData[this.langCode].HOC_HAM,
            routerLink: UrlConstant.ROUTE.MANAGEMENT.ACADEMIC_RANKS
          },
          {
            icon: 'fas fa-graduation-cap',
            title: this.langData[this.langCode].HOC_VI,
            routerLink: UrlConstant.ROUTE.MANAGEMENT.DEGREE_RANKS,
          },
          {
            icon: 'fas fa-list',
            title: this.langData[this.langCode].LINH_VUC,
            routerLink: UrlConstant.ROUTE.MANAGEMENT.RESEARCH_DOMAINS,
          },
          {
            icon: 'fas fa-university',
            title: this.langData[this.langCode].KHOA,
            routerLink: UrlConstant.ROUTE.MANAGEMENT.FACULTIES,
          },
          {
            icon: 'fas fa-book',
            title: this.langData[this.langCode].NGANH,
            routerLink: UrlConstant.ROUTE.MANAGEMENT.MAJORS
          },
          {
            icon: 'fas fa-file-word',
            title: this.langData[this.langCode].DOCUMENTS,
            routerLink: UrlConstant.ROUTE.MANAGEMENT.DOCUMENTS
          },
          {
            icon: 'fas fa-search-location',
            title: this.langData[this.langCode].DIA_DIEM,
            routerLink: UrlConstant.ROUTE.MANAGEMENT.LOCATIONS
          },
          {
            icon: 'far fa-calendar-alt',
            title: this.langData[this.langCode].DOT_THAM_QUAN,
            routerLink: UrlConstant.ROUTE.MANAGEMENT.TOUR_TIMES
          },
          {
            icon: 'fas fa-building',
            title: this.langData[this.langCode].DOANH_NGHIEP,
            routerLink: UrlConstant.ROUTE.MANAGEMENT.BUSINESS
          },
          {
            icon: 'fas fa-car-side',
            title: this.langData[this.langCode].PHUONG_TIEN,
            routerLink: UrlConstant.ROUTE.MANAGEMENT.VEHICLE
          },
          {
            icon: 'fas fa-file-invoice',
            title: this.langData[this.langCode].KHAO_SAT_SINH_VIEN,
            routerLink: UrlConstant.ROUTE.MANAGEMENT.SURVEY_STUDENT
          },
          {
            icon: 'fas fa-file-contract',
            title: this.langData[this.langCode].KHAO_SAT_DOANH_NGHIEP,
            routerLink: UrlConstant.ROUTE.MANAGEMENT.SURVEY_BUSINESS
          },
          {
            icon: 'fas fa-chart-bar',
            title: this.langData[this.langCode].KHAO_SAT_CTV,
            routerLink: UrlConstant.ROUTE.MANAGEMENT.SURVEY_GUIDE
          },
        ]
      },
      {
        icon: 'setting', // If have child, this icon must using from zorro
        title: this.langData[this.langCode].CAU_HINH,
        routerLink: '',
        isHaveChild: true,
        listChild: [
          {
            icon: 'fas fa-envelope-open-text',
            title: this.langData[this.langCode].CAU_HINH_HE_THONG_CHUNG,
            routerLink: UrlConstant.ROUTE.MANAGEMENT.COMMON_SETTINGS
          },
          {
            icon: 'fas fa-file-invoice',
            title: this.langData[this.langCode].FILE_MANUALS,
            routerLink: UrlConstant.ROUTE.MANAGEMENT.FILE_MANUALS
          },

        ]
      },
      {
        icon: 'home', // If have child, this icon must using from zorro
        title: this.langData[this.langCode].CAI_DAT_TRANG_CHU,
        routerLink: '',
        isHaveChild: true,
        listChild: [
          {
            icon: 'fas fa-images',
            title: this.langData[this.langCode].BANNER,
            routerLink: UrlConstant.ROUTE.MANAGEMENT.BANNER
          },
          {
            icon: 'far fa-image',
            title: this.langData[this.langCode].SIDE_BANNER,
            routerLink: UrlConstant.ROUTE.MANAGEMENT.SIDE_BANNER
          },
          {
            icon: 'far fa-newspaper',
            title: this.langData[this.langCode].CHUYEN_MUC_BAI_VIET,
            routerLink: UrlConstant.ROUTE.MANAGEMENT.POSTS
          }
        ],
      },
      {
        icon: 'environment', // If have child, this icon must using from zorro
        title: this.langData[this.langCode].TOURS,
        routerLink: '',
        isHaveChild: true,
        listChild: [
          {
            icon: 'fas fa-map-marker-alt',
            title: this.langData[this.langCode].TOURS,
            routerLink: UrlConstant.ROUTE.MANAGEMENT.MANAGE_TOURS
          },
          {
            icon: 'fas fa-calendar-check',
            title: this.langData[this.langCode].LUU_TRU_HO_SO,
            routerLink: UrlConstant.ROUTE.MANAGEMENT.BACKUP_TOURS
          },
          {
            icon: 'fas fa-stream',
            title: this.langData[this.langCode].DONG_THOI_GIAN,
            routerLink: UrlConstant.ROUTE.MANAGEMENT.TOURS_TIMELINE
          },
        ]
      },
      {
        icon: 'user',
        title: this.langData[this.langCode].MANAGEMENT_USER,
        routerLink: '',
        isHaveChild: true,
        listChild: [
          {
            icon: 'fas fa-user-plus',
            title: this.langData[this.langCode].MANAGEMENT_COLLABORATOR,
            routerLink: UrlConstant.ROUTE.MANAGEMENT.MANAGEMENT_COLLABORATOR
          },
          {

            icon: 'fas fa-user-cog',
            title: this.langData[this.langCode].MANAGEMENT_EXPERT,
            routerLink: UrlConstant.ROUTE.MANAGEMENT.MANAGEMENT_EXPERT
          },
          {
            icon: 'fas fa-user-graduate',
            title: this.langData[this.langCode].QUAN_LY_SINH_VIEN,
            routerLink: UrlConstant.ROUTE.MANAGEMENT.MANAGEMENT_STUDENTS,
          },
          {
            icon: 'fas fa-user-tie',
            title: this.langData[this.langCode].MANAGEMENT_LECTURERS,
            routerLink: UrlConstant.ROUTE.MANAGEMENT.MANAGEMENT_LECTURES
          },
        ]
      },
      {
        icon: 'fas fa-chart-line', // If have child, this icon must using from zorro
        title: this.langData[this.langCode].THONG_KE,
        routerLink: UrlConstant.ROUTE.MANAGEMENT.STATISTICS,
        isHaveChild: false,
        listChild: [],
      },
    ];
  }
}
