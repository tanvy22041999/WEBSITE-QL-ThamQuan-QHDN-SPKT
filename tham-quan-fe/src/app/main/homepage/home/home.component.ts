import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ListBaiVietHomePage } from 'src/app/core/models/homepage/bai-viet.model';
import { Banner, BannerView } from 'src/app/core/models/homepage/banner.model';
import { SideBanner, SideBannerView } from 'src/app/core/models/homepage/side-banner.model';
import { BaiVietService } from 'src/app/core/services/management/homepage/bai-viet.service';
import { BannerService } from 'src/app/core/services/management/homepage/banner.service';
import { SideBannerService } from 'src/app/core/services/management/homepage/side-banner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../../../assets/theme/css/main.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('imgSlider', { static: false }) imgSlider: ElementRef;

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ?? 'en';
  //////////////////////////////

  valueSearch = '';
  autoResizeBanner = { height: 'auto' };
  listBanner: Banner[] = [];
  objBannerView: BannerView = new BannerView();
  listSideBanner: SideBanner[] = [];
  objSideBannerView: SideBannerView = new SideBannerView();

  listLoaiBaiVietId = SystemConstant.LIST_POST_TYPE;
  listLoaiBaiViet = SystemConstant.LIST_POST_TYPE_TITLE[this.langCode];
  objListBaiViet: ListBaiVietHomePage = new ListBaiVietHomePage();

  constructor(
    private spinner: NgxSpinnerService,
    private bannerSvc: BannerService,
    private sideBannerSvc: SideBannerService,
    private baiVietSvc: BaiVietService,
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.autoResizeBanner = { height: this.imgSlider.nativeElement.offsetHeight + 'px' };
  }

  ngOnInit(): void {
    this.getListBanner();
    this.getListSideBanner();
    this.getListBaiViet();
    for (let i = 1; i < 5; i++) {
      setTimeout(() => window.dispatchEvent(new Event('resize')), 500 * i);
    }
  }

  getListBaiViet() {
    this.listLoaiBaiViet.forEach(loaiBaiViet => {
      this.baiVietSvc.getListPostByTypePaging(loaiBaiViet.id, 0, 3, '', 'desc')
        .subscribe(res => {
          this.objListBaiViet[loaiBaiViet.id] = res.content;
        });
    });
  }

  getListBanner() {
    this.spinner.show();
    this.bannerSvc.getAllActive().subscribe(res => {
      this.spinner.hide();
      this.listBanner = res;
    }, () => this.spinner.hide());
  }

  saveResourceBannerView(idBanner: string, bannerRes: SafeResourceUrl): void {
    this.objBannerView[idBanner] = bannerRes;
  }

  getListSideBanner() {
    this.spinner.show();
    this.sideBannerSvc.getAllActive().subscribe(res => {
      this.spinner.hide();
      this.listSideBanner = res;
    }, () => this.spinner.hide());
  }

  saveResourceSideBannerView(idBanner: string, bannerRes: SafeResourceUrl): void {
    this.objSideBannerView[idBanner] = bannerRes;
  }

  checkBaiVietMoi(postDate: string | Date): boolean {
    const futureTime = new Date(Date.now() + 604800000); // +7day
    const checkTime = new Date(postDate);
    return futureTime > checkTime;
  }

}
