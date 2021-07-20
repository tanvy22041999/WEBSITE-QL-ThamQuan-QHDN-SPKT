import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDegreeRanksComponent } from './list-degree-ranks.component';

describe('ListDegreeRanksComponent', () => {
  let component: ListDegreeRanksComponent;
  let fixture: ComponentFixture<ListDegreeRanksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDegreeRanksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDegreeRanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
