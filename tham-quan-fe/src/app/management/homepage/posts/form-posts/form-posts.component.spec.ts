import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPostsComponent } from './form-posts.component';

describe('FormPostsComponent', () => {
  let component: FormPostsComponent;
  let fixture: ComponentFixture<FormPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
