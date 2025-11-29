import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  // --- Global State Signals (shared by components) ---
  view = signal<'upload' | 'record'>('upload');
  message = signal<string>('');
  messageType = signal<'info' | 'error'>('info');
  isLoading = signal<boolean>(false);

  // --- Upload View State ---
  uploadedAudioBuffer = signal<AudioBuffer | null>(null);

  // --- Record View State ---
  recordedAudioBuffer = signal<AudioBuffer | null>(null);
  recordedAudioUrl = signal<string | null>(null);
  recordingState = signal<'idle' | 'recording' | 'stopped'>('idle');

  // --- Playback State (Shared) ---
  playbackCanvasId = signal<string | null>(null);

  // --- Internals ---
  private audioContext: AudioContext | null = null;
  private audioSourceNode: AudioBufferSourceNode | null = null;
  private timeUpdateInterval: any = null;
  private startTime = 0;

  // Theme colors cache (read at draw time)
  private themePrimary = '#2dd4bf';
  private themeSecondary = '#000000';
  private themePrimaryForeground = '#f87171';

  // Recording internals
  private mediaRecorder: MediaRecorder | null = null;
  private mediaStream: MediaStream | null = null;
  private analyserNode: AnalyserNode | null = null;
  private animationFrameId: number | null = null;
  private recordedChunks: Blob[] = [];
  private themeObserver: MutationObserver | null = null;

  constructor() {
    const AC = (window as any).AudioContext || (window as any).webkitAudioContext;
    this.audioContext = AC ? new AC() : null;
    // Observe theme class changes to re-render static canvases when theme updates.
    try {
      if (typeof document !== 'undefined' && document.documentElement) {
        this.themeObserver = new MutationObserver(() => {
          // Re-draw any static waveforms when theme changes
          if (this.uploadedAudioBuffer()) this.drawStaticWaveform(this.uploadedAudioBuffer()!, 'uploadCanvas', 0);
          if (this.recordedAudioBuffer()) this.drawStaticWaveform(this.recordedAudioBuffer()!, 'recordCanvas', 0);
        });
        this.themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
      }
    } catch (e) {
      // ignore in non-DOM environments
    }
  }

  // Computed values
  isMicrophoneActive = computed(() => this.recordingState() === 'recording');
  dateString = computed(() => new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-'));

  setView(v: 'upload' | 'record') {
    this.view.set(v);
  }

  // Read theme CSS variables from root at the time of drawing.
  private getThemeColors() {
    try {
      const styles = getComputedStyle(document.documentElement);
      const primary = styles.getPropertyValue('--primary').trim() || this.themePrimary;
      const secondary = styles.getPropertyValue('--card').trim() || this.themeSecondary;
      const primaryForeground = styles.getPropertyValue('--primary-foreground').trim() || this.themePrimaryForeground;
      // Update cached values for debug/fallback
      this.themePrimary = primary;
      this.themeSecondary = secondary;
      this.themePrimaryForeground = primaryForeground;
      return { primary, secondary, primaryForeground };
    } catch (e) {
      return { primary: this.themePrimary, secondary: this.themeSecondary, primaryForeground: this.themePrimaryForeground };
    }
  }

  // Utility to read a file/blob into ArrayBuffer
  fileToArrayBuffer(file: Blob | File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = () => reject(reader.error);
      reader.readAsArrayBuffer(file as Blob);
    });
  }

  // --- Waveform Drawing ---
  drawStaticWaveform(buffer: AudioBuffer, canvasId: string, currentTime = 0) {
    const canvasElement = document.querySelector<HTMLCanvasElement>(`#${canvasId}`);
    if (!canvasElement) return;
    const ctx = canvasElement.getContext('2d');
    if (!ctx) return;

    const width = canvasElement.offsetWidth;
    const height = canvasElement.offsetHeight;
    canvasElement.width = width * window.devicePixelRatio;
    canvasElement.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const data = buffer.getChannelData(0);
    const step = Math.ceil(data.length / width);
    const amp = height / 2;
    const duration = buffer.duration;


    ctx.clearRect(0, 0, width, height);
    const { primary, secondary, primaryForeground } = this.getThemeColors();
    // Fill canvas background with theme secondary color
    ctx.fillStyle = secondary || '#000000';
    ctx.globalAlpha = 1;
    ctx.fillRect(0, 0, width, height);

    // Draw waveform using primary color with alpha
    ctx.fillStyle = primary || 'rgba(45, 212, 191, 1)';
    const waveformAlpha = 0.7;
    const prevAlpha = ctx.globalAlpha;
    ctx.globalAlpha = waveformAlpha;
    ctx.beginPath();
    ctx.moveTo(0, amp);

    for (let i = 0; i < width; i++) {
      let max = -1.0;
      const start = i * step;
      const end = Math.min(start + step, data.length);
      for (let j = start; j < end; j++) {
        if (data[j] > max) max = data[j];
      }
      ctx.lineTo(i, amp * (1 - max));
    }

    for (let i = width - 1; i >= 0; i--) {
      let min = 1.0;
      const start = i * step;
      const end = Math.min(start + step, data.length);
      for (let j = start; j < end; j++) {
        if (data[j] < min) min = data[j];
      }
      ctx.lineTo(i, amp * (1 - min));
    }
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = prevAlpha;

    if (currentTime > 0 && this.playbackCanvasId() === canvasId) {
      const progressRatio = Math.min(currentTime / duration, 1);
      const playheadX = progressRatio * width;
      ctx.strokeStyle = '#f87171';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(playheadX, 0);
      ctx.lineTo(playheadX, height);
      ctx.stroke();
      ctx.fillStyle = '#f87171';
      ctx.globalAlpha = prevAlpha;
      ctx.beginPath();
      ctx.moveTo(playheadX - 4, 0);
      ctx.lineTo(playheadX + 4, 0);
      ctx.lineTo(playheadX, 8);
      ctx.fill();
    }
  }

  // --- Playback ---
  isPlaybackActive(viewName: 'upload' | 'record') {
    return this.playbackCanvasId() === (viewName === 'upload' ? 'uploadCanvas' : 'recordCanvas');
  }

  togglePlayback(buffer: AudioBuffer | null, canvasId: string) {
    const isActive = this.playbackCanvasId() === canvasId;
    if (buffer) {
      if (isActive) this.stopPlayback();
      else this.startPlayback(buffer, canvasId);
    }
  }

  startPlayback(buffer: AudioBuffer, canvasId: string) {
    this.stopPlayback();
    if (!this.audioContext) {
      this.message.set('Audio playback is not supported in this environment.');
      this.messageType.set('error');
      return;
    }
    if (this.audioContext.state === 'suspended') this.audioContext.resume();

    this.audioSourceNode = this.audioContext.createBufferSource();
    this.audioSourceNode.buffer = buffer;
    this.audioSourceNode.connect(this.audioContext.destination);
    this.startTime = this.audioContext.currentTime;
    this.playbackCanvasId.set(canvasId);

    this.timeUpdateInterval = setInterval(() => {
      const elapsed = (this.audioContext ? this.audioContext.currentTime : 0) - this.startTime;
      if (elapsed >= buffer.duration) {
        this.stopPlayback();
        return;
      }
      this.drawStaticWaveform(buffer, canvasId, elapsed);
    }, 16);

    this.audioSourceNode.onended = () => this.stopPlayback();
    this.audioSourceNode.start();
  }

  stopPlayback() {
    if (this.timeUpdateInterval) {
      clearInterval(this.timeUpdateInterval);
      this.timeUpdateInterval = null;
    }
    if (this.audioSourceNode) {
      try {
        this.audioSourceNode.stop();
      } catch (e) {}
      this.audioSourceNode.disconnect();
      this.audioSourceNode = null;
    }
    const lastCanvasId = this.playbackCanvasId();
    this.playbackCanvasId.set(null);
    if (lastCanvasId === 'uploadCanvas' && this.uploadedAudioBuffer()) {
      this.drawStaticWaveform(this.uploadedAudioBuffer()!, 'uploadCanvas', 0);
    } else if (lastCanvasId === 'recordCanvas' && this.recordedAudioBuffer()) {
      this.drawStaticWaveform(this.recordedAudioBuffer()!, 'recordCanvas', 0);
    }
  }

  // --- Upload handling ---
  async decodeUploadedFile(file: File) {
    this.message.set('');
    this.stopPlayback();
    this.uploadedAudioBuffer.set(null);

    const fileType = file.type.toLowerCase();
    if (!fileType.includes('audio/mp3') && !fileType.includes('audio/mpeg')) {
      this.message.set('The selected file does not appear to be a valid MP3 file (expected audio/mp3 or audio/mpeg).');
      this.messageType.set('error');
      return;
    }

    this.isLoading.set(true);
    try {
      if (this.audioContext?.state === 'suspended') await this.audioContext.resume();
      const arrayBuffer = await this.fileToArrayBuffer(file);
      const audioBuffer = await this.audioContext?.decodeAudioData(arrayBuffer);
      if(audioBuffer) {
      this.uploadedAudioBuffer.set(audioBuffer);
      this.drawStaticWaveform(audioBuffer, 'uploadCanvas', 0);
    }
    } catch (err: any) {
      this.message.set(`Error decoding audio file. It might be corrupted or not a supported format: ${err?.message ?? err}`);
      this.messageType.set('error');
      console.error('Audio decoding error:', err);
    } finally {
      this.isLoading.set(false);
    }
  }

  // --- Recording handling ---
  async startRecording() {
    this.message.set('');
    this.stopPlayback();
    this.recordedAudioBuffer.set(null);
    this.recordedAudioUrl.set(null);
    this.recordingState.set('idle');
    this.recordedChunks = [];
    this.cancelRealtimeVisualization();

    try {
      this.recordingState.set('recording');
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (this.audioContext?.state === 'suspended') await this.audioContext.resume();
      const source = this.audioContext?.createMediaStreamSource(this.mediaStream);
      if(this.audioContext && source) {
      this.analyserNode = this.audioContext.createAnalyser();
      this.analyserNode.fftSize = 2048;
      source.connect(this.analyserNode);
    }

      this.mediaRecorder = new MediaRecorder(this.mediaStream, { mimeType: 'audio/webm' });
      this.mediaRecorder.ondataavailable = (event) => { if (event.data.size > 0) this.recordedChunks.push(event.data); };

      this.mediaRecorder.onstop = async () => {
        const blob = new Blob(this.recordedChunks, { type: 'audio/webm' });
        this.recordedAudioUrl.set(URL.createObjectURL(blob));
        this.isLoading.set(true);
        try {
          const arrayBuffer = await this.fileToArrayBuffer(blob as File);
          const audioBuffer = await this.audioContext?.decodeAudioData(arrayBuffer);
          if(audioBuffer){
          this.recordedAudioBuffer.set(audioBuffer);
          this.drawStaticWaveform(audioBuffer, 'recordCanvas', 0);
        }
        } catch (err: any) {
          this.message.set(`Error decoding recorded audio for visualization: ${err?.message ?? err}`);
          this.messageType.set('error');
          console.error('Recording decode error:', err);
        } finally {
          this.isLoading.set(false);
          this.recordingState.set('stopped');
          this.message.set('Recording stopped. Waveform generated.');
          this.messageType.set('info');
        }
      };

      this.mediaRecorder.start();
      this.recordingState.set('recording');
      this.startRealtimeVisualization();
    } catch (err: any) {
      this.recordingState.set('idle');
      this.message.set(`Microphone access denied or error: ${err?.message ?? err}. Please check permissions.`);
      this.messageType.set('error');
      console.error('Media Recorder Error:', err);
      if (this.mediaStream) {
        this.mediaStream.getTracks().forEach((t) => t.stop());
      }
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') this.mediaRecorder.stop();
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }
    this.cancelRealtimeVisualization();
  }

  startRealtimeVisualization() {
    this.cancelRealtimeVisualization();
    const canvasElement = document.querySelector<HTMLCanvasElement>('#recordCanvas');
    if (!canvasElement || !this.analyserNode) return;
    const ctx = canvasElement.getContext('2d');
    if (!ctx) return;

    const width = canvasElement.offsetWidth;
    const height = canvasElement.offsetHeight;
    canvasElement.width = width * window.devicePixelRatio;
    canvasElement.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const bufferLength = this.analyserNode.fftSize;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      this.animationFrameId = requestAnimationFrame(draw);
      if (this.recordingState() !== 'recording') return;
      this.analyserNode!.getByteTimeDomainData(dataArray);

      ctx.clearRect(0, 0, width, height);
      const { primary, secondary } = this.getThemeColors();
      // background secondary color
      ctx.fillStyle = secondary || '#111827';
      ctx.globalAlpha = 1;
      ctx.fillRect(0, 0, width, height);

      // waveform primary color with alpha
      ctx.fillStyle = primary || 'rgba(45, 212, 191, 1)';
      const prevAlpha = ctx.globalAlpha;
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      const sliceWidth = (width * 1.0) / bufferLength;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i];
        const y = (v / 255.0) * height;
        ctx.lineTo(x, y);
        x += sliceWidth;
      }
      ctx.lineTo(width, height / 2);
      ctx.lineTo(0, height / 2);
      ctx.fill();
      ctx.globalAlpha = prevAlpha;
    };
    draw();
  }

  cancelRealtimeVisualization() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    const canvasElement = document.querySelector<HTMLCanvasElement>('#recordCanvas');
    if (canvasElement) {
      const ctx = canvasElement.getContext('2d');
      if (ctx) {
        const width = canvasElement.offsetWidth * window.devicePixelRatio;
        const height = canvasElement.offsetHeight * window.devicePixelRatio;
        ctx.clearRect(0, 0, width, height);
      }
    }
  }
}
