import { Routes } from '@angular/router';

export const usersRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'experts',
        pathMatch: 'full',
      },
      {
        path: 'students',
        loadChildren: () => import('./students/students.module').then(m => m.StudentsModule)
      },
      {
        path: 'guides',
        loadChildren: () => import('./guide/guide.module').then(m => m.GuideModule)
      },
      {
        path: 'experts',
        loadChildren: () => import('./experts/experts.module').then(m => m.ExpertsModule)
      },
      {
        path: 'lecturers',
        loadChildren: () => import('./lecturers/lecturers.module').then(m => m.LecturesModule)
      },
    ],
  },
];
