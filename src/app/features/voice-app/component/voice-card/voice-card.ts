import { CommonService } from './../../../../services/common-service/common-service';
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
import { lucideTrash2 } from '@ng-icons/lucide';
import { VoiceCloningService } from '../../../../services/voice-cloning/voice-cloning';

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
      lucideTrash2
    }),
  ],
})
export class VoiceCard {
  voice = model<any>();
  gradient = computed(() => randomGradient(this.voice()['voicename']));
  language = input<string>();
  isCloining = input<boolean>(false);
  playAudio = output<any>();
  isFavortieVoice = input<boolean>(false);
  removeFavorite = output<void>();
  addFavorite = output<void>();
  deleteVoiceEvent = output<void>();

  constructor(
    private router: Router,
    private favoriteVoiceService: FavouriteService,
    private voiceCloningService: VoiceCloningService,
    private commonService: CommonService
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
          this.commonService.setToaster('Failed to remove favourite voice');
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
        this.commonService.setToaster('Failed to add favourite voice');
      },
    });
  };

  deleteVoice = () => {
    this.voiceCloningService.deleteClonedVoice(this.voice()['id']).subscribe({
      next: (res) => {
        console.log('Cloned voice deleted successfully');
        // Optionally, emit an event or update the UI to reflect the deletion
      },
      error: (err) => {
        console.error('Error deleting cloned voice:', err);
        this.commonService.setToaster('Failed to delete cloned voice');
      },
    });
  };
}
