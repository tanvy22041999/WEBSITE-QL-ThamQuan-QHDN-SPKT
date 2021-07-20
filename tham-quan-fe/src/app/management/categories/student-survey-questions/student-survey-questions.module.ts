import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { studentSurveyQuestionsRoutes } from './student-survey-questions';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListQuestionsStudentComponent } from './list-questions-student/list-questions-student.component';
import { FormQuestionsStudentComponent } from './form-questions-student/form-questions-student.component';


@NgModule({
  declarations: [
  ListQuestionsStudentComponent,
  FormQuestionsStudentComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    // Re-use module here, ex: FormsModule, ReactiveFormsModule,

    // Routes
    RouterModule.forChild(studentSurveyQuestionsRoutes),
  ]
})
export class StudentSurveyQuestionsModule { }
