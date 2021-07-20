import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { academicRanksRoutes } from './academic-ranks.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListAcademicRanksComponent } from './list-academic-ranks/list-academic-ranks.component';
import { FormAcademicRanksComponent } from './form-academic-ranks/form-academic-ranks.component';

@NgModule({
  declarations: [
    // Component here
    ListAcademicRanksComponent,
    FormAcademicRanksComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

    // Routes
    RouterModule.forChild(academicRanksRoutes),
  ]
})
export class AcademicRanksModule { }
