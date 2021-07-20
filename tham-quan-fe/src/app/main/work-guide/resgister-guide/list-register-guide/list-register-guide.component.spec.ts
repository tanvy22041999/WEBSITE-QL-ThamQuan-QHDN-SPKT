import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRegisterGuideComponent } from './list-register-guide.component';

describe('ListRegisterGuideComponent', () => {
  let component: ListRegisterGuideComponent;
  let fixture: ComponentFixture<ListRegisterGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRegisterGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRegisterGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
