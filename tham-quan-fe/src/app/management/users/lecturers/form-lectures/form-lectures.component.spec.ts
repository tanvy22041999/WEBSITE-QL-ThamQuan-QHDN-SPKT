import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLecturesComponent } from './form-lectures.component';

describe('FormLecturesComponent', () => {
  let component: FormLecturesComponent;
  let fixture: ComponentFixture<FormLecturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormLecturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLecturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
