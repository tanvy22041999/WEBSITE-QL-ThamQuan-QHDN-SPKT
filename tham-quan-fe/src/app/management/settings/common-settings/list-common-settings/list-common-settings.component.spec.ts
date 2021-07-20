import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCommonSettingsComponent } from './list-common-settings.component';

describe('ListCommonSettingsComponent', () => {
  let component: ListCommonSettingsComponent;
  let fixture: ComponentFixture<ListCommonSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCommonSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCommonSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
