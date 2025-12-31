import { Component, signal } from '@angular/core';
import { PageHeader } from '../../../../shared/components/page-header/page-header';
import { TtsSettings } from './components/tts-settings/tts-settings';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tts',
  imports: [PageHeader, TtsSettings, HlmInputGroupImports, FormsModule],
  templateUrl: './tts.html',
  styleUrl: './tts.css',
})
export class Tts {
  text = signal<string>('');
  textareaMaxLength = signal<number>(2000);

  clearText = () => {
    this.text.set('');
  };

  setDemoText = () => {};
}
