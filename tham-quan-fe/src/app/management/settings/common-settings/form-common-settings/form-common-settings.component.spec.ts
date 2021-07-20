import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCommonSettingsComponent } from './form-common-settings.component';

describe('FormCommonSettingsComponent', () => {
  let component: FormCommonSettingsComponent;
  let fixture: ComponentFixture<FormCommonSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCommonSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCommonSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
