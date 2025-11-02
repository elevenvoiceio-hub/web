import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideAudioLines } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmToaster } from '@spartan-ng/helm/sonner';
import { UserService } from '../../services/user/user-service';
import { IVerifyEmail } from '../../core/interfaces/user.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { toast } from 'ngx-sonner';
import { ActivatedRoute, Router } from '@angular/router';
import { HlmInput } from '@spartan-ng/helm/input';

@Component({
  selector: 'app-verify-email',
  imports: [
    HlmToaster,
    NgIcon,
    HlmButton,
    FormsModule,
    HlmInput,
  ],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.css',
  providers: [provideIcons({ lucideAudioLines })],
})
export class VerifyEmail {
  otp = '';
  email = '';

  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.email = params['email'];
    });
  }

  onSubmit = () => {
    const requestBody = {
      email: this.email,
      code: this.otp,
    } as IVerifyEmail;
    this.userService.VerifyEmail(requestBody).subscribe({
      next: () => {
        toast.success('Email verified successfully');
        this.router.navigate(['/login']);
      },
      error: (err: HttpErrorResponse) => {
        toast('Email verification failed');
      },
    });
  };
}
