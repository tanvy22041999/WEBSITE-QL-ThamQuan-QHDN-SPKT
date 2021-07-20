import { Component } from '@angular/core';
import { LanguageConstant } from 'src/app/core/constants/language.constant';

@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.scss', '../../../../assets/theme/css/main.css']
})
export class MainFooterComponent {

  nowYear = new Date().getFullYear();

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

}
