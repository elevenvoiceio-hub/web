import { CommonService } from '../../../services/common-service/common-service';
import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideAudioLines, lucideEye, lucideEyeOff, lucideMail } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { ForgotPasswordService } from '../../../services/forgot-password-service/forgot-password-service';
import { environment } from '../../../../environments/environment';
import { HlmButtonGroupImports } from '@spartan-ng/helm/button-group';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { HlmSpinner } from "@spartan-ng/helm/spinner";

@Component({
  selector: 'app-forgot-password',
  imports: [NgIcon, RouterModule, HlmButton, ReactiveFormsModule, HlmButtonGroupImports, HlmInputGroupImports, HlmSpinner],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
  viewProviders: [provideIcons({ lucideAudioLines, lucideMail })],
})
export class ForgotPassword {
  applicationName = environment.applicationName;
  loading = signal<boolean>(false);

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
    this.loading.set(true);
    this.forgotPasswordService
      .forgotPassword(this.forgotPasswordForm.value)
      .subscribe({
        next: () => {
          this.loading.set(false);
          this.router.navigate(['reset-password'], {
            queryParams: { email: this.forgotPasswordForm.value.email },
          });
          this.commonService.setToaster('OTP sent successfully');
        },
        error: (error) => {
          this.loading.set(false);
          this.commonService.setToaster(error.error.error);
        },
      });
  }
}
