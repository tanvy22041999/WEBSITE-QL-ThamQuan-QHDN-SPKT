import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormToursComponent } from './form-tours.component';

describe('FormToursComponent', () => {
  let component: FormToursComponent;
  let fixture: ComponentFixture<FormToursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormToursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
