import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListJoinedGuideComponent } from './list-joined-guide.component';

describe('ListJoinedGuideComponent', () => {
  let component: ListJoinedGuideComponent;
  let fixture: ComponentFixture<ListJoinedGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListJoinedGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListJoinedGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
