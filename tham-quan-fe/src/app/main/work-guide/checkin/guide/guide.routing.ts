import { Routes } from '@angular/router';
import { ListCheckinGuideComponent } from './list-checkin-guide/list-checkin-guide.component';

export const guideRoutes: Routes = [
  {
    path: '',
    component: ListCheckinGuideComponent
  },
  // {
  //   path: ':id',
  //   component: ListCheckinStudentByIdComponent
  // }
];
