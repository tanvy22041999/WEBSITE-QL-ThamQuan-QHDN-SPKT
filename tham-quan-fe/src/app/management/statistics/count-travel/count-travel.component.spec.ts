import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountTravelComponent } from './count-travel.component';

describe('CountTravelComponent', () => {
  let component: CountTravelComponent;
  let fixture: ComponentFixture<CountTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountTravelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
