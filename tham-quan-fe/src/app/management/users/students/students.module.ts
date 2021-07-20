import { FormStudentComponent } from './form-student/form-student.component';
import { ListStudentComponent } from './list-student/list-student.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { studentsRoutes } from './students.routing';



@NgModule({
  declarations: [
    ListStudentComponent,
    FormStudentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

    // Routes
    RouterModule.forChild(studentsRoutes),
  ]
})
export class StudentsModule { }
