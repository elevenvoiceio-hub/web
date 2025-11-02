import { IVoice } from './../../../../../../core/interfaces/voices.interface';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-tts-voice-card',
  imports: [],
  templateUrl: './tts-voice-card.html',
  styleUrl: './tts-voice-card.css',
})
export class TtsVoiceCard {
  voice = input<IVoice>();
  selected = input<boolean>(false);
  disabled = input<boolean>();
  selectVoiceEvent = output<IVoice>();

  copyId = () => {
    navigator.clipboard.writeText(this.voice()?.['voice_id'] ?? '');
  };

  selectVoice = () => {
    if (this.disabled()) {
      return;
    }

    this.selectVoiceEvent.emit(this.voice()!);
  };
}
