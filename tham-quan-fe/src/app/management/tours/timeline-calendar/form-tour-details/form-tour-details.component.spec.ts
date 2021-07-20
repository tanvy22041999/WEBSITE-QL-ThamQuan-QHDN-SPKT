import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTourDetailsComponent } from './form-tour-details.component';

describe('FormTourDetailsComponent', () => {
  let component: FormTourDetailsComponent;
  let fixture: ComponentFixture<FormTourDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTourDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTourDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
