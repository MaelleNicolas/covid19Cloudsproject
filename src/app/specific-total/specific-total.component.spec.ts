import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificTotalComponent } from './specific-total.component';

describe('SpecificTotalComponent', () => {
  let component: SpecificTotalComponent;
  let fixture: ComponentFixture<SpecificTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificTotalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
