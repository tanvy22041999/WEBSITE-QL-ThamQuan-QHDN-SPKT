import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFacultiesComponent } from './list-faculties.component';

describe('ListFacultiesComponent', () => {
  let component: ListFacultiesComponent;
  let fixture: ComponentFixture<ListFacultiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFacultiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFacultiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
