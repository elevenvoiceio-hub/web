import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  baseUrl = environment.baseUrl + '/user/';

  constructor(private readonly http: HttpClient) {}

  forgotPassword(requestBody: any) {
    return this.http.post(this.baseUrl + 'forgot-password/', requestBody);
  }

  resetPassword(requestBody: any) {
    return this.http.post(this.baseUrl + 'reset-password/', requestBody);
  }

  resendOTP(requestBody: any) {
    return this.http.post(this.baseUrl + 'resend-password-otp/', requestBody);
  }

}
