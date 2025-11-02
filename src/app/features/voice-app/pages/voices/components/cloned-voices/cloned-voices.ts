import { Component, input, output } from '@angular/core';
import { LOCALE } from '../../../../constants/locale.constant';
import { VoiceCloningCard } from '../../../../component/voice-cloning-card/voice-cloning-card';
import { VoiceCard } from '../../../../component/voice-card/voice-card';
import { categorizeVoicesOnLocale } from '../../../../../../shared/utils/categorize.utils';
import { forkJoin } from 'rxjs';
import { IClonedVoices } from '../../../../../../core/interfaces/cloned.interface';
import { IFavorite } from '../../../../../../core/interfaces/favorites.interface';
import { IVoice } from '../../../../../../core/interfaces/voices.interface';
import { FavouriteService } from '../../../../../../services/favourite-service/favourite-service';
import { VoiceCloningService } from '../../../../../../services/voice-cloning/voice-cloning';

@Component({
  selector: 'app-cloned-voices',
  imports: [VoiceCloningCard, VoiceCard],
  templateUrl: './cloned-voices.html',
  styleUrl: './cloned-voices.css',
})
export class ClonedVoices {
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

  clonedVoices: IClonedVoices[] = [];
  constructor(
    private voiceCloningService: VoiceCloningService,
    private favoriteVoiceService: FavouriteService
  ) {
    this.voiceCloningService.getClonedVoices().subscribe((data) => {
      this.clonedVoices = data;
      this.setFilterLanguageData(data);
    });
    forkJoin({
      voices: this.voiceCloningService.getClonedVoices(),
      favorites: this.favoriteVoiceService.getFavourites(),
    }).subscribe(
      ({
        voices,
        favorites,
      }: {
        voices: IClonedVoices[];
        favorites: IFavorite;
      }) => {
        this.favVoiceIds = favorites?.favorite_voice_ids;
        const data: IVoice[] = voices.map((voice: IClonedVoices) => {
          return {
            id: voice.id,
            language: voice.language,
            language_code: voice.language,
            voice_code: '',
            voicename: voice.clone_name,
            voice_id: voice.clone_id,
            gender: voice.gender,
            updated_on: '',
            sample_url: '',
            style_list: '',
            is_active: true,
            model: voice.voice_cloning_model,
          };
        });
        this.setFilterLanguageData(data);
      }
    );
  }

  setFilterLanguageData = (voices: any) => {
    const value = categorizeVoicesOnLocale(voices);
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

  isFavorite = (voiceId: number) => {
    return this.favVoiceIds.includes(voiceId);
  };

  removeFourite = (voice: any) => {
    this.favVoiceIds = this.favVoiceIds.filter((id) => id !== voice.id);
  };

  addFavorite = (voice: any) => {
    this.favVoiceIds = [...this.favVoiceIds, voice.id];
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
}
