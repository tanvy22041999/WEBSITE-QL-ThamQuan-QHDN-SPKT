
import { Routes } from '@angular/router';
import { FormToursSurveyComponent } from './form-tours-survey/form-tours-survey.component';
import { ListToursSurveyComponent } from './list-tours-survey/list-tours-survey.component';

export const surveyRoutes: Routes = [
  {
    path: '',
    component: ListToursSurveyComponent,
  },
  {
    path: ':id',
    component: FormToursSurveyComponent,
  },

];
