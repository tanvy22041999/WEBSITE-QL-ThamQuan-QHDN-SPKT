import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { surveyRoutes } from './survey.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListToursSurveyComponent } from './list-tours-survey/list-tours-survey.component';
import { FormToursSurveyComponent } from './form-tours-survey/form-tours-survey.component';

@NgModule({
  declarations: [ListToursSurveyComponent, FormToursSurveyComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

    // Routes
    RouterModule.forChild(surveyRoutes),
  ]
})
export class SurveyModule { }
