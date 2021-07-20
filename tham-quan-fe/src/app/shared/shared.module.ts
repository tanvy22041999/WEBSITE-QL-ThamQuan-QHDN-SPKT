import { NgModule } from '@angular/core';
import { WidgetModule } from './widget/widget.module';
import { PluginModule } from './plugin.module';
import { PipeUserModule } from './widget/pipes/pipe-user.module';
import { ComponentSharedModule } from './component-shared/component-shared.module';

@NgModule({
  declarations: [],
  imports: [
    WidgetModule,
    PluginModule,
    PipeUserModule,
    ComponentSharedModule,

  ],
  exports: [
    WidgetModule,
    PluginModule,
    PipeUserModule,
    ComponentSharedModule,

  ],
  providers: []
})
export class SharedModule { }
