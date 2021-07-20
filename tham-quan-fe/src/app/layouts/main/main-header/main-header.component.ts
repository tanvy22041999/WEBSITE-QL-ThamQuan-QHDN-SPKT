import { Component, OnInit } from '@angular/core';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { AuthenticateService } from 'src/app/core/services/auth/authenticate.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss', '../../../../assets/theme/css/main.css']
})
export class MainHeaderComponent implements OnInit {

  urlConst = UrlConstant;

  isLogin = false;
  isAdmin = false;
  isCongTacVien = false;
  isSinhVien = false;
  isGiangVien = false;
  isDoanhNghiep = false;

  userName = 'User';
  userAvatarLink = '';

  showCart = false;

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  constructor(
    private authSvc: AuthenticateService,
  ) { }

  ngOnInit(): void {
    const lang = localStorage.getItem('language');
    if (lang) {
      this.langCode = lang;
    } else {
      localStorage.setItem('language', 'en');
      this.langCode = 'en';
    }

    if (this.authSvc.getAuthData()) {
      this.isLogin = true;
      this.userName = this.authSvc.getNameOfLogin();
      this.userAvatarLink = this.authSvc.getAvatarOfLogin() ?? '';
      this.isAdmin = this.authSvc.checkRole(SystemConstant.ROLE.ADMIN);
      this.isGiangVien = this.authSvc.checkRole(SystemConstant.ROLE.LECTURER);
      this.isDoanhNghiep = this.authSvc.checkRole(SystemConstant.ROLE.BUSINESS);
      this.isSinhVien = this.authSvc.checkRole(SystemConstant.ROLE.STUDENT);
      this.isCongTacVien = this.authSvc.checkRole(SystemConstant.ROLE.GUIDE);
    } else {
      this.isLogin = false;
    }
  }

  onLogOut(): void {
    this.authSvc.doLogout();
  }

  switchLang(lang: string): void {
    localStorage.setItem('language', lang);
    window.location.reload();
  }

}
