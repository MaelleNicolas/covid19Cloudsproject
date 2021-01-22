import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewsSpecificCountryComponent } from './add-news-specific-country.component';

describe('AddNewsSpecificCountryComponent', () => {
  let component: AddNewsSpecificCountryComponent;
  let fixture: ComponentFixture<AddNewsSpecificCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewsSpecificCountryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewsSpecificCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
