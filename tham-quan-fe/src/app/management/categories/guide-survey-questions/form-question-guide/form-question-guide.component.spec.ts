import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormQuestionGuideComponent } from './form-question-guide.component';

describe('FormQuestionGuideComponent', () => {
  let component: FormQuestionGuideComponent;
  let fixture: ComponentFixture<FormQuestionGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormQuestionGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormQuestionGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
