import { GuideGuard } from './../core/guards/guide.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UrlConstant } from '../core/constants/url.constant';
import { BusinessGuard } from '../core/guards/business.guard';
import { LecturerGuard } from '../core/guards/lecturer.guard';
import { MasterGuard } from '../core/guards/master.guard';
import { StudentGuard } from '../core/guards/student.guard';
import { MainLayoutComponent } from '../layouts/main/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./homepage/homepage.module').then(m => m.HomePageModule),
      },
      {
        path: 'timeline',
        loadChildren: () => import('./timeline-calendar/timeline-calendar.module').then(m => m.TimelineCalendarModule)
      },
      {
        path: 'work-student',
        loadChildren: () => import('./work-student/work-student.module').then(m => m.WorkStudentModule),
        canActivate: [MasterGuard],
        data: {
          guards: [StudentGuard],
          guardsRelation: 'OR',
          fallbackUrl: UrlConstant.ROUTE.LOGIN
        }
      },
      {
        path: 'work-business',
        loadChildren: () => import('./work-business/work-business.module').then(m => m.WorkBusinessModule),
        canActivate: [MasterGuard],
        data: {
          guards: [BusinessGuard],
          guardsRelation: 'OR',
          fallbackUrl: UrlConstant.ROUTE.LOGIN
        }
      },
      {
        path: 'work-lecture',
        loadChildren: () => import('./work-lecture/work-lecture.module').then(m => m.WorkLectureModule),
        canActivate: [MasterGuard],
        data: {
          guards: [LecturerGuard],
          guardsRelation: 'OR',
          fallbackUrl: UrlConstant.ROUTE.LOGIN
        }
      },
      {
        path: 'work-guide',
        loadChildren: () => import('./work-guide/work-guide.module').then(m => m.WorkGuideModule),
        canActivate: [MasterGuard],
        data: {
          guards: [GuideGuard],
          guardsRelation: 'OR',
          fallbackUrl: UrlConstant.ROUTE.LOGIN
        }
      },
    ],

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
