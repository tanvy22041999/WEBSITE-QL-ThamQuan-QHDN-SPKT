import { LayoutComponent } from './layout/layout.component';
import { Routes } from '@angular/router';

export const workGuideRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'register-guide',
        pathMatch: 'full'
      },
      {
        path: 'register-guide',
        loadChildren: () => import('./resgister-guide/register-guide.module').then(m => m.RegisterGuideModule)
      },
      {
        path: 'check-guide',
        loadChildren: () => import('./checkin/checkin.module').then(m => m.CheckinModule)
      },
      {
        path: 'survey',
        loadChildren: () => import('./survey/survey.module').then(m => m.SurveyModule)
      },
    ]
  }
];
