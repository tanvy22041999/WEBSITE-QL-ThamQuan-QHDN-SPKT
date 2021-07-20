import { Directive, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FileService } from 'src/app/core/services/common/file.service';

@Directive({
  selector: '[appGetImageView]'
})
export class GetFileImageDirective implements OnInit {

  @Input() idFile: string;
  @Output() returnImageResourceUrl: EventEmitter<SafeResourceUrl> = new EventEmitter<SafeResourceUrl>();

  constructor(
    private fileSvc: FileService,
    private sanitizerSvc: DomSanitizer,) { }

  ngOnInit(): void {
    this.fileSvc.viewFile(this.idFile).subscribe(res => {
      const blobFile = new Blob([res.body], { type: 'image/*' });
      this.returnImageResourceUrl.emit(this.sanitizerSvc.bypassSecurityTrustResourceUrl(URL.createObjectURL(blobFile)));
    }, () => this.returnImageResourceUrl.emit(null));
  }

}
