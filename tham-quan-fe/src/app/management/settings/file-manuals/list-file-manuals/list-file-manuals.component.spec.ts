import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFileManualsComponent } from './list-file-manuals.component';

describe('ListFileManualsComponent', () => {
  let component: ListFileManualsComponent;
  let fixture: ComponentFixture<ListFileManualsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFileManualsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFileManualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
