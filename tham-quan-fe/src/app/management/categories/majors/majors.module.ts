import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { majorsRoutes } from './majors.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListMajorComponent } from './list-major/list-major.component';
import { FormMajorComponent } from './form-major/form-major.component';

@NgModule({
  declarations: [
    // Component here
    ListMajorComponent,
    FormMajorComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

    // Routes
    RouterModule.forChild(majorsRoutes),
  ]
})
export class MajorsModule { }
