import { FormTourTimesComponent } from './form-tour-times/form-tour-times.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { manageToursRoutes } from './manage-tours.routing';
import { ListToursComponent } from './list-tours/list-tours.component';
import { FormToursComponent } from './form-tours/form-tours.component';


@NgModule({
  declarations: [
    // Component here
    FormToursComponent,
    ListToursComponent,
    FormTourTimesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    // Routes
    RouterModule.forChild(manageToursRoutes),
  ],
})
export class ManageToursModule { }
