import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormLecturesComponent } from './form-lectures/form-lectures.component';
import { lecturesRoutes } from './lecturers.routing';
import { ListLecturesComponent } from './list-lectures/list-lectures.component';

@NgModule({
  declarations: [ListLecturesComponent, FormLecturesComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(lecturesRoutes),
  ]
})
export class LecturesModule { }
