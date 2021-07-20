import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UrlConstant } from './core/constants/url.constant';
import { AdminGuard } from './core/guards/admin.guard';
import { MasterGuard } from './core/guards/master.guard';
import { MainLayoutComponent } from './layouts/main/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import(`./main/main.module`).then(m => m.MainModule)
  },
  {
    path: 'login',
    component: MainLayoutComponent,
    loadChildren: () => import(`./auth/auth.module`).then(m => m.AuthModule)
  },
  {
    path: 'management',
    loadChildren: () => import(`./management/management.module`).then(m => m.ManagementModule),
    canActivate: [MasterGuard],
    data: {
      guards: [AdminGuard],
      guardsRelation: 'OR',
      fallbackUrl: UrlConstant.ROUTE.LOGIN
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
