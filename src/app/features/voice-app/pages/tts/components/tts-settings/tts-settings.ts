import { HlmSwitchImports } from './../../../../../../../../libs/ui/switch/src/index';
import { Component, model } from '@angular/core';
import { HlmTooltipImports } from '@spartan-ng/helm/tooltip';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { BrnTooltipImports } from '@spartan-ng/brain/tooltip';
import { lucideInfo } from '@ng-icons/lucide';
import { HlmLabel } from '@spartan-ng/helm/label';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { TTS_EMOTIONS } from '../../../../../../shared/constants/emotions.constant';
import { MODELS } from '../../../../../../shared/constants/models.constant';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { HlmSliderImports } from '@spartan-ng/helm/slider';
import { CommonModule } from '@angular/common';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';

@Component({
  selector: 'app-tts-settings',
  imports: [
    CommonModule,
    HlmTooltipImports,
    BrnTooltipImports,
    NgIcon,
    HlmIcon,
    HlmLabel,
    BrnSelectImports,
    HlmSelectImports,
    HlmInputGroupImports,
    HlmSliderImports,
    HlmSwitchImports,
    HlmBadgeImports
  ],
  templateUrl: './tts-settings.html',
  styleUrl: './tts-settings.css',
  viewProviders: [provideIcons({ lucideInfo })],
})
export class TtsSettings {
  emotions = TTS_EMOTIONS;
  models = MODELS;

  emotion = model<string>(this.emotions[0]);
  textNormalization = model<boolean>(false);
  pitch = model<number>(50);
  speedRate = model<number>(50);
  model = model(this.models[0]);

  updatePitch = ($event: Event) => {
    const value = Number((<HTMLInputElement>$event.target).value);
    this.pitch.set(value + 50);
  };

  updateSpeedRate = ($event: Event) => {
    const value = Number((<HTMLInputElement>$event.target).value);
    this.speedRate.set(value + 50);
  };
}
