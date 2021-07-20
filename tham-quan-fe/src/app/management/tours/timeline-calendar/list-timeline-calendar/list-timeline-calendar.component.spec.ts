import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTimelineCalendarComponent } from './list-timeline-calendar.component';

describe('ListTimelineCalendarComponent', () => {
  let component: ListTimelineCalendarComponent;
  let fixture: ComponentFixture<ListTimelineCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTimelineCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTimelineCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
