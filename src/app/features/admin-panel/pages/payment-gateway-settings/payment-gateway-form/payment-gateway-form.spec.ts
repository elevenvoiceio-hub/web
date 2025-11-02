import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentGatewayForm } from './payment-gateway-form';

describe('PaymentGatewayForm', () => {
  let component: PaymentGatewayForm;
  let fixture: ComponentFixture<PaymentGatewayForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentGatewayForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentGatewayForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
