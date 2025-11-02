import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IAdminStats } from '../../core/interfaces/dashboard.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.baseUrl + '/subscriptions/';

  constructor(private readonly http: HttpClient) {}

  getAdminPanelDetails() {
    return this.http.get<IAdminStats>(`${this.baseUrl}statistics/`);
  }

}
