import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { researchDomainsRoutes } from './research-domains.routing';
import { ListResearchDomainsComponent } from './list-research-domains/list-research-domains.component';
import { FormResearchDomainsComponent } from './form-research-domains/form-research-domains.component';

@NgModule({
  declarations: [
    // Component here
    ListResearchDomainsComponent,
    FormResearchDomainsComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(researchDomainsRoutes),
  ]
})
export class ResearchDomainsModule { }
