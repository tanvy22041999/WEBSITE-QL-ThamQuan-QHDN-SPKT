import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormQuestionsStudentComponent } from './form-questions-student.component';

describe('FormQuestionsStudentComponent', () => {
  let component: FormQuestionsStudentComponent;
  let fixture: ComponentFixture<FormQuestionsStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormQuestionsStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormQuestionsStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
