import { LayoutComponent } from './layout/layout.component';
import { Routes } from '@angular/router';

export const workStudentRoutes: Routes = [
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
      // {
      //   path: 'my-project',
      //   loadChildren: () => import('./my-project/my-project.module')
      //     .then(m => m.MyProjectModule)
      // },
      // {
      //   path: 'project-registration',
      //   loadChildren: () => import('./project-registration/project-registration.module')
      //     .then(m => m.ProjectRegistrationModule)
      // },
    ]
  }
];
