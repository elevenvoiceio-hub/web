import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PaymentGatewayService {
  baseUrl = environment.baseUrl + '/payment/configs/';

  constructor(private readonly http: HttpClient) {}

  getPaymentGateway() {
    return this.http.get(this.baseUrl);
  }

  createPaymentGateway(requestBody: any) {
    return this.http.post(this.baseUrl, requestBody);
  }

  updatePaymentGateway(requestBody: any, id: string) {
    return this.http.put(`${this.baseUrl}${id}/`, requestBody);
  }

  getPaymentGatewayById(id: string) {
    return this.http.get(`${this.baseUrl}${id}/`);
  }

  deletePaymentGateway(id: string) {
    return this.http.delete(`${this.baseUrl}${id}/`);
  }

  getDefaultPaymentGateway() {
    return this.http.get(`${this.baseUrl}default/`);
  }
}
