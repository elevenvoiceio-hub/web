import { FavouriteService } from './../../../../../services/favourite-service/favourite-service';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmButton } from '@spartan-ng/helm/button';
import {
  BrnDialog,
  BrnDialogContent,
  BrnDialogTrigger,
} from '@spartan-ng/brain/dialog';
import {
  HlmDialog,
  HlmDialogContent,
  HlmDialogHeader,
  HlmDialogTitle,
} from '@spartan-ng/helm/dialog';
import { HlmInputImports } from '@spartan-ng/helm/input';
import {
  HlmTabs,
  HlmTabsContent,
  HlmTabsList,
  HlmTabsTrigger,
} from '@spartan-ng/helm/tabs';
import { VoicesService } from '../../../../../services/voices-service/voices-service';
import {
  Component,
  model,
  OnDestroy,
  OnInit,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { Location } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown, lucideSearch } from '@ng-icons/lucide';

import { IVoice } from '../../../../../core/interfaces/voices.interface';

import { FormsModule } from '@angular/forms';

import { categorizeVoicesOnLocale } from '../../../../../shared/utils/categorize.utils';
import { TtsVoiceCard } from './tts-voice-card/tts-voice-card';
import { VoiceCloningService } from '../../../../../services/voice-cloning/voice-cloning';
import { forkJoin } from 'rxjs';
import { IFavorite } from '../../../../../core/interfaces/favorites.interface';
import { IClonedVoices } from '../../../../../core/interfaces/cloned.interface';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';

@Component({
  selector: 'app-tts-voices',
  imports: [
    HlmIcon,
    NgIcon,
    HlmButton,
    BrnDialogTrigger,
    BrnDialogContent,
    HlmDialog,
    HlmDialogContent,
    HlmDialogHeader,
    HlmDialogTitle,
    FormsModule,
    HlmInputImports,
    HlmTabs,
    HlmTabsContent,
    HlmTabsList,
    HlmTabsTrigger,
    TtsVoiceCard,
    BrnSelectImports,
    HlmSelectImports,
  ],
  templateUrl: './tts-voices.html',
  styleUrl: './tts-voices.css',
  viewProviders: [provideIcons({ lucideChevronDown, lucideSearch })],
})
export class Voices implements OnInit, OnDestroy {
  private currentAudio: HTMLAudioElement | null = null;

  voices: IVoice[] = [];
  selectedVoice = model<IVoice | null>(null);
  searchText = '';
  tab = 'all';
  filterLanguage: any;
  filterLanguageCloning: any;
  selectVoice = output<IVoice | null>();
  clonedVoices: IVoice[] = [];

  public viewchildDialogRef = viewChild(BrnDialog);
  favVoiceIds: number[] = [];
  filteredVocies: any;

  languages: any[] = [];
  genders = ['Any', 'Male', 'Female'];

  language = signal<any>(null);
  gender = signal('Any');

  constructor(
    private voicesService: VoicesService,
    private clonedVoiceService: VoiceCloningService,
    private favouriteService: FavouriteService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getAllVoices();
  }

  getAllVoices() {
    forkJoin({
      voices: this.voicesService.getVoices(),
      favorites: this.favouriteService.getFavourites(),
      cloned: this.clonedVoiceService.getClonedVoices(),
    }).subscribe(
      ({
        voices,
        favorites,
        cloned,
      }: {
        voices: IVoice[];
        favorites: IFavorite;
        cloned: IClonedVoices[];
      }) => {
        this.favVoiceIds = favorites?.favorite_voice_ids;
        const data: IVoice[] = cloned.map((voice: IClonedVoices) => {
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
        const filteredVoices = voices.filter((voice: any) =>
          favorites?.favorite_voice_ids.includes(voice.id)
        );
        this.filteredVocies = categorizeVoicesOnLocale(filteredVoices);
        this.setFilterLanguageDataCloning(data);
        this.setFilterLanguageData(voices);
      }
    );
    this.voicesService.getVoices().subscribe((data) => {
      this.setFilterLanguageData(data);

      if (data.length > 0 && !this.selectedVoice()) {
        this.selectedVoice.set(data[0]);
        this.location.replaceState(`app/text-to-speech/${data[0].voice_id}`);
      }
    });
  }

  showVoice = (voice: any) => {
    return (
      (voice?.['voicename']
        ?.toLowerCase()
        .includes(this.searchText?.toLowerCase()) ||
        this.searchText === '' ||
        !this.searchText) &&
      (this.gender() === 'Any' ||
        voice?.['gender'].toLowerCase() === this.gender().toLowerCase())
    );
  };

  setFilterLanguageData = (voices: any) => {
     voices.sort((a: IVoice, b: IVoice) => {
      return a.id - b.id;
    });
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

  setFilterLanguageDataCloning = (voices: any) => {
    voices.sort((a: IVoice, b: IVoice) => {
      return a.id - b.id;
    });
    const value = categorizeVoicesOnLocale(voices);
    const ITEMS_RENDERED_AT_ONCE = 2;
    const INTERVAL_IN_MS = 10;

    let currentIndex = 0;
    this.filterLanguageCloning = [];
    const interval = setInterval(() => {
      const nextIndex = currentIndex + ITEMS_RENDERED_AT_ONCE;

      for (let n = currentIndex; n <= nextIndex; n++) {
        if (n >= value.length) {
          clearInterval(interval);
          break;
        }
        this.filterLanguageCloning = [
          ...this.filterLanguageCloning,
          ...value.slice(currentIndex, nextIndex),
        ];
        currentIndex = nextIndex;
      }
    }, INTERVAL_IN_MS);
  };

  voiceSelection = (voice: IVoice) => {
    this.selectVoice.emit(voice);
    this.location.replaceState(`app/text-to-speech/${voice.voice_id}`);
    this.viewchildDialogRef()?.close({});
  };

  setLanguagesAvailable = (languages: any) => {
    const languageArray: any[] = [];
    languages.forEach((language: any) => {
      languageArray.push({
        name: language.language,
        country: language.country,
        code: language.locale,
      });
    });
    this.languages = languageArray;
  };

  playAudioEvent(audioSrc: string): void {
    // Pause any currently playing audio
    if (this.currentAudio && !this.currentAudio.paused) {
      this.currentAudio.pause();
    }

    // Create and play the new audio
    this.currentAudio = new Audio(audioSrc);
    this.currentAudio.load(); // Optional: Preload the audio
    this.currentAudio.play();
  }

  ngOnDestroy(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
  }
}
