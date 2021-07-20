import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ChuyenThamQuan } from 'src/app/core/models/main/chuyen-tham-quan.model';

@Component({
  selector: 'app-form-tour-details',
  templateUrl: './form-tour-details.component.html',
  styleUrls: ['./form-tour-details.component.scss']
})
export class FormTourDetailsComponent implements OnInit {

  // Ngon ngu hien thi //////////
  @Input() modalData: ModalData<ChuyenThamQuan>; // Data chuyen tham quan
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  constructor(
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.spinner.hide();
  }

  onCancel(): void {
    this.closeModal.emit(false);
  }

}
