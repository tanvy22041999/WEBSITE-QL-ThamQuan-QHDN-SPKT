import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMajorComponent } from './form-major.component';

describe('FormMajorComponent', () => {
  let component: FormMajorComponent;
  let fixture: ComponentFixture<FormMajorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMajorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMajorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
