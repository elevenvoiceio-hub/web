import { HttpClient, HttpBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {
  IAzureResponse,
  IElevenLabsResponse,
  IGcpResponse,
  IGenAIProResponse,
  ISpeechifyResponse,
} from '../../core/interfaces/tts-response.interface';

@Injectable({
  providedIn: 'root',
})
export class TtsService {
  baseUrl = environment.baseUrl + '/tts/';

  private readonly httpWithoutInterceptor: HttpClient;

  constructor(
    private readonly http: HttpClient,
    private readonly handler: HttpBackend
  ) {
    this.httpWithoutInterceptor = new HttpClient(handler);
  }

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

  generateSpeechGenAIPro(data: any): Observable<IGenAIProResponse> {
    return this.http.post<any>(`${this.baseUrl}labs/tts/`, data);
  }

  getGenAIProTaskStatus(taskId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}labs/task/${taskId}`);
  }

  getaudiofile(url: string): Observable<Blob> {
    return this.httpWithoutInterceptor.get(url, { responseType: 'blob' });
  }
}
