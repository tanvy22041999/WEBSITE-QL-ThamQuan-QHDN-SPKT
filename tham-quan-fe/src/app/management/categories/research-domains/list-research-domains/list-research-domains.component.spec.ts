import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListResearchDomainsComponent } from './list-research-domains.component';

describe('ListResearchDomainsComponent', () => {
  let component: ListResearchDomainsComponent;
  let fixture: ComponentFixture<ListResearchDomainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListResearchDomainsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListResearchDomainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
