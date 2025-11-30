import { Component, output, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmSwitch } from '@spartan-ng/helm/switch';
import { DragDropUpload } from '../../../../../shared/components/drag-drop-upload/drag-drop-upload';

@Component({
  selector: 'app-voice-upload-sample',
  imports: [NgIcon, HlmButton, HlmSwitch, DragDropUpload, FormsModule],
  templateUrl: './voice-upload-sample.html',
  styleUrl: './voice-upload-sample.css',
})
export class VoiceUploadSample {
  selectedFile = input<File | null>(null);
  audioURL = input<string | null>(null);
  enhanceWithAI = input<boolean>(true);

  filesDropped = output<File[]>();
  removeFile = output<void>();
  useSample = output<void>();
  enhanceWithAIChange = output<boolean>();

  removeSelected() {
    this.removeFile.emit();
  }

  onEnhanceChange(value: boolean) {
    this.enhanceWithAIChange.emit(value);
  }
}
