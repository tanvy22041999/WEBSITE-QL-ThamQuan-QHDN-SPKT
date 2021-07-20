
import { NgModule } from '@angular/core';
import { CurrencyPipe } from './currency.pipe';

// third library

// #1 https://github.com/danrevah/ngx-pipes#installation
import { SafeHtmlPipe } from './safe-html.pipe';
import { SafeUrlPipe } from './safe-url.pipe';

@NgModule({
  declarations: [
    CurrencyPipe,
    SafeHtmlPipe,
    SafeUrlPipe,
  ],
  imports: [
  ],
  exports: [
    CurrencyPipe,
    SafeHtmlPipe,
    SafeUrlPipe,
  ],
  providers: []
})
export class PipeUserModule { }
