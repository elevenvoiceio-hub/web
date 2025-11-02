import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IFeedback } from '../../core/interfaces/feedback.interface';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  baseUrl = environment.baseUrl + '/feedback/';

  constructor(private http: HttpClient) {}

  getFeebackList() {
    return this.http.get<IFeedback[]>(this.baseUrl);
  }

  sendFeedback(data:any) {
    return this.http.post<IFeedback>(this.baseUrl, data);
  }

  getFeedbackById(id: string) {
    return this.http.get<IFeedback>(`${this.baseUrl}${id}/`);
  }

  updateFeedback(id: number, data: any) {
    return this.http.put<IFeedback>(`${this.baseUrl}${id}/`, data);
  }

  deleteFeedback(id: string) {
    return this.http.delete(`${this.baseUrl}${id}/`);
  }
}
