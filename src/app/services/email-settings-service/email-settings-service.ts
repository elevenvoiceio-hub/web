import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailSettingsService {
  baseUrl = environment.baseUrl + '/email/configs/';

  constructor(private readonly http: HttpClient) {}

  getEmailSettings() {
    return this.http.get(this.baseUrl);
  }

  createEmailSettings(requestBody: any) {
    return this.http.post(this.baseUrl, requestBody);
  }

  updateEmailSettings(requestBody: any, id: string) {
    return this.http.put(`${this.baseUrl}${id}/`, requestBody);
  }

  getEmailSettingsById(id: string) {
    return this.http.get(`${this.baseUrl}${id}/`);
  }

  getDefaultEmailSettings() {
    return this.http.get(`${this.baseUrl}default/`);
  }
}
