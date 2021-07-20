import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { locationsRoutes } from './loctions.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormLocationComponent } from './form-location/form-location.component';
import { ListLocationComponent } from './list-location/list-location.component';


@NgModule({
  declarations: [
    // Component here
    FormLocationComponent,
    ListLocationComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    // Re-use module here, ex: FormsModule, ReactiveFormsModule,

    // Routes
    RouterModule.forChild(locationsRoutes),
  ]
})
export class LocationsModule { }
