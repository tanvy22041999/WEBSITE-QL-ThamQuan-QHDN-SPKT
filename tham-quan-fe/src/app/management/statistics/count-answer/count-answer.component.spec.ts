import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountAnswerComponent } from './count-answer.component';

describe('CountAnswerComponent', () => {
  let component: CountAnswerComponent;
  let fixture: ComponentFixture<CountAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountAnswerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
