import { Routes } from '@angular/router';

export const checkinRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'guide',
        pathMatch: 'full'
      },
      {
        path: 'guide',
        loadChildren: () => import('./guide/guide.module').then(m => m.GuideModule)
      },
      {
        path: 'student',
        loadChildren: () => import('./student/student.module').then(m => m.StudentModule)
      }
    ]
  },
];
