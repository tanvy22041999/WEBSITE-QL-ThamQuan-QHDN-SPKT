import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListJoinStudentComponent } from './list-join-student.component';

describe('ListJoinStudentComponent', () => {
  let component: ListJoinStudentComponent;
  let fixture: ComponentFixture<ListJoinStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListJoinStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListJoinStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
