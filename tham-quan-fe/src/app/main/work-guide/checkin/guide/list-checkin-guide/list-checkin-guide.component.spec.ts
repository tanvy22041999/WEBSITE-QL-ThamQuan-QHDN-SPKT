import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCheckinGuideComponent } from './list-checkin-guide.component';

describe('ListCheckinGuideComponent', () => {
  let component: ListCheckinGuideComponent;
  let fixture: ComponentFixture<ListCheckinGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCheckinGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCheckinGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
