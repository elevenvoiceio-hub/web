import { Component, input, model, signal } from '@angular/core';
import { CommonModule, NgIf, NgTemplateOutlet } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideInfo } from '@ng-icons/lucide';
import { HlmTooltip, HlmTooltipTrigger } from '@spartan-ng/helm/tooltip';
import { BrnTooltipContentTemplate } from '@spartan-ng/brain/tooltip';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmSwitch } from '@spartan-ng/helm/switch';
import { HlmSlider } from '@spartan-ng/helm/slider';
import { HlmBadge } from '@spartan-ng/helm/badge';

@Component({
  selector: 'app-tts-settings',
  imports: [
    CommonModule,
    NgIf,
    NgTemplateOutlet,
    HlmTooltip,
    HlmTooltipTrigger,
    BrnTooltipContentTemplate,
    BrnSelectImports,
    HlmSelectImports,
    HlmSwitch,
    HlmSlider,
    HlmBadge,
    NgIcon,
  ],
  templateUrl: './tts-settings.html',
  styleUrl: './tts-settings.css',
  providers: [provideIcons({ lucideInfo })],
})
export class TtsSettings {
  emotions = input<string[]>([]);
  models = input<any[]>([]);

  emotion = model<string>();
  textNormalization = model<boolean>(false);
  pitch = model<number>(50);
  speedRate = model<number>(50);
  model = model();

  overlay = input<boolean>(false);

  updatePitch = ($event: Event) => {
    const value = Number((<HTMLInputElement>$event.target).value);
    this.pitch.set(value + 50);
  };

  updateSpeedRate = ($event: Event) => {
    const value = Number((<HTMLInputElement>$event.target).value);
    this.speedRate.set(value + 50);
  };
}
