import { businessSurveyQuestionsRoutes } from './business-survey-questions';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'

import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListQuestionsBusinessComponent } from './list-questions-business/list-questions-business.component';
import { FormQuestionsBusinessComponent } from './form-questions-business/form-questions-business.component';


@NgModule({
  declarations: [ListQuestionsBusinessComponent, FormQuestionsBusinessComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    // Re-use module here, ex: FormsModule, ReactiveFormsModule,

    // Routes
    RouterModule.forChild(businessSurveyQuestionsRoutes),
  ]
})
export class BusinessSurveyQuestionsModule { }
