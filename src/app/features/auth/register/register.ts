import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideAudioLines, lucideEye, lucideEyeOff, lucideLock, lucideMail, lucideUser } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { UserService } from '../../../services/user/user-service';
import { IUserRegister } from '../../../core/interfaces/user.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { HlmInput } from '@spartan-ng/helm/input';
import { CommonService } from '../../../services/common-service/common-service';
import { environment } from '../../../../environments/environment';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { HlmSpinner } from "@spartan-ng/helm/spinner";

@Component({
  selector: 'app-register',
  imports: [NgIcon, RouterModule, HlmButton, ReactiveFormsModule, HlmInput, HlmInputGroupImports, HlmSpinner],
  templateUrl: './register.html',
  styleUrl: './register.css',
  providers: [provideIcons({ lucideAudioLines, lucideEye, lucideEyeOff, lucideUser, lucideMail, lucideLock })],
})
export class Register {
  applicationName = environment.applicationName;
  welcomeWebsiteURL = environment.welcomeWebsite;
  showPassword = signal<boolean>(false);
  showRePassword = signal<boolean>(false);
  loading = signal<boolean>(false);

  signUpForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    passwordRepeat: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly commonService: CommonService
  ) {}

  onSubmit = () => {
    const requestBody = this.signUpForm.getRawValue() as IUserRegister;

    this.userService.registerUser(requestBody).subscribe({
      next: () => {
        this.loading.set(true);
        this.router.navigate(['/login'], {
          queryParams: { email: requestBody.email },
        });
      },
      error: (err: HttpErrorResponse) => {
        this.loading.set(false);
        if (err.status === 400) {
          let value = '';
          Object.keys(err.error).forEach((error: any) => {
            value += err.error[error] + '\n';
          });
          this.commonService.setToaster(value);
        } else {
          this.commonService.setToaster('Please try again later.');
        }
      },
    });
  };

}
