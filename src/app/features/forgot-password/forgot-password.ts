import { CommonService } from './../../services/common-service/common-service';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideAudioLines, lucideEye, lucideEyeOff } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';
import { ForgotPasswordService } from '../../services/forgot-password-service/forgot-password-service';

@Component({
  selector: 'app-forgot-password',
  imports: [NgIcon, RouterModule, HlmButton, ReactiveFormsModule, HlmInput],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
  viewProviders: [provideIcons({ lucideAudioLines, lucideEye, lucideEyeOff })],
})
export class ForgotPassword {
  showPassword = false;

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private readonly forgotPasswordService: ForgotPasswordService,
    private readonly router: Router,
    private readonly commonService: CommonService
  ) {}

  rotueTo() {
    this.router.navigate(['reset-password'], {
      queryParams: { email: this.forgotPasswordForm.value.email },
    });
  }
  onSubmit() {
    this.forgotPasswordService
      .forgotPassword(this.forgotPasswordForm.value)
      .subscribe({
        next: () => {
          this.router.navigate(['reset-password'], {
            queryParams: { email: this.forgotPasswordForm.value.email },
          });
          this.commonService.setToaster('OTP sent successfully');
        },
        error: (error) => {
          this.commonService.setToaster(error.error.error);
        },
      });
  }
}
