import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetModule } from '../widget/widget.module';
import { PipeUserModule } from '../widget/pipes/pipe-user.module';
import { PluginModule } from '../plugin.module';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { ViewFileComponent } from './view-file/view-file.component';
import { FormBusinessComponent } from './form-business/form-business.component';
import { ListJoinedGuideComponent } from './list-joined-guide/list-joined-guide.component';
import { ListJoinStudentComponent } from './list-join-student/list-join-student.component';

const formComponents = [
  // ViewFileComponent,
  UploadFileComponent,
  ViewFileComponent,
  FormBusinessComponent,
  ListJoinedGuideComponent,
  ListJoinStudentComponent
];

@NgModule({
  declarations: [
    formComponents,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PluginModule,
    WidgetModule,
    PipeUserModule,

  ],
  exports: [
    formComponents
  ],
  providers: []
})
export class ComponentSharedModule { }
