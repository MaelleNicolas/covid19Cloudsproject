import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificSummaryComponent } from './specific-summary.component';

describe('SpecificSummaryComponent', () => {
  let component: SpecificSummaryComponent;
  let fixture: ComponentFixture<SpecificSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
