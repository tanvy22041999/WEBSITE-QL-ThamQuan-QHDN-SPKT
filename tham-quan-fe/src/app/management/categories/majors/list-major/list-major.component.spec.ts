import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMajorComponent } from './list-major.component';

describe('ListMajorComponent', () => {
  let component: ListMajorComponent;
  let fixture: ComponentFixture<ListMajorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMajorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMajorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
