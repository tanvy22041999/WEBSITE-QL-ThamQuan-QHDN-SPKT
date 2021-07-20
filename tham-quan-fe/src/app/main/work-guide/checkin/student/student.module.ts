import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { studentRoutes } from './student.routing';
import { ListCheckinStudentByIdComponent } from './list-checkin-student-by-id/list-checkin-student-by-id.component';
import { FormCheckinStudentComponent } from './form-checkin-student/form-checkin-student.component';
import { BarcodeScannerLivestreamModule } from 'ngx-barcode-scanner';

@NgModule({
  declarations: [
    // Component here
    ListCheckinStudentByIdComponent,
    FormCheckinStudentComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BarcodeScannerLivestreamModule,

    // Re-use module here, ex: FormsModule, ReactiveFormsModule,

    // Routes
    RouterModule.forChild(studentRoutes),
  ]
})

export class StudentModule { }
