import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {
  IAzureResponse,
  IElevenLabsResponse,
  IGcpResponse,
  ISpeechifyResponse,
} from '../../core/interfaces/tts-response.interface';

@Injectable({
  providedIn: 'root',
})
export class TtsService {
  baseUrl = environment.baseUrl + '/tts/';

  constructor(private readonly http: HttpClient) {}

  generateSpeechAzure(data: any): Observable<IAzureResponse> {
    return this.http.post<IAzureResponse>(`${this.baseUrl}azure/`, data);
  }

  generateSpeechGoogle(data: any): Observable<IGcpResponse> {
    return this.http.post<IGcpResponse>(`${this.baseUrl}gcp/`, data);
  }

  generateSpeechSpeechify(data: any): Observable<ISpeechifyResponse> {
    return this.http.post<ISpeechifyResponse>(
      `${this.baseUrl}speechify/`,
      data
    );
  }

  generateSpeechElevenLabs(data: any): Observable<IElevenLabsResponse> {
    return this.http.post<IElevenLabsResponse>(
      `${this.baseUrl}elevenlabs/`,
      data
    );
  }

  generateSpeechLemonfox(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}lemonfox/`, data);
  }

  generateSpeechGenAIPro(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}genaipro/`, data);
  }
}
