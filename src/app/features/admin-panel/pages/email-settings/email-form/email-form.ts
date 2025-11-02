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
import { NgIcon, provideIcons } from '@ng-icons/core';



import { EmailSettingsService } from '../../../../../services/email-settings-service/email-settings-service';
import { lucideEye, lucideEyeOff } from '@ng-icons/lucide';

@Component({
  selector: 'app-email-form',
  imports: [NgIcon, HlmButton, ReactiveFormsModule, HlmInput, HlmToasterImports],
  templateUrl: './email-form.html',
  styleUrl: './email-form.css',
  providers: [provideIcons({ lucideEye, lucideEyeOff })],
})
export class EmailForm {
  showPassword = false;
  emailConfig: any = null;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    host: new FormControl('', [Validators.required]),
    port: new FormControl('', [Validators.required]),
    provider: new FormControl('', [Validators.required]),
  });

  constructor(private readonly emailService: EmailSettingsService) {
    this.emailService.getEmailSettings().subscribe((res: any) => {
      if (res.length === 0) return;
      this.emailConfig = res[0];
      this.loginForm.patchValue(res[0]);
    });
  }

  onSubmit = () => {
    if (this.emailConfig) {
      this.emailService
        .updateEmailSettings(this.loginForm.getRawValue(), this.emailConfig.id)
        .subscribe((res) => (this.emailConfig = res));
    } else {
      this.emailService
        .createEmailSettings(this.loginForm.value)
        .subscribe((res) => (this.emailConfig = res));
    }
  };
}
