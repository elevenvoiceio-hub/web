import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IVoice } from '../../core/interfaces/voices.interface';

@Injectable({
  providedIn: 'root',
})
export class VoicesService {
  baseUrl: string = environment.baseUrl + '/voices/';

  constructor(private http: HttpClient) {}

  getVoices() {
    return this.http.get<IVoice[]>(this.baseUrl);
  }

  getVoiceById(id: string) {
    return this.http.get<IVoice>(`${this.baseUrl}voice/${id}`);
  }

  createVoice(voiceData: any) {
    return this.http.post(this.baseUrl, voiceData);
  }

  updateVoice(id: string, voiceData: any) {
    return this.http.put(`${this.baseUrl}${id}`, voiceData);
  }

  deleteVoice(id: string) {
    return this.http.delete(`${this.baseUrl}${id}`);
  }

  searchVoices(query: string) {
    return this.http.get(`${this.baseUrl}filter/`, { params: { q: query } });
  }

  getVoiceLanguages(id: string) {
    return this.http.get(`${this.baseUrl}${id}/languages/`);
  }

  getLanguageVoices(languageId: string) {
    return this.http.get(`${this.baseUrl}language/${languageId}/`);
  }

  getActiveVoices() {
    return this.http.get(`${this.baseUrl}active/`);
  }

  toggleVoiceActivation(requestBody: any) {
    return this.http.post(`${this.baseUrl}toggle/`, requestBody);
  }

  toggleVoiceByLanguage(requestBody: any) {
    return this.http.post(`${this.baseUrl}toggle-language/`, requestBody);
  }

  getUserVoiceById(userId: string) {
    return this.http.get(`${this.baseUrl}voice/${userId}/`);
  }
}
