import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLecturesComponent } from './list-lectures.component';

describe('ListLecturesComponent', () => {
  let component: ListLecturesComponent;
  let fixture: ComponentFixture<ListLecturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLecturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLecturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
