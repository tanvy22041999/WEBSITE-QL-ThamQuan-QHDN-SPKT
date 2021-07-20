import { Routes } from '@angular/router';

export const registerRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'tour',
        pathMatch: 'full'
      },
      {
        path: 'tour',
        loadChildren: () => import('./tour/tour.module').then(m => m.TourModule)
      }
    ]
  }
];
