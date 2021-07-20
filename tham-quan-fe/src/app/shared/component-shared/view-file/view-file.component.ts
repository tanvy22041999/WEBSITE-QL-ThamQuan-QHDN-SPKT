import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { FileService } from 'src/app/core/services/common/file.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-view-file',
  templateUrl: './view-file.component.html',
  styleUrls: ['./view-file.component.scss']
})
export class ViewFileComponent implements OnInit {

  @Input() fileId: string;
  @Input() viewer: string; // imageViewer / pdfViewer / ''
  @Output() hideIframe = new EventEmitter<boolean>();

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ?? 'en';
  //////////////////////////////

  // viewer = '';
  resourceUrl: string;
  safeResourceUrl: SafeResourceUrl;
  pdfBlob: Blob;
  extension: string;
  degree = 0;
  imgW = 0;
  imgH = 0;

  constructor(
    private fileSvc: FileService,
    private sanitizerSvc: DomSanitizer,
  ) { }

  ngOnInit(): void {
    switch (this.viewer) {
      case 'imageViewer':
        this.fileSvc.viewFile(this.fileId).subscribe(res => {
          const blobImg = new Blob([res.body], { type: 'image/*' });
          this.safeResourceUrl = this.sanitizerSvc.bypassSecurityTrustResourceUrl(URL.createObjectURL(blobImg));
        });
        break;
      case 'pdfViewer':
        this.fileSvc.viewFile(this.fileId).subscribe(res => {
          this.pdfBlob = new Blob([res.body], { type: 'application/pdf' });
        });
        break;

      default:
        break;
    }

  }

  hide(): void {
    this.viewer = '';
    this.hideIframe.emit(false);
  }

  getImgSize(): void {
    this.imgW = Math.round($('#image').width());
    this.imgH = Math.round($('#image').height());
  }

  rotateImage(): void {
    this.degree = this.degree + 90 >= 450 ? this.degree = 90 : this.degree + 90;

    if (this.imgW >= this.imgH) {
      document.getElementById('image').style.transform = 'rotate(' + this.degree + 'deg)';
      // margin top-bot
      const imgRatio = this.imgH / this.imgW;
      if (this.degree / 90 % 2 === 1) {
        document.getElementById('image').style.margin = Math.round((1 - imgRatio) * 50) + '% auto';
      } else {
        document.getElementById('image').style.margin = 'auto';
      }
    } else {
      document.getElementById('image').style.transform = 'rotate(' + this.degree + 'deg)';
    }
  }

}
