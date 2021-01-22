import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificDailyComponent } from './specific-daily.component';

describe('SpecificDailyComponent', () => {
  let component: SpecificDailyComponent;
  let fixture: ComponentFixture<SpecificDailyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificDailyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
