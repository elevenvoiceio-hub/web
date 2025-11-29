import { IVoice } from './../../../../../../core/interfaces/voices.interface';
import { Component, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { remixPlayFill } from '@ng-icons/remixicon';
import { HlmIcon } from "@spartan-ng/helm/icon";
import { HlmButton } from "@spartan-ng/helm/button";

@Component({
  selector: 'app-tts-voice-card',
  imports: [HlmIcon, NgIcon, HlmButton],
  templateUrl: './tts-voice-card.html',
  styleUrl: './tts-voice-card.css',
  viewProviders: [provideIcons({remixPlayFill})],

})
export class TtsVoiceCard {
  voice = input<IVoice>();
  selected = input<boolean>(false);
  disabled = input<boolean>();
  selectVoiceEvent = output<IVoice>();
  playaudio = output<void>();

  copyId = () => {
    navigator.clipboard.writeText(this.voice()?.['voice_id'] ?? '');
  };

  selectVoice = () => {
    if (this.disabled()) {
      return;
    }

    this.selectVoiceEvent.emit(this.voice()!);
  };

  emitPlayAudio = () => {
    this.playaudio.emit();
  }
}
