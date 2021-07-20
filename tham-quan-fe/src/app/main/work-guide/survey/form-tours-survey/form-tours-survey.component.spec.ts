import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormToursSurveyComponent } from './form-tours-survey.component';

describe('FormToursSurveyComponent', () => {
  let component: FormToursSurveyComponent;
  let fixture: ComponentFixture<FormToursSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormToursSurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormToursSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
