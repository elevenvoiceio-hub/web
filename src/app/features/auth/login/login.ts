import { CommonService } from '../../../services/common-service/common-service';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
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
import { UserService } from '../../../services/user/user-service';
import { LocalStorageService } from '../../../services/local-storage-service/local-storage-service';
import { environment } from '../../../../environments/environment';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';

@Component({
  imports: [
    NgIcon,
    RouterModule,
    HlmButton,
    ReactiveFormsModule,
    HlmInput,
    HlmInputGroupImports,
    HlmSpinnerImports,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
  providers: [
    provideIcons({ lucideAudioLines, lucideEye, lucideEyeOff, lucideMail, lucideLock }),
    LocalStorageService,
  ],
})
export class Login {
  applicationName = environment.applicationName;
  welcomeWebsiteURL = environment.welcomeWebsite;
  showPassword = signal<boolean>(false);
  loading = signal<boolean>(false);
  errorMessage = signal<string>('');

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(
    private readonly userService: UserService,
    private readonly localStorageService: LocalStorageService,
    private readonly route: Router,
    private readonly commonService: CommonService
  ) {
    this.localStorageService.clearData();
  }

  onSubmit = () => {
    const requestBody = {
      login: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    };
    this.errorMessage.set('');
    this.userService.Login(requestBody).subscribe({
      next: (data) => {
        this.loading.set(true);
        this.loginForm.disable();
        const userData = { ...data, email: this.loginForm.value.email! };
        this.localStorageService.saveData('user', JSON.stringify(userData));
        this.route.navigate(['/app']);
      },
      error: (e) => {
        this.loading.set(false);
        this.loginForm.enable();
        if (e?.error?.detail.non_field_errors[0] === 'Invalid login credentials.') {
          this.errorMessage.set('Invalid email or password');
        } else {
          this.commonService.setToaster('Failed to Login. Please try after sometime');
        }
      },
    });
  };
}
