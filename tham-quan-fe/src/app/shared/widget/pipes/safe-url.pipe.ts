import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {

  constructor(private sanitizedSvc: DomSanitizer) { }

  transform(value: string): SafeUrl {
    return this.sanitizedSvc.bypassSecurityTrustUrl(value);
  }
}
