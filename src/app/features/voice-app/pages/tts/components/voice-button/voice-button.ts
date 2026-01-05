import { Component, model } from '@angular/core';
import { IVoice } from '../../../../../../core/interfaces/voices.interface';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown } from '@ng-icons/lucide';

@Component({
  selector: 'app-voice-button',
  imports: [NgIcon],
  templateUrl: './voice-button.html',
  styleUrl: './voice-button.css',
  viewProviders: [provideIcons({ lucideChevronDown })],
})
export class VoiceButton {
  selectedVoice = model<IVoice | null>(null);
}
