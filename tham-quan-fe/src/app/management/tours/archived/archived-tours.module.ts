import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { archivedToursRoutes } from './archived-tours.routing';
import { ListArchivedToursComponent } from './list-archived-tours/list-archived-tours.component';
import { FormArchivedToursComponent } from './form-archived-tours/form-archived-tours.component';


@NgModule({
  declarations: [ListArchivedToursComponent, FormArchivedToursComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    // Routes
    RouterModule.forChild(archivedToursRoutes),
  ],
})
export class ArchivedToursModule { }
