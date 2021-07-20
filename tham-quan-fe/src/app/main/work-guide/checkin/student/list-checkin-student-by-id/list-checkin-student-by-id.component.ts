import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { ChuyenThamQuan } from 'src/app/core/models/main/chuyen-tham-quan.model';
import { SinhVienThamQuan } from 'src/app/core/models/main/sinh-vien-tham-quan.model';
import { ChuyenThamQuanService } from 'src/app/core/services/management/tours/chuyen-tham-quan.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';
@Component({
  selector: 'app-list-checkin-student-by-id',
  templateUrl: './list-checkin-student-by-id.component.html',
  styleUrls: ['./list-checkin-student-by-id.component.scss']
})
export class ListCheckinStudentByIdComponent implements OnInit {

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  chuyenThamQuanIdCurrent: string;
  chuyenThamQuanCurrent: ChuyenThamQuan;
  listSinhVienThamQuan: Paginate<SinhVienThamQuan> = new Paginate<SinhVienThamQuan>();
  searchValue = '';

  constructor(
    private spinner: NgxSpinnerService,
    private nzModalSvc: NzModalService,
    private chuyenThamQuanSvc: ChuyenThamQuanService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.chuyenThamQuanIdCurrent = this.route.snapshot.paramMap.get('id');
    this.getData(this.chuyenThamQuanIdCurrent);
  }

  getData(id: string): void {
    this.spinner.show();
    this.chuyenThamQuanSvc.getListSinhVienPaging(
      id,
      this.listSinhVienThamQuan.currentPage - 1,
      this.listSinhVienThamQuan.limit,
      this.searchValue)
      .subscribe((res) => {
        this.listSinhVienThamQuan.currentPage = res.pageable.pageNumber + 1;
        this.listSinhVienThamQuan.limit = res.pageable.pageSize;
        this.listSinhVienThamQuan.totalPage = res.totalPages;
        this.listSinhVienThamQuan.totalItem = res.totalElements;
        this.listSinhVienThamQuan.data = res.content;
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  openModal(template: TemplateRef<unknown>): void {
    this.nzModalSvc.create({
      nzStyle: { top: '20px' },
      nzWidth: 500,
      nzTitle: null,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false
    });
  }

  pageChange(page: Paginate<SinhVienThamQuan>): void {
    this.listSinhVienThamQuan = page;
    this.getData(this.chuyenThamQuanIdCurrent);
  }


  closeModal(reload?: boolean): void {
    if (reload) {
      this.getData(this.chuyenThamQuanIdCurrent);
    }
    this.nzModalSvc.closeAll();
  }

}
