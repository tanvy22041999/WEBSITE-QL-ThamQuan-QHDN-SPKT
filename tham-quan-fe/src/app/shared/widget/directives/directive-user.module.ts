
import { NgModule } from '@angular/core';
import { NumberSeparatorDirective } from './number-separator.directive';
import { GetFileInfoDirective } from './get-file-info.directive';
import { GetFileImageDirective } from './get-image-view.directive';

@NgModule({
  declarations: [
    // Declare
    NumberSeparatorDirective,
    GetFileInfoDirective,
    GetFileImageDirective
  ],
  imports: [
  ],
  exports: [
    // Then export
    NumberSeparatorDirective,
    GetFileInfoDirective,
    GetFileImageDirective
  ],
  providers: []
})
export class DirectiveUserModule { }
