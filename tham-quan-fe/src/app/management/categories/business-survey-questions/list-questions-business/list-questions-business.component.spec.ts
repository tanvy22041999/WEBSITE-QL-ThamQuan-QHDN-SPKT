import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQuestionsBusinessComponent } from './list-questions-business.component';

describe('ListQuestionsBusinessComponent', () => {
  let component: ListQuestionsBusinessComponent;
  let fixture: ComponentFixture<ListQuestionsBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListQuestionsBusinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListQuestionsBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
