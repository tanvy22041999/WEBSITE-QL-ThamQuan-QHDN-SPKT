import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTourTimesComponent } from './form-tour-times.component';

describe('FormTourTimesComponent', () => {
  let component: FormTourTimesComponent;
  let fixture: ComponentFixture<FormTourTimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTourTimesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTourTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
