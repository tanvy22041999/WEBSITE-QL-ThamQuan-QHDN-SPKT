import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { businessDatabaseRoutes } from './business-database.routing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListBusinessComponent } from './list-business/list-business.component';

@NgModule({
  declarations: [
    // Component here
    ListBusinessComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    // Re-use module here, ex: FormsModule, ReactiveFormsModule,
    // Routes
    RouterModule.forChild(businessDatabaseRoutes),
  ],
})
export class BusinessDatabaseModule { }
