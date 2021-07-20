import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { guideRoutes } from './guide.routing';
import { ListGuideComponent } from './list-guide/list-guide.component';
import { FormGuideComponent } from './form-guide/form-guide.component';

@NgModule({
  declarations: [ListGuideComponent, FormGuideComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(guideRoutes),
  ]
})
export class GuideModule { }
