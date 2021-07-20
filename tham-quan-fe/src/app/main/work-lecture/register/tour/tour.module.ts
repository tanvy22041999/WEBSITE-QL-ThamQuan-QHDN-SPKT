import { FormTourComponent } from './form-tour/form-tour.component';
/* eslint-disable @typescript-eslint/indent */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { tourRoutes } from './tour.routing';
import { ListTourComponent } from './list-tour/list-tour.component';


@NgModule({
  declarations: [
    ListTourComponent,
    FormTourComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

    // Routes
    RouterModule.forChild(tourRoutes),
  ]
})
export class TourModule { }
