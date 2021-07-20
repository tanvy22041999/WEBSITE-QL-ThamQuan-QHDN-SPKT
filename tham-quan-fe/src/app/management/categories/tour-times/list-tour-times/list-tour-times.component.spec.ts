import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTourTimesComponent } from './list-tour-times.component';

describe('ListTourTimesComponent', () => {
  let component: ListTourTimesComponent;
  let fixture: ComponentFixture<ListTourTimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTourTimesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTourTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
