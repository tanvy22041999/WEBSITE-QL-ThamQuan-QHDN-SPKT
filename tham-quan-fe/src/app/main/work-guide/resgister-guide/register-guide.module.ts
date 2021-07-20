import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { registerGuideRoutes } from './register-guide.routing';
import { ListRegisterGuideComponent } from './list-register-guide/list-register-guide.component';
import { FormTourGuideComponent } from './form-tour-guide/form-tour-guide.component';

@NgModule({
  declarations: [
    ListRegisterGuideComponent,
    FormTourGuideComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

    // Routes

    RouterModule.forChild(registerGuideRoutes),
  ]
})
export class RegisterGuideModule { }
