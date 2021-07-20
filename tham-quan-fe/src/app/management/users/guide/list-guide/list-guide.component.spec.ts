import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGuideComponent } from './list-guide.component';

describe('ListGuideComponent', () => {
  let component: ListGuideComponent;
  let fixture: ComponentFixture<ListGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
