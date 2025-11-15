import { Component } from '@angular/core';
import { VoiceCloningCard } from '../../component/voice-cloning-card/voice-cloning-card';
import { IVoice } from '../../../../core/interfaces/voices.interface';
import { VoiceCloningService } from '../../../../services/voice-cloning/voice-cloning';
import { categorizeVoicesOnLocale } from '../../../../shared/utils/categorize.utils';
import { VoiceCard } from '../../component/voice-card/voice-card';
import { IFavorite } from '../../../../core/interfaces/favorites.interface';
import { forkJoin } from 'rxjs';
import { FavouriteService } from '../../../../services/favourite-service/favourite-service';
import { IClonedVoices } from '../../../../core/interfaces/cloned.interface';

@Component({
  selector: 'app-voice-cloning',
  standalone: true,
  imports: [VoiceCloningCard, VoiceCard],
  templateUrl: './voice-cloning.html',
})
export class VoiceCloning {
  clonedVoices: IClonedVoices[] = [];
  filterLanguage: any[] = [];
  favVoiceIds: number[] = [];
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

  deleteVoice = (voice: any) => {
    this.clonedVoices = this.clonedVoices.filter((v) => v.id !== voice.id);
  };

  playAudio(audioElement: HTMLMediaElement, voice: any): void {
    audioElement.pause();
    audioElement.src = voice.sample_url;
    audioElement.play();
  }
}
