import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAnalysisComponent } from './list-analysis.component';

describe('ListAnalysisComponent', () => {
  let component: ListAnalysisComponent;
  let fixture: ComponentFixture<ListAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
