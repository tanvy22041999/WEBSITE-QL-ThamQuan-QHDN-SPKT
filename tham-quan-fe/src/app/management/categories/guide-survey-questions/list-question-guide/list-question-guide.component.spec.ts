import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQuestionGuideComponent } from './list-question-guide.component';

describe('ListQuestionGuideComponent', () => {
  let component: ListQuestionGuideComponent;
  let fixture: ComponentFixture<ListQuestionGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListQuestionGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListQuestionGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
