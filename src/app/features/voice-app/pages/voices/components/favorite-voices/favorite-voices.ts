import { Component, input, output } from '@angular/core';
import { categorizeVoicesOnLocale } from '../../../../../../shared/utils/categorize.utils';
import { LOCALE } from '../../../../constants/locale.constant';
import { VoiceCard } from '../../../../component/voice-card/voice-card';
import { FavouriteService } from '../../../../../../services/favourite-service/favourite-service';
import { forkJoin } from 'rxjs';
import { VoicesService } from '../../../../../../services/voices-service/voices-service';
import { IVoice } from '../../../../../../core/interfaces/voices.interface';
import { IFavorite } from '../../../../../../core/interfaces/favorites.interface';

@Component({
  selector: 'app-favorite-voices',
  imports: [VoiceCard],
  templateUrl: './favorite-voices.html',
  styleUrl: './favorite-voices.css',
})
export class FavoriteVoices {
  language = input<any>(null);
  gender = input<string>('');
  searchText = input<string>('');
  playAudio = output<any>();

  languageFilterArray = output<any>();

  voices: any[] = [];
  locale: any = LOCALE;

  constructor(private favoriteVoiceService: FavouriteService, private voicesService: VoicesService) {}

  ngOnInit() {
    this.getVoicesandFavorites();
  }

  getVoicesandFavorites = () => {
    forkJoin({
      voices: this.voicesService.getVoices(),
      favorites: this.favoriteVoiceService.getFavourites()
    }).subscribe(({ voices, favorites }: {voices: IVoice[], favorites: IFavorite}) => {
      const filteredVoices = voices.filter((voice: any) =>  favorites?.favorite_voice_ids.includes(voice.id));
      this.voices = categorizeVoicesOnLocale(filteredVoices);
      this.setLanguagesAvailable(this.voices);
    });
  }

    setLanguagesAvailable = (languages: any) => {
    const languageArray: any[] = [];
    languages.forEach((language: any) => {
      languageArray.push({
        name: language.language,
        country: language.country,
      });
    });
    this.languageFilterArray.emit(languageArray);
  };

  showVoice = (voice: any) => {
    return (
      (voice?.['gender'] === this.gender()?.toLowerCase() ||
        this.gender() === 'Any' ||
        this.gender() === '') &&
      (voice?.['voicename']
        ?.toLowerCase()
        .includes(this.searchText()?.toLowerCase()) ||
        this.searchText() === '' ||
        !this.searchText())
    );
  };

  removeFavourite = (voice: any) => {
    this.voices = this.voices.map((category) => {
      return {
        ...category,
        voices: category.voices.filter(
          (item: any) => item.voice_id !== voice.voice_id
        ),
      };
    }).filter(category => category.voices.length > 0);
  }
}
