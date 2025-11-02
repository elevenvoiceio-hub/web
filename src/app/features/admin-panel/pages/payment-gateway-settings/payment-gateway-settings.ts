import { Component } from '@angular/core';
import { PaymentGatewayForm } from './payment-gateway-form/payment-gateway-form';

@Component({
  selector: 'app-payment-gateway-settings',
  imports: [PaymentGatewayForm],
  templateUrl: './payment-gateway-settings.html',
  styleUrl: './payment-gateway-settings.css',
})
export class PaymentGatewaySettings {}
