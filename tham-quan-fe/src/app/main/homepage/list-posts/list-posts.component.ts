import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { BaiViet } from 'src/app/core/models/homepage/bai-viet.model';
import { BaiVietService } from 'src/app/core/services/management/homepage/bai-viet.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss', '../../../../assets/theme/css/main.css']
})
export class ListPostsComponent implements OnInit {

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ?? 'en';
  //////////////////////////////

  listPostType = SystemConstant.LIST_POST_TYPE;
  postType = '';
  preloadPostId = '';

  listBaiViet: Paginate<BaiViet> = new Paginate<BaiViet>();
  currentPageNumber = 0;
  totalPages = 0;

  listLoaiBaiVietTitle = SystemConstant.LIST_POST_TYPE_TITLE.langData[this.langCode];

  selectedBaiViet: BaiViet = new BaiViet();

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private baiVietSvc: BaiVietService,
    private spinner: NgxSpinnerService,
  ) {
    this.postType = this.activatedRouter.snapshot.paramMap.get('postType')?.toUpperCase();
    this.preloadPostId = this.activatedRouter.snapshot.queryParamMap.get('id');
    if (!this.postType) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.getDataPaging();
    }, 500);
  }

  getDataPaging(pageNumber?: number): void {
    this.spinner.show();
    if (pageNumber) {
      this.currentPageNumber = pageNumber;
      this.baiVietSvc.getListPostByTypePaging(this.postType, pageNumber, 10)
        .subscribe(res => {
          this.listBaiViet.data = [this.listBaiViet.data, res.content].flat();
          this.totalPages = res.totalPages;
          this.spinner.hide();
        }, () => this.spinner.hide());
    } else {
      this.currentPageNumber = 0;
      this.baiVietSvc.getListPostByTypePaging(this.postType, 0, 10)
        .subscribe(res => {
          if (this.preloadPostId) {
            this.baiVietSvc.getPostById(this.preloadPostId)
              .subscribe(res2 => {
                this.selectedBaiViet = res2;
                this.spinner.hide();
              }, () => this.spinner.hide());
          } else if (res.totalElements) {
            this.selectedBaiViet = res.content[0];
            this.spinner.hide();
          } else {
            this.spinner.hide();
          }
          this.listBaiViet.data = res.content;
          this.totalPages = res.totalPages;
        }, () => this.spinner.hide());
    }
  }

  viewBaiViet(baiViet: BaiViet): void {
    this.spinner.show();
    setTimeout(() => {
      this.selectedBaiViet = baiViet;
      this.spinner.hide();
    }, 500);
  }

  replaceVideoTag(noiDungHtml: string): string {
    // eslint-disable-next-line max-len
    return noiDungHtml.replace(/(<oembed url=)/g, '<div class="w-100 text-center"><iframe width="560" height="315" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen src=')
      .replace(/(<\/oembed>)/g, '</iframe></div>')
      .replace(/(youtube.com\/watch\?v=)/g, 'youtube.com/embed/'); // Youtube replace
  }

}
