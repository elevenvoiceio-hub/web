import { Component, inject } from '@angular/core';
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
import { UserService } from '../../services/user/user-service';
import { IUserRegister } from '../../core/interfaces/user.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { HlmInput } from '@spartan-ng/helm/input';
import { CommonService } from '../../services/common-service/common-service';

@Component({
  selector: 'app-sign-up',
  imports: [
    NgIcon,
    RouterModule,
    HlmButton,
    ReactiveFormsModule,
    HlmInput,
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
  providers: [provideIcons({ lucideAudioLines, lucideEye, lucideEyeOff })],
})
export class SignUp {
  showPassword = false;
  showRePassword = false;

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
        this.router.navigate(['/login'], {
          queryParams: { email: requestBody.email },
        });
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 400) {
          let value = '';
          Object.keys(err.error).forEach((error: any) => {
            value += err.error[error] + '\n';
          });
          this.commonService.setToaster(value);
        } else {
          this.commonService.setToaster('User already exists');
        }
      },
    });
  };
}
