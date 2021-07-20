import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQuestionsStudentComponent } from './list-questions-student.component';

describe('ListQuestionsStudentComponent', () => {
  let component: ListQuestionsStudentComponent;
  let fixture: ComponentFixture<ListQuestionsStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListQuestionsStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListQuestionsStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
