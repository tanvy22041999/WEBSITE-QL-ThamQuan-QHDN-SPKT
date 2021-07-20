import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFileManualsComponent } from './form-file-manuals.component';

describe('FormFileManualsComponent', () => {
  let component: FormFileManualsComponent;
  let fixture: ComponentFixture<FormFileManualsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFileManualsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFileManualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
