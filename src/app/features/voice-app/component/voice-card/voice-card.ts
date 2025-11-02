import { Component, computed, input, model, output } from '@angular/core';
import { HlmCard } from '@spartan-ng/helm/card';
import { randomGradient } from '../../../../shared/utils/gradient.utils';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  remixHeartFill,
  remixHeartLine,
  remixPlayLargeFill,
} from '@ng-icons/remixicon';
import { Router } from '@angular/router';
import { FavouriteService } from '../../../../services/favourite-service/favourite-service';

@Component({
  selector: 'app-voice-card',
  imports: [HlmCard, HlmButton, HlmBadge, NgIcon],
  templateUrl: './voice-card.html',
  styleUrl: './voice-card.css',
  providers: [
    provideIcons({
      remixHeartLine,
      remixHeartFill,
      remixPlayLargeFill,
    }),
  ],
})
export class VoiceCard {
  voice = model<any>();
  gradient = computed(() => randomGradient(this.voice()['voicename']));
  language = input<string>();
  playAudio = output<any>();
  isFavortieVoice = input<boolean>(false);
  removeFavorite = output<void>();
  addFavorite = output<void>();

  constructor(
    private router: Router,
    private favoriteVoiceService: FavouriteService
  ) {}

  copyId = () => {
    navigator.clipboard.writeText(this.voice()['voice_id']);
  };

  useVoice = () => {
    this.router.navigate(['/app/text-to-speech', this.voice()['voice_id']]);
  };

  removeFavourite = () => {
    this.favoriteVoiceService
      .removeFavourite(this.voice()['id'])
      .subscribe({
        next: (res) => {
          this.removeFavorite.emit();
          this.voice.set({ ...this.voice(), is_favourite: false });
        },
        error: (err) => {
          console.error('Error removing favourite voice:', err);
        },
      });
  };

  setFavourite = () => {
    this.favoriteVoiceService.addFavourite(this.voice()['id']).subscribe({
      next: (res) => {
        this.voice.set({ ...this.voice(), is_favourite: true });
        this.addFavorite.emit();
      },
      error: (err) => {
        console.error('Error adding favourite voice:', err);
      },
    });
  };
}
