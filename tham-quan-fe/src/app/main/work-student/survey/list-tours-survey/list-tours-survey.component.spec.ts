import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListToursSurveyComponent } from './list-tours-survey.component';

describe('ListToursSurveyComponent', () => {
  let component: ListToursSurveyComponent;
  let fixture: ComponentFixture<ListToursSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListToursSurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListToursSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
