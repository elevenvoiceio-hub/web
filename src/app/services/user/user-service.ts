import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IUser,
  IUserLogin,
  IUserRegister,
  IVerifyEmail,
} from '../../core/interfaces/user.interface';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { IMySubscription } from '../../core/interfaces/subscription.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.baseUrl + '/user/';
  $userDetails = new BehaviorSubject<any>(null);
  $userSubscription = new BehaviorSubject<IMySubscription| null>(null);

  constructor(private readonly http: HttpClient) {}

  get UserDetails() {
    return this.$userDetails;
  }

  set UserDetailsData(data: any) {
    this.$userDetails.next(data);
  }

  get UserSubscription() {
    return this.$userSubscription;
  }

  set UserSubscriptionData(data: any) {
    this.$userSubscription.next(data);
  }

  registerUser(requestBody: IUserRegister) {
    return this.http.post(`${this.baseUrl}register/`, requestBody);
  }

  VerifyEmail(requestBody: IVerifyEmail) {
    return this.http.post(`${this.baseUrl}verify-email/`, requestBody);
  }

  Login(requestBody: IUserLogin) {
    return this.http.post(`${this.baseUrl}login/`, requestBody);
  }

  Logout() {
    return this.http.post(`${this.baseUrl}logout/`, {});
  }

  getProfile(email: string) {
    let params = new HttpParams();
    params = params.append('email', email);
    return this.http.get(`${this.baseUrl}search/`, { params: params });
  }

  getUserData() {
    return this.http.get<IUser>(`${this.baseUrl}me/`);
  }

  getUsers() {
    return this.http.get(`${this.baseUrl}`);
  }

  addUser(requestBody: any) {
    return this.http.post(`${this.baseUrl}create-user/`, requestBody);
  }

  updateUser(requestBody: any) {
    return this.http.put<IUser>(`${this.baseUrl}update-profile/`, requestBody);
  }

  deleteUser(userId: number) {
    return this.http.delete(`${this.baseUrl}${userId}/`);
  }

  updateUserRole(userId: number, role: string) {
    return this.http.put(`${this.baseUrl}update-role/${userId}/`, { role });
  }
}
