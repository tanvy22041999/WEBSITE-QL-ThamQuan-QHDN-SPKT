import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { fileManaulsRoutes } from './file-manuals.routing';
import { FormFileManualsComponent } from './form-file-manuals/form-file-manuals.component';
import { ListFileManualsComponent } from './list-file-manuals/list-file-manuals.component';

@NgModule({
  declarations: [ListFileManualsComponent, FormFileManualsComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    // Routes
    RouterModule.forChild(fileManaulsRoutes),
  ]
})
export class FileManualsModule { }
