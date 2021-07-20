import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { documentRoutes } from './documents.routing';
import { ListDocumentsComponent } from './list-documents/list-documents.component';
import { FormDocumentsComponent } from './form-documents/form-documents.component';

@NgModule({
  declarations: [
    // Component here
  ListDocumentsComponent,
    FormDocumentsComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    // Re-use module here, ex: FormsModule, ReactiveFormsModule,

    // Routes
    RouterModule.forChild(documentRoutes),
  ]
})
export class DocumentsModule { }
