import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSideBannerComponent } from './form-side-banner.component';

describe('FormSideBannerComponent', () => {
  let component: FormSideBannerComponent;
  let fixture: ComponentFixture<FormSideBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSideBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSideBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
