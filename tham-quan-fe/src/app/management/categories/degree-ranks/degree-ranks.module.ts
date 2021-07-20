import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { degreeRanksRoutes } from './degree-ranks.routing';
import { FormDegreeRanksComponent } from './form-degree-ranks/form-degree-ranks.component';
import { ListDegreeRanksComponent } from './list-degree-ranks/list-degree-ranks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    // Component here
    FormDegreeRanksComponent,
    ListDegreeRanksComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    // Re-use module here, ex: FormsModule, ReactiveFormsModule,

    // Routes
    RouterModule.forChild(degreeRanksRoutes),
  ]
})
export class DegreeRanksModule { }
