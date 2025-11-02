import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IFavorite } from '../../core/interfaces/favorites.interface';

@Injectable({
  providedIn: 'root',
})
export class FavouriteService {
  baseUrl = environment.baseUrl + '/user/';

  constructor(private http: HttpClient) {}

  getFavourites(): Observable<IFavorite> {
    return this.http.get<IFavorite>(this.baseUrl + 'favorite-voice/');
  }

  addFavourite(voiceId: string) {
    return this.http.post(this.baseUrl + 'favorite-voice/', {voice_id: voiceId});
  }

  removeFavourite(voiceId: string) {
    return this.http.delete(this.baseUrl + `remove-favorite-voice/${voiceId}`);
  }
}
