import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFacultiesComponent } from './form-faculties.component';

describe('FormFacultiesComponent', () => {
  let component: FormFacultiesComponent;
  let fixture: ComponentFixture<FormFacultiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFacultiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFacultiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
