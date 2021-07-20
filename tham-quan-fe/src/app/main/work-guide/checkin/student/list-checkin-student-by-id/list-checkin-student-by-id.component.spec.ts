import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCheckinStudentByIdComponent } from './list-checkin-student-by-id.component';

describe('ListCheckinStudentByIdComponent', () => {
  let component: ListCheckinStudentByIdComponent;
  let fixture: ComponentFixture<ListCheckinStudentByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCheckinStudentByIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCheckinStudentByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
