import { Component } from '@angular/core';
import { DragDropUpload } from '../../../../shared/components/drag-drop-upload/drag-drop-upload';
import { HlmCard } from '@spartan-ng/helm/card';
import { HlmButton } from '@spartan-ng/helm/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideTrash2 } from '@ng-icons/lucide';
import { SttService } from '../../../../services/stt-service/stt-service';

@Component({
  selector: 'app-speech-to-text',
  imports: [DragDropUpload, HlmCard, HlmButton, NgIcon],
  templateUrl: './speech-to-text.html',
  styleUrl: './speech-to-text.css',
  viewProviders: [provideIcons({ lucideTrash2 })],
})
export class SpeechToText {
  uploadedFiles: File | null = null;
  transcriptionResult: any;

  constructor(private sttService: SttService) {}

  onFilesDropped = ($event: File[]) => {
    this.uploadedFiles = $event[0];
  };

  removeFile = () => {
    this.uploadedFiles = null;
  };

  transcribeAudio = () => {
    if (!this.uploadedFiles) return;

    const formData = new FormData();
    formData.append('file', this.uploadedFiles);

    this.sttService.speechToText(formData).subscribe((response) => {
      this.transcriptionResult = response?.text;
    });
  };
}
