import { LayoutComponent } from './layout/layout.component';
import { Routes } from '@angular/router';

export const workBusinessRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'survey',
        pathMatch: 'full'
      },
      {
        path: 'survey',
        loadChildren: () => import('./survey/survey.module').then(m => m.SurveyModule)
      },
    ]
  }
];
