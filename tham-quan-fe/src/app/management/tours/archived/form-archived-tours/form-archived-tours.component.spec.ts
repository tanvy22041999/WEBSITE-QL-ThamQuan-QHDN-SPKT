import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArchivedToursComponent } from './form-archived-tours.component';

describe('FormArchivedToursComponent', () => {
  let component: FormArchivedToursComponent;
  let fixture: ComponentFixture<FormArchivedToursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormArchivedToursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormArchivedToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
