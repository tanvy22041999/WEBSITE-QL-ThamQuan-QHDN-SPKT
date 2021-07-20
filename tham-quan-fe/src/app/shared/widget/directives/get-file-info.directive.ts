import { Directive, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FileInfo } from 'src/app/core/models/common/file.model';
import { FileService } from 'src/app/core/services/common/file.service';

@Directive({
  selector: '[appGetFileInfo]'
})
export class GetFileInfoDirective implements OnInit {

  @Input() idFile: string;
  @Output() infoFile: EventEmitter<FileInfo> = new EventEmitter<FileInfo>();

  constructor(private fileSvc: FileService) { }

  ngOnInit(): void {
    this.fileSvc.getFileInfo(this.idFile).subscribe(res =>
      this.infoFile.emit(res),
    () => this.infoFile.emit(null));
  }

}
