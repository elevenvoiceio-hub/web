import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceDetails } from './price-details';

describe('PriceDetails', () => {
  let component: PriceDetails;
  let fixture: ComponentFixture<PriceDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
