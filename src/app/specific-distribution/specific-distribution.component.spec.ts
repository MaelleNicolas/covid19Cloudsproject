import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificDistributionComponent } from './specific-distribution.component';

describe('SpecificDistributionComponent', () => {
  let component: SpecificDistributionComponent;
  let fixture: ComponentFixture<SpecificDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificDistributionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
