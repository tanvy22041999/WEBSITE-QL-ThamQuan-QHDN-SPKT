import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExpertComponent } from './list-expert.component';

describe('ListExpertComponent', () => {
  let component: ListExpertComponent;
  let fixture: ComponentFixture<ListExpertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListExpertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListExpertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
