import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IPlan } from '../../core/interfaces/plan.interface';
import { IMySubscription } from '../../core/interfaces/subscription.interface';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionsService {
  baseUrl = environment.baseUrl + '/subscriptions/';

  constructor(private readonly http: HttpClient) {}

  getSubscriptions() {
    return this.http.get<IPlan[]>(this.baseUrl);
  }

  addSubscription(data: any) {
    return this.http.post(this.baseUrl, data);
  }

  updateSubscription(data: any) {
    return this.http.put(this.baseUrl, data);
  }

  deleteSubscription(data: any) {
    return this.http.delete(this.baseUrl, { body: data });
  }

  assignSubscriptionToUser(data: any) {
    return this.http.post(`${this.baseUrl}assign/`, data);
  }

  checkSubscription(email: string) {
    return this.http.get(`${this.baseUrl}check/${email}/`);
  }

  checkDefaultCharacterLimit(email: string) {
    return this.http.get(`${this.baseUrl}default-character-limit/${email}/`);
  }

  checkUserSubscription() {
    return this.http.get<IMySubscription>(`${this.baseUrl}me/`);
  }

  revokeSubscription(data: any) {
    return this.http.post(`${this.baseUrl}revoke/`, data);
  }

  subscribeToPlan(data: any) {
    return this.http.post(`${this.baseUrl}subscribe/`, data);
  }
}
