import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormAnalysisComponent } from './form-analysis/form-analysis.component';
import { ListAnalysisComponent } from './list-analysis/list-analysis.component';
import { analysisToursRoutes } from './analysis-tours.routing';


@NgModule({
  declarations: [
    // Component here
    FormAnalysisComponent,
    ListAnalysisComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    // Routes
    RouterModule.forChild(analysisToursRoutes),
  ],
})
export class AnalysisToursModule { }
