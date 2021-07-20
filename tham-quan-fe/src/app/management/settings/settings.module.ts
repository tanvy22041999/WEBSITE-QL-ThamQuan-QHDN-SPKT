import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { settingsRoutes } from './settings.routing';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,

    // Routes
    RouterModule.forChild(settingsRoutes),
  ]
})
export class SettingsModule { }
