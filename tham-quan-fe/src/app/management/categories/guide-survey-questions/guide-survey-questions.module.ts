import { guideSurveyQuestionsRoutes } from './guide-survey-questions';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'

import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListQuestionGuideComponent } from './list-question-guide/list-question-guide.component';
import { FormQuestionGuideComponent } from './form-question-guide/form-question-guide.component';


@NgModule({
  declarations: [ListQuestionGuideComponent, FormQuestionGuideComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    // Re-use module here, ex: FormsModule, ReactiveFormsModule,

    // Routes
    RouterModule.forChild(guideSurveyQuestionsRoutes),
  ]
})
export class GuideQuestionsModule { }
