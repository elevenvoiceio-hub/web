import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IClonedVoices } from '../../core/interfaces/cloned.interface';

@Injectable({
  providedIn: 'root',
})
export class VoiceCloningService {
  baseUrl: string = environment.baseUrl + '/voice_cloning/';

  constructor(private http: HttpClient) {}

  cloneVoice(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}create/`, formData);
  }

  getClonedVoices(): Observable<IClonedVoices[]> {
    return this.http.get<IClonedVoices[]>(`${this.baseUrl}clones/`);
  }

  deleteClonedVoice(id: string) {
    return this.http.delete(`${this.baseUrl}${id}/`);
  }

  getClonedVoiceById(id: string) {
    return this.http.get<IClonedVoices>(`${this.baseUrl}${id}/`);
  }
}
