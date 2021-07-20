import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArchivedToursComponent } from './list-archived-tours.component';

describe('ListArchivedToursComponent', () => {
  let component: ListArchivedToursComponent;
  let fixture: ComponentFixture<ListArchivedToursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListArchivedToursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListArchivedToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
