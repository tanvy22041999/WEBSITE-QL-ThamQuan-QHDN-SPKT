import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { facultiesRoutes } from './faculties.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListFacultiesComponent } from './list-faculties/list-faculties.component';
import { FormFacultiesComponent } from './form-faculties/form-faculties.component';

@NgModule({
  declarations: [
    // Component here
    ListFacultiesComponent,
    FormFacultiesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    // Routes
    RouterModule.forChild(facultiesRoutes),
  ],
})
export class FacultiesModule { }
