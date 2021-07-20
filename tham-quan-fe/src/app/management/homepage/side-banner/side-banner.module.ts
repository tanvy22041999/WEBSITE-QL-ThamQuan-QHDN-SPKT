import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { sideBannerRoutes } from './side-banner.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListSideBannerComponent } from './list-side-banner/list-side-banner.component';
import { FormSideBannerComponent } from './form-side-banner/form-side-banner.component';

@NgModule({
  declarations: [ListSideBannerComponent, FormSideBannerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,

    // Routes
    RouterModule.forChild(sideBannerRoutes),
  ]
})
export class SideBannerModule { }
