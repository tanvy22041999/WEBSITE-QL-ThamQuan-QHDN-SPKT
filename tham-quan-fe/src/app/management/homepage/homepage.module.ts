import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { homePageRoutes } from './homepage.routing';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    // Routes
    RouterModule.forChild(homePageRoutes),
  ]
})
export class HomePageModule { }
