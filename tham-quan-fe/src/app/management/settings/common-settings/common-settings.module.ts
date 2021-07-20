import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { commonSettingsRoutes } from './common-settings.routing';
import { ListCommonSettingsComponent } from './list-common-settings/list-common-settings.component';
import { FormCommonSettingsComponent } from './form-common-settings/form-common-settings.component';

@NgModule({
  declarations: [ListCommonSettingsComponent, FormCommonSettingsComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    // Routes
    RouterModule.forChild(commonSettingsRoutes),
  ]
})
export class CommonSettingsModule { }
