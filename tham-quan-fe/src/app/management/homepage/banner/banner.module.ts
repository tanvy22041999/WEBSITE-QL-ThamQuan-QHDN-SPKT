import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { bannerRoutes } from './banner.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListBannerComponent } from './list-banner/list-banner.component';
import { FormBannerComponent } from './form-banner/form-banner.component';

@NgModule({
  declarations: [ListBannerComponent, FormBannerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,

    // Routes
    RouterModule.forChild(bannerRoutes),
  ]
})
export class BannerModule { }
