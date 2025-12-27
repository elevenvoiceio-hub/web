import { HttpErrorResponse } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideAudioLines,
  lucideEye,
  lucideEyeOff,
  lucideLock,
  lucideMail,
} from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';
import { CommonService } from '../../../services/common-service/common-service';
import { ForgotPasswordService } from '../../../services/forgot-password-service/forgot-password-service';
import { HlmLabel } from '@spartan-ng/helm/label';
import { environment } from '../../../../environments/environment';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import {
  HlmInputOtp,
  HlmInputOtpGroup,
  HlmInputOtpImports,
  HlmInputOtpSlot,
} from '@spartan-ng/helm/input-otp';
import { BrnInputOtp } from '@spartan-ng/brain/input-otp';

@Component({
  selector: 'app-reset-password',
  imports: [
    NgIcon,
    RouterModule,
    HlmButton,
    ReactiveFormsModule,
    HlmInput,
    HlmLabel,
    HlmInputGroupImports,
    BrnInputOtp,
    HlmInputOtp,
    HlmInputOtpGroup,
    HlmInputOtpSlot,
  ],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
  providers: [provideIcons({ lucideAudioLines, lucideEye, lucideEyeOff, lucideMail, lucideLock })],
})
export class ResetPassword {
  applicationName = environment.applicationName;
  welcomeWebsiteURL = environment.welcomeWebsite;
  showPassword = signal<boolean>(false);
  showRePassword = signal<boolean>(false);

  resetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    new_password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordRepeat: new FormControl('', [Validators.required, Validators.minLength(6)]),
    code: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  email: string = '';

  constructor(
    private readonly forgotPasswordService: ForgotPasswordService,
    private readonly router: Router,
    private readonly commonService: CommonService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.email = params['email'];
      this.resetPasswordForm.patchValue({ email: this.email });
    });
  }

  onSubmit = () => {
    const requestBody = this.resetPasswordForm.getRawValue();

    this.forgotPasswordService.resetPassword(requestBody).subscribe({
      next: () => {
        this.commonService.setToaster('Password reset successfully');
        this.router.navigate(['login']);
      },
      error: (err: HttpErrorResponse) => {
        this.commonService.setToaster(err.error.error);
      },
    });
  };

  resendOTP() {
    this.forgotPasswordService.resendOTP(this.resetPasswordForm.value).subscribe({
      next: () => {
        this.commonService.setToaster('OTP sent successfully');
      },
      error: (error) => {
        this.commonService.setToaster(error.error.error);
      },
    });
  }
}
