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
import { UserService } from '../../services/user/user-service';
import { LocalStorageService } from '../../services/local-storage-service/local-storage-service';
import { environment } from '../../../environments/environment';

@Component({
  imports: [NgIcon, RouterModule, HlmButton, ReactiveFormsModule, HlmInput],
  templateUrl: './login.html',
  styleUrl: './login.css',
  providers: [
    provideIcons({ lucideAudioLines, lucideEye, lucideEyeOff }),
    LocalStorageService,
  ],
})
export class Login {
  applicationName = environment.applicationName;
  welcomeWebsiteURL = environment.welcomeWebsite;
  showPassword = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
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
    this.userService.Login(requestBody).subscribe({
      next: (data) => {
        const userData = { ...data, email: this.loginForm.value.email! };
        this.localStorageService.saveData('user', JSON.stringify(userData));
        this.route.navigate(['/app']);
      },
      error: () => {
        this.commonService.setToaster(
          'Failed to Login. Please try after sometime'
        );
      },
    });
  };
}
