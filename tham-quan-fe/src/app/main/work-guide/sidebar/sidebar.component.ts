import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { AuthenticateService } from 'src/app/core/services/auth/authenticate.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ?? 'en';
  //////////////////////////////

  userAvatarLink = '';
  isLogin = false;

  // type = routerLink / externalLink / srcLink
  parentRoute = 'desk';
  activatedLink = '';
  userName: string;
  checkTimeLineLecturer = false;
  checkTimeLineReviewer = false;
  checkTimeLineLecturerRegistration = false;
  checkTimeLineLecturerSuggestion = false;
  constructor(
    private authSvc: AuthenticateService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe(path => {
      if (path instanceof NavigationEnd) {
        this.activatedLink = path.urlAfterRedirects.split('/').pop();
      }
    });
    this.userName = this.authSvc.getNameOfLogin();
    this.activatedLink = this.authSvc.getAvatarOfLogin();
  }

  ngAfterViewInit(): void {
    this.activatedLink = window.location.pathname.split('/').pop();
  }

  // getTimeineActive() {
  //   this.timeLineSvc.getActive()
  //     .subscribe(res => {
  //       this.timeLine = res;
  //       if (this.timeNow >= new Date(this.timeLine.thoiGianSinhVienGuiDeXuat.tuNgay) &&
  //         this.timeNow <= new Date(this.timeLine.thoiGianSinhVienGuiDeXuat.denNgay)) {
  //         this.checkTimeLineStudentSuggestion = true;
  //       }
  //       if (this.timeNow >= new Date(this.timeLine.thoiGianDangKy.tuNgay) &&
  //         this.timeNow <= new Date(this.timeLine.thoiGianDangKy.denNgay)) {
  //         this.checkTimeLineStudentRegistration = true;
  //       }
  //     });
  // }
}
