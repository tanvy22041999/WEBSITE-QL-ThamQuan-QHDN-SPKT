import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListVehicleComponent } from './list-vehicle/list-vehicle.component';
import { FormVehicleComponent } from './form-vehicle/form-vehicle.component';
import { vehicleRoutes } from './vehicle.routing';
import { ColorPickerModule } from 'ngx-color-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
  declarations: [
    // Component here
    ListVehicleComponent,
    FormVehicleComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule,
    NzSelectModule,
    // Re-use module here, ex: FormsModule, ReactiveFormsModule,

    // Routes
    RouterModule.forChild(vehicleRoutes),
  ]
})
export class VehicleModule { }
