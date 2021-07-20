import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSideBannerComponent } from './list-side-banner.component';

describe('ListSideBannerComponent', () => {
  let component: ListSideBannerComponent;
  let fixture: ComponentFixture<ListSideBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSideBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSideBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
