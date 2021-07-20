import { LayoutComponent } from './layout/layout.component';
import { Routes } from '@angular/router';

export const workLectureRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'tour',
        pathMatch: 'full'
      },
      {
        path: 'tour',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
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
