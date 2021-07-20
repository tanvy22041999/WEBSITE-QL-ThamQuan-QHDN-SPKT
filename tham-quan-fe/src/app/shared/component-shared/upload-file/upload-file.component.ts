import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { ListFilesPatch, FileInfo } from 'src/app/core/models/common/file.model';
import { FileService } from 'src/app/core/services/common/file.service';
import { HandlerErrorService } from 'src/app/core/services/common/handler-error.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  @Input() subFolderOnServer: string;
  @Input() isUploadMultiFile: boolean;
  @Input() isDisableUpload: boolean; // but still show view BTN
  @Input() isDisableView: boolean;
  @Input() isDownloadable: boolean; // need disable view file first
  @Input() acceptFilesExtension: string;
  @Input() listFilesPatch: ListFilesPatch[];
  @Output() isUploading: EventEmitter<boolean> = new EventEmitter();
  @Output() returnedListId: EventEmitter<ListFilesPatch[]> = new EventEmitter();

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ?? 'en';
  //////////////////////////////

  viewModalRef: NzModalRef;

  isStartUpload = false;
  uploadRef: Subscription;
  listFiles: ListFilesPatch[] = [];
  selectedFileIdForView = '';
  defaultFolder = 'chua-phan-loai';
  viewer = '';

  constructor(
    private fileSvc: FileService,
    private handleErrSvc: HandlerErrorService,
    private nzModalSvc: NzModalService,
    private spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
    const tryTimes = 60;
    let runTimes = 0;
    const trackingFilePatch = setInterval(() => {
      this.listFiles = this.listFilesPatch;
      if (this.listFiles.length > 0 || ++runTimes > tryTimes) {
        clearInterval(trackingFilePatch);
      }
    }, 1000);

    if (!this.acceptFilesExtension) {
      this.acceptFilesExtension = '.jpg,.jpeg,.png,.pdf,.ppt,.pptx,.doc,.docx,.zip,.rar';
    } else if (this.acceptFilesExtension.split(',').filter(value => ['.jpg', '.jpeg', '.png'].includes(value)).length) {
      this.viewer = 'imageViewer';
    } else if (this.acceptFilesExtension.split(',').includes('.pdf')) {
      this.viewer = 'pdfViewer';
    }/* else if (this.acceptFilesExtension.split(',').filter(value => ['.doc', '.docx', '.ppt', '.pptx'].includes(value)).length) {
      this.viewer = 'officeViewer';
    }*/
  }

  uploadFile(files: File[]) {
    this.isStartUpload = true;
    this.isUploading.emit(true);
    if (this.isUploadMultiFile) {
      this.uploadRef = this.fileSvc.uploadMultiFile(files, this.subFolderOnServer ?? this.defaultFolder)
        .subscribe(res => {
          this.listFiles = [this.listFiles, res.filter(x => x.id).map(x => ({ id: x.id, filename: x.tenFile }))].flat();
          this.returnedListId.emit(this.listFiles);
          this.isStartUpload = false;
          this.isUploading.emit(false);
        }, (err) => {
          this.handleErrSvc.convertError(err);
          this.isStartUpload = false;
          this.isUploading.emit(false);
        });
    } else {
      this.uploadRef = this.fileSvc.uploadFile(files[0], this.subFolderOnServer ?? this.defaultFolder)
        .subscribe(res => {
          this.listFiles = [{ id: res.id, filename: res.tenFile }];
          this.returnedListId.emit(this.listFiles);
          this.isStartUpload = false;
          this.isUploading.emit(false);
        }, (err) => {
          this.handleErrSvc.convertError(err);
          this.isStartUpload = false;
          this.isUploading.emit(false);
        });
    }
  }

  onRemove(index: number): void {
    this.returnedListId.emit(this.listFiles.splice(index, 1));
  }

  setFileName(file: FileInfo, refVar: ListFilesPatch): void {
    refVar.filename = file.tenFile ?? 'File';
  }

  openModalViewFile(template: TemplateRef<unknown>, fileId: string): void {
    this.selectedFileIdForView = fileId;
    this.viewModalRef = this.nzModalSvc.create({
      nzStyle: { top: '20px', width: '100%', maxWidth: this.viewer === 'imageViewer' ? '75vmin' : '100vmin' },
      nzTitle: null,
      nzMaskClosable: false,
      nzContent: template,
      nzOnOk: () => this.viewModalRef.close(),
      nzCancelText: null
    });
  }

  hideModalViewFile(): void {
    this.viewModalRef.close();
  }

  onTerminateUploading(): void {
    this.uploadRef.unsubscribe();
    this.isStartUpload = false;
    this.isUploading.emit(false);
  }

  downloadFile(fileId: string): void {
    this.spinner.show();
    this.fileSvc.downloadFile(fileId)
      .subscribe(res => {
        this.fileSvc.getFileInfo(fileId)
          .subscribe(fileInfo => {
            this.fileSvc.convertFileFromBlob(res.body, fileInfo.tenFile);
            this.spinner.hide();
          }, () => this.spinner.hide());
      }, () => this.spinner.hide());
  }
}
