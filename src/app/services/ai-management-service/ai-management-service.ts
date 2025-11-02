import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AiManagementService {
  baseUrl = environment.baseUrl + '/model/configurations/';
  voiceBaseUrl = environment.baseUrl + '/model/';

  constructor(private http: HttpClient) {}

  getAiModels() {
    return this.http.get<any[]>(this.baseUrl);
  }

  createAiModel(requestBody: any) {
    return this.http.post<any>(this.baseUrl, requestBody);
  }

  updateAiModel(requestBody: any) {
    return this.http.put<any>(this.baseUrl, requestBody);
  }
  deleteAiModel(modelId: string) {
    return this.http.delete<any>(`${this.baseUrl}`, { body: { id: modelId } });
  }

  getActiveAiModels() {
    return this.http.get<any[]>(`${this.baseUrl}active/`);
  }

  updateAiModelStatus(requestBody: any) {
    return this.http.post<any>(`${this.baseUrl}toggle/`, requestBody);
  }

  getVoicesForModel(modelId: string) {
    return this.http.get<any[]>(`${this.voiceBaseUrl}${modelId}/voices`);
  }
}
