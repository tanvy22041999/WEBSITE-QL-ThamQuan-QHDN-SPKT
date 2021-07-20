import { Routes } from '@angular/router';
import { ListCheckinStudentByIdComponent } from './list-checkin-student-by-id/list-checkin-student-by-id.component';

export const studentRoutes: Routes = [
  {
    path: ':id',
    component: ListCheckinStudentByIdComponent
  },
];
