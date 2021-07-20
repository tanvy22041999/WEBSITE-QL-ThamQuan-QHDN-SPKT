import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCheckinStudentComponent } from './form-checkin-student.component';

describe('FormCheckinStudentComponent', () => {
  let component: FormCheckinStudentComponent;
  let fixture: ComponentFixture<FormCheckinStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCheckinStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCheckinStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
