import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SttService {
  baseUrl = environment.baseUrl + '/stt/';

  constructor(private readonly http: HttpClient) {}

  speechToText(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }
}
