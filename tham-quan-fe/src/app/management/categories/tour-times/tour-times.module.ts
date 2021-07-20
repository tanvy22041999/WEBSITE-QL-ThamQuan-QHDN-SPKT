import { FormTourTimesComponent } from './form-tour-times/form-tour-times.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { tourTimesRoutes } from './tour-times.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListTourTimesComponent } from './list-tour-times/list-tour-times.component';

@NgModule({
  declarations: [
    // Component here
    FormTourTimesComponent,
    ListTourTimesComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    // Re-use module here, ex: FormsModule, ReactiveFormsModule,

    // Routes
    RouterModule.forChild(tourTimesRoutes),
  ]
})
export class TourTimesModule { }
