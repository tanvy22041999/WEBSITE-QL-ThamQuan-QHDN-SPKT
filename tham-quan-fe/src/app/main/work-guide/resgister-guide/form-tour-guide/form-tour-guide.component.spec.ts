import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTourGuideComponent } from './form-tour-guide.component';

describe('FormTourGuideComponent', () => {
  let component: FormTourGuideComponent;
  let fixture: ComponentFixture<FormTourGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTourGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTourGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
