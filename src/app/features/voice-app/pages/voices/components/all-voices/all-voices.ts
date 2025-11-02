import { Component, computed, input, output, signal } from '@angular/core';
import { ALL_VOICES } from '../../../../constants/voices.constant';
import { LOCALE } from '../../../../constants/locale.constant';
import { categorizeVoicesOnLocale } from '../../../../../../shared/utils/categorize.utils';
import { VoiceCard } from '../../../../component/voice-card/voice-card';
import { VoicesService } from '../../../../../../services/voices-service/voices-service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { forkJoin } from 'rxjs';
import { FavouriteService } from '../../../../../../services/favourite-service/favourite-service';
import { IFavorite } from '../../../../../../core/interfaces/favorites.interface';
import { IVoice } from '../../../../../../core/interfaces/voices.interface';

@Component({
  selector: 'app-all-voices',
  imports: [VoiceCard, ScrollingModule],
  templateUrl: './all-voices.html',
  styleUrl: './all-voices.css',
})
export class AllVoices {
  language = input<any>(null);
  gender = input<string>('');
  accent = input<string>('');
  emotion = input<string>('');
  searchText = input<string>('');
  playAudio = output<any>();
  languageFilterArray = output<any>();
  locale: any = LOCALE;
  filterLanguage: any;
  favVoiceIds: number[] = [];

  constructor(
    private voiceService: VoicesService,
    private favoriteVoiceService: FavouriteService
  ) {
    this.getVoices();
  }

  getVoices = () => {
    forkJoin({
      voices: this.voiceService.getVoices(),
      favorites: this.favoriteVoiceService.getFavourites(),
    }).subscribe(
      ({ voices, favorites }: { voices: IVoice[]; favorites: IFavorite }) => {
        this.favVoiceIds = favorites?.favorite_voice_ids
        this.setFilterLanguageData(voices);
      }
    );
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

  setFilterLanguageData = (voices: any) => {
    const value = categorizeVoicesOnLocale(voices);
    this.setLanguagesAvailable(value);
    const ITEMS_RENDERED_AT_ONCE = 2;
    const INTERVAL_IN_MS = 10;

    let currentIndex = 0;
    this.filterLanguage = [];
    const interval = setInterval(() => {
      const nextIndex = currentIndex + ITEMS_RENDERED_AT_ONCE;

      for (let n = currentIndex; n <= nextIndex; n++) {
        if (n >= value.length) {
          clearInterval(interval);
          break;
        }
        this.filterLanguage = [
          ...this.filterLanguage,
          ...value.slice(currentIndex, nextIndex),
        ];
        currentIndex = nextIndex;
      }
    }, INTERVAL_IN_MS);
  };

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

  isFavorite = (voiceId: number) => {
    return this.favVoiceIds.includes(voiceId);
  };

  removeFourite = (voice: any) => {
    this.favVoiceIds = this.favVoiceIds.filter(id => id !== voice.id);
  }

  addFavorite = (voice: any) => {
    this.favVoiceIds = [...this.favVoiceIds, voice.id];
  }
}
