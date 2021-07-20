import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDegreeRanksComponent } from './form-degree-ranks.component';

describe('FormDegreeRanksComponent', () => {
  let component: FormDegreeRanksComponent;
  let fixture: ComponentFixture<FormDegreeRanksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDegreeRanksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDegreeRanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
