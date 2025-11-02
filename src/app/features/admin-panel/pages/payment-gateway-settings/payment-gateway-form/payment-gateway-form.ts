import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmToasterImports } from '@spartan-ng/helm/sonner';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { PaymentGatewayService } from '../../../../../services/payment-gateway-service/payment-gateway-service';
import { NgIcon, provideIcons } from '@ng-icons/core';



import { lucideEye, lucideEyeOff } from '@ng-icons/lucide';

@Component({
  selector: 'app-payment-gateway-form',
  imports: [NgIcon, HlmButton, ReactiveFormsModule, HlmInput, HlmToasterImports],
  templateUrl: './payment-gateway-form.html',
  styleUrl: './payment-gateway-form.css',

  providers: [provideIcons({ lucideEye, lucideEyeOff })],
})
export class PaymentGatewayForm {
  showPassword = false;
  paymentConfig: any = null;
  loginForm = new FormGroup({
    secret_key: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    provider: new FormControl('', [Validators.required]),
  });

  constructor(private readonly paymentService: PaymentGatewayService) {
    this.paymentService.getPaymentGateway().subscribe((res: any) => {
      if (res.length === 0) return;
      this.paymentConfig = res[0];
      this.loginForm.patchValue(res[0]);
    });
  }

  onSubmit = () => {
    if (this.paymentConfig) {
      this.paymentService
        .updatePaymentGateway(
          this.loginForm.getRawValue(),
          this.paymentConfig.id
        )
        .subscribe((res) => (this.paymentConfig = res));
    } else {
      this.paymentService
        .createPaymentGateway(this.loginForm.value)
        .subscribe((res) => (this.paymentConfig = res));
    }
  };
}
