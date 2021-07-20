import { Component, Input, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { FileService } from 'src/app/core/services/common/file.service';

@Component({
  selector: 'app-post-tpl',
  templateUrl: './post-tpl.component.html',
  styleUrls: ['./post-tpl.component.scss']
})
export class PostTplComponent implements OnInit {

  @Input() postId: string;
  @Input() postTitle: string;
  @Input() postStatus: string[];
  @Input() postType: string;
  @Input() postCoverFileId: string;
  @Input() postTime: string | Date;

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ?? 'en';
  //////////////////////////////

  safeResourceUrl: SafeResourceUrl;

  listPostType = SystemConstant.HOME_POST_STATUS;
  formattedPostTime = new Date();

  constructor(
    private fileSvc: FileService,
    private sanitizerSvc: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.formattedPostTime = new Date(this.postTime);
    if (this.postCoverFileId) {
      this.fileSvc.viewFile(this.postCoverFileId).subscribe(res => {
        const blobImg = new Blob([res.body], { type: 'image/*' });
        this.safeResourceUrl = this.sanitizerSvc.bypassSecurityTrustResourceUrl(URL.createObjectURL(blobImg));
      });
    } else {
      this.safeResourceUrl = null;
    }

  }

}
