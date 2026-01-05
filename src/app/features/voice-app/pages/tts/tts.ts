import { Component, signal } from '@angular/core';
import { PageHeader } from '../../../../shared/components/page-header/page-header';
import { TtsSettings } from './components/tts-settings/tts-settings';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { FormsModule } from '@angular/forms';
import { AudioWaveform } from '../../../../shared/components/audio-waveform/audio-waveform';
import { BrnSheetImports } from '@spartan-ng/brain/sheet';
import { HlmSheetImports } from '@spartan-ng/helm/sheet';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSettings } from '@ng-icons/lucide';
import { ITtsModel } from '../../../../core/interfaces/tts-model.interface';
import { MODELS } from '../../../../shared/constants/models.constant';
import { HlmButton } from '@spartan-ng/helm/button';
import { IVoice } from '../../../../core/interfaces/voices.interface';
import { DEMO_TEXT } from '../../../../shared/constants/demo-text.constant';

@Component({
  selector: 'app-tts',
  imports: [
    PageHeader,
    TtsSettings,
    HlmInputGroupImports,
    FormsModule,
    AudioWaveform,
    BrnSheetImports,
    HlmSheetImports,
    NgIcon,
    HlmButton
  ],
  templateUrl: './tts.html',
  styleUrl: './tts.css',
  viewProviders: [provideIcons({ lucideSettings,  })],
})

export class Tts {
  text = signal<string>('');
  textareaMaxLength = signal<number>(2000);
  file = signal<File | null>(null);
  emotion = signal<string>('');
  model = signal<ITtsModel>(MODELS[0]);
  textNormalization = signal<boolean>(false);
  pitch = signal<number>(50);
  speedRate = signal<number>(50);

  selectedVoice = signal<IVoice | null>(null);

  clearText = () => {
    this.text.set('');
  };

  setDemoText = () => {
    const currentLang = this.selectedVoice()?.language_code.slice(0, 2) || 'en';
    const demoTexts = DEMO_TEXT[currentLang.toLowerCase()] || DEMO_TEXT['en'];
    const randomNumber = Math.floor(Math.random() * demoTexts.length);
    this.text.set(demoTexts[randomNumber]);
  };

  generateSpeech = () => {};
}
