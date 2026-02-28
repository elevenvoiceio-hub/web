import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentGatewaySettings } from './payment-gateway-settings';

describe('PaymentGatewaySettings', () => {
  let component: PaymentGatewaySettings;
  let fixture: ComponentFixture<PaymentGatewaySettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentGatewaySettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentGatewaySettings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
