import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircleStop, lucideMic } from '@ng-icons/lucide';

@Component({
  selector: 'app-audio-recorder',
  standalone: true,
  imports: [
    NgIcon
],
  providers: [provideIcons({ lucideMic, lucideCircleStop })],
  templateUrl: './audio-recorder.html',
  styleUrl: './audio-recorder.css',
})
export class AudioRecorder implements OnDestroy {
  // The rest of your component logic remains exactly the same
  @Output() recordingReady = new EventEmitter<Blob>();

  isRecording = false;
  recordedAudioUrl: SafeUrl | null = null;
  recordingTime = '00:00';
  private timerInterval: any = null;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private stream: MediaStream | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  async startRecording() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.isRecording = true;
      this.audioChunks = [];
      this.mediaRecorder = new MediaRecorder(this.stream);

      let seconds = 0;
      this.recordingTime = '00:00'; // Reset timer on start
      this.timerInterval = setInterval(() => {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
        this.recordingTime = `${formattedMinutes}:${formattedSeconds}`;
      }, 1000);

      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        this.recordedAudioUrl = this.sanitizer.bypassSecurityTrustUrl(url);
        this.isRecording = false;
      };

      this.mediaRecorder.start();
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  }

  public getAudioBlob(): Blob | null {
    if (this.audioChunks.length > 0) {
      const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
      return audioBlob;
    }
    // Return null if no recording is available
    console.error('No audio has been recorded.');
    return null;
  }

  stopRecording() {
    clearInterval(this.timerInterval);
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
    }
  }

  recordAgain() {
    this.recordedAudioUrl = null;
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval);
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
    }
    if (this.recordedAudioUrl) {
      URL.revokeObjectURL(this.recordedAudioUrl.toString());
    }
  }
}
