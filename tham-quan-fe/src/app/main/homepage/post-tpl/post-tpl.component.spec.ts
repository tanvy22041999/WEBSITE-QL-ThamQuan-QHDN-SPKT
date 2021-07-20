import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTplComponent } from './post-tpl.component';

describe('PostTplComponent', () => {
  let component: PostTplComponent;
  let fixture: ComponentFixture<PostTplComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostTplComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
