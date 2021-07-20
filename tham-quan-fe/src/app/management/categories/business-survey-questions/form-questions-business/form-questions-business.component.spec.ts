import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormQuestionsBusinessComponent } from './form-questions-business.component';

describe('FormQuestionsBusinessComponent', () => {
  let component: FormQuestionsBusinessComponent;
  let fixture: ComponentFixture<FormQuestionsBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormQuestionsBusinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormQuestionsBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
