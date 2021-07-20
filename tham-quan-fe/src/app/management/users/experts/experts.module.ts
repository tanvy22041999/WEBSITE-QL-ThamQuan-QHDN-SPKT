import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormExpertComponent } from './form-expert/form-expert.component';
import { ListExpertComponent } from './list-expert/list-expert.component';
import { expertsRoutes } from './experts.routing';

@NgModule({
  declarations: [ListExpertComponent, FormExpertComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(expertsRoutes),
  ]
})
export class ExpertsModule { }
