import { Component, input, model, effect, computed } from '@angular/core';
import { AudioService } from '../../../../services/audio-service/audio-service';
import { CommonModule } from '@angular/common';
import { saveAs } from 'file-saver';
import { HlmButton } from '@spartan-ng/helm/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { remixPlayFill } from '@ng-icons/remixicon';
import { lucideDownload, lucidePauseCircle } from '@ng-icons/lucide';

@Component({
  selector: 'app-audio-waveform',
  imports: [CommonModule, HlmButton, NgIcon],
  templateUrl: './audio-waveform.html',
  styleUrl: './audio-waveform.css',
  viewProviders: [
    provideIcons({ remixPlayFill, lucideDownload, lucidePauseCircle }),
  ],
})
export class AudioWaveform {
  file = input<File | null>(null);
  // store a lightweight signature of the last-processed file to avoid
  // duplicate effect invocations for repeated selections of the same file
  private lastProcessedFileSignature: string | null = null;


  constructor(public audio: AudioService) {
    effect(() => {
      const f = this.file();
      // clear cached signature when file becomes null so a later selection can be processed
      if (!f) {
        this.lastProcessedFileSignature = null;
        return;
      }
      const signature = `${f.name}:${f.size}:${f.lastModified}`;
      if (signature === this.lastProcessedFileSignature) return;
      this.lastProcessedFileSignature = signature;
      this.onFileSelected(f);
    });
  }

  onFileSelected(file: File | null) {
    if (file) this.audio.decodeUploadedFile(file);
  }

  downloadAudio(audio: File | null) {
    if (!audio) return;
    saveAs(audio, audio.name);
  }

  togglePlayback() {
    this.audio.togglePlayback(this.audio.uploadedAudioBuffer(), 'uploadCanvas');
  }
}
