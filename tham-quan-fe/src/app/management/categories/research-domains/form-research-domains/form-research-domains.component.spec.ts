import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormResearchDomainsComponent } from './form-research-domains.component';

describe('FormResearchDomainsComponent', () => {
  let component: FormResearchDomainsComponent;
  let fixture: ComponentFixture<FormResearchDomainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormResearchDomainsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormResearchDomainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
