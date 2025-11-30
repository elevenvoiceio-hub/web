import { Component, input, output, ViewChild } from '@angular/core';
import { AudioRecorder } from '../../../../../shared/components/audio-recorder/audio-recorder';
import { FormsModule } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmSwitch } from '@spartan-ng/helm/switch';

@Component({
  selector: 'app-voice-record-sample',
  imports: [ NgIcon, AudioRecorder, HlmButton, HlmSwitch, FormsModule],
  templateUrl: './voice-record-sample.html',
  styleUrl: './voice-record-sample.css',
})
export class VoiceRecordSample {
  selectedFile = input<File | null>(null);
  audioURL = input<string | null>(null);
  enhanceWithAI = input<boolean>(true);

  removeFile = output<void>();
  useSample = output<void>();
  recordedFile = output<File>();
  enhanceWithAIChange = output<boolean>();

  @ViewChild(AudioRecorder) private audioRecorderComponent!: AudioRecorder;

  removeSelected() {
    this.removeFile.emit();
  }

  emitRecordedFile() {
    // get blob from audio recorder and emit a File
    if (this.audioRecorderComponent) {
      const blob = this.audioRecorderComponent.getAudioBlob();
      if (blob) {
        const file = new File([blob], 'recorded-sample.wav', {
          type: 'audio/wav',
        });
        this.recordedFile.emit(file);
      }
    }
  }

  onEnhanceChange(value: boolean) {
    this.enhanceWithAIChange.emit(value);
  }
}
