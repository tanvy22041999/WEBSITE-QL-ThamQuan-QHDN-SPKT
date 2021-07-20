import { Routes } from '@angular/router';

export const toursRoutes: Routes = [
  {
    path: '',
    redirectTo: 'manage',
    pathMatch: 'full',
  },
  {
    path: 'manage',
    loadChildren: () => import('./manage/manage-tours.module').then(m => m.ManageToursModule)
  },
  {
    path: 'archived',
    loadChildren: () => import('./archived/archived-tours.module').then(m => m.ArchivedToursModule)
  },
  {
    path: 'timeline',
    loadChildren: () => import('./timeline-calendar/timeline-calendar.module').then(m => m.TimelineCalendarModule)
  },
];
