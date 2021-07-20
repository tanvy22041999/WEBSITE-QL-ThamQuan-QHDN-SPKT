import { Component, OnInit } from '@angular/core';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { AuthenticateService } from 'src/app/core/services/auth/authenticate.service';

@Component({
  selector: 'app-management-header',
  templateUrl: './management-header.component.html',
  styleUrls: ['./management-header.component.scss']
})
export class ManagementHeaderComponent implements OnInit {

  constantUrl = UrlConstant;
  avatarOfUser = '';

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  constructor(
    private authSvc: AuthenticateService
  ) { }

  ngOnInit(): void {
    this.avatarOfUser = this.authSvc.getAvatarOfLogin();
  }

  doLogout(): void {
    this.authSvc.doLogout();
  }

  switchLang(lang: string): void {
    localStorage.setItem('language', lang);
    this.langCode = lang;
    window.location.reload();
  }
}
