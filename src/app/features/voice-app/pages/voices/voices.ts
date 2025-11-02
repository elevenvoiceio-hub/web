import { Component, signal } from '@angular/core';
import { VoicesFilter } from '../../component/voices-filter/voices-filter';
import {
  HlmTabs,
  HlmTabsContent,
  HlmTabsList,
  HlmTabsTrigger,
} from '@spartan-ng/helm/tabs';
import { AllVoices } from './components/all-voices/all-voices';
import { ClonedVoices } from './components/cloned-voices/cloned-voices';
import { FavoriteVoices } from './components/favorite-voices/favorite-voices';

@Component({
  selector: 'app-voices',
  imports: [
    VoicesFilter,
    HlmTabs,
    HlmTabsContent,
    HlmTabsList,
    HlmTabsTrigger,
    AllVoices,
    ClonedVoices,
    FavoriteVoices,
  ],
  templateUrl: './voices.html',
  styleUrl: './voices.css',
})
export class Voices {
  language = signal<any>(null);
  gender = signal<string>('');
  searchText = signal<string>('');
  tab = 'all';

  languagesFilterArray = signal<any[]>([]);

  playAudio(audioElement: HTMLMediaElement, voice: any): void {
    audioElement.pause();
    audioElement.src = voice.sample_url;
    audioElement.play();
  }
}
