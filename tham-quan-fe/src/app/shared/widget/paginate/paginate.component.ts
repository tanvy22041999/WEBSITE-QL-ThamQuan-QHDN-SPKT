/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { Paginate } from './paginate.model';

@Component({
  selector: 'app-table-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class TablePaginateComponent {
  @Input() pageConfig: Paginate<any>;
  @Output() pageChange: EventEmitter<Paginate<any>> = new EventEmitter<Paginate<any>>();
  @Output() numOfItemChange: EventEmitter<Paginate<any>> = new EventEmitter<Paginate<any>>();

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ?? 'en';
  //////////////////////////////

  setPage(page: number): void {
    if (page > 0 && page <= this.pageConfig.totalPage && page !== this.pageConfig.currentPage) {
      this.pageConfig.currentPage = page;
      this.refreshPage();
    }
  }

  changedPage(page: number): void {
    if (page - 1 > 0 && page - 1 < this.pageConfig.totalPage) {
      this.pageConfig.currentPage = page;
      this.refreshPage();
    } else {
      this.pageConfig.currentPage = 1;
      this.refreshPage();
    }
  }

  changedNumOfItem(numOfItem: string): void {
    this.pageConfig.limit = Number.parseInt(numOfItem, 10);
    this.pageConfig.currentPage = 1;
    this.refreshPage();
  }

  refreshPage(): void {
    this.pageChange.emit(this.pageConfig);
  }
}
