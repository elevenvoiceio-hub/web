import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmLabel } from '@spartan-ng/helm/label';
import { HlmRadioGroupImports } from '@spartan-ng/helm/radio-group';
import { HlmSelectImports } from '@spartan-ng/helm/select';

@Component({
  selector: 'app-voice-save-form',
  imports: [ HlmLabel,
    FormsModule,
    HlmButton,
    HlmSelectImports,
    HlmRadioGroupImports,
    BrnSelectImports,
    NgIcon,],
  templateUrl: './voice-save-form.html',
  styleUrl: './voice-save-form.css',
})
export class VoiceSaveForm {
  voiceData = input<any>({ name: '', language: '', gender: 'male' });
  languages = input<any[]>([]);
  audioURL = input<string | null>(null);

  save = output<void>();
  removeFile = output<void>();
}
