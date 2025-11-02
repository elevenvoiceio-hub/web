import { Component, ViewChild } from '@angular/core';
import { BrnDialogRef, BrnDialogService } from '@spartan-ng/brain/dialog';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { CommonModule } from '@angular/common';
// import { Plyr } from 'plyr';
import { HlmSelectImports } from '@spartan-ng/helm/select';

import {
  lucideChevronLeft,
  lucideCloudUpload,
  lucideAudioLines,
  lucideMic,
  lucideRefreshCw,
  lucideScale,
  lucideShieldCheck,
  lucideSparkles,
  lucideTimer,
  lucideTrash2,
  lucideUserCheck,
  lucideVoicemail,
  lucideX,
  lucideZap,
  lucideCircle,
  lucideFingerprint,
  lucideBlocks,
  lucideFileText,
  lucideUsers,
  lucideGauge,
  lucideLock,
  lucideShieldAlert,
  lucideSpeech,
  lucideShieldUser,
  lucideArrowLeft,
  lucidePlay,
  lucideVolume2,
  lucideRotateCw,
} from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmDialogImports, HlmDialogOverlay } from '@spartan-ng/helm/dialog';
import { BrnDialogImports } from '@spartan-ng/brain/dialog';
import { HlmLabel } from '@spartan-ng/helm/label';
import { FormsModule } from '@angular/forms';
import { LANGUAGES } from '../../constants/language.constant';
import { HlmSwitch } from '@spartan-ng/helm/switch';
import { HlmRadioGroupImports } from '@spartan-ng/helm/radio-group';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { DragDropUpload } from '../../../../shared/components/drag-drop-upload/drag-drop-upload';
import { VoiceCloningService } from '../../../../services/voice-cloning/voice-cloning';
import { AudioRecorder } from '../../../../shared/components/audio-recorder/audio-recorder';
import { UserService } from '../../../../services/user/user-service';

type Screen =
  | 'privacy'
  | 'selection'
  | 'consent'
  | 'uploadSample'
  | 'recordSample'
  | 'saveVoice';

interface ConsentItem {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-voice-cloning-dialog',
  imports: [
    NgIcon,
    HlmButton,
    HlmDialogImports,
    BrnDialogImports,
    HlmLabel,
    FormsModule,
    CommonModule,
    HlmDialogOverlay,
    HlmSwitch,
    HlmSelectImports,
    HlmRadioGroupImports,
    BrnSelectImports,
    DragDropUpload,
    AudioRecorder,
  ],
  providers: [
    provideIcons({
      lucideMic,
      lucideX,
      lucideCloudUpload,
      lucideChevronLeft,
      lucideShieldCheck,
      lucideAudioLines,
      lucideTrash2,
      lucideTimer,
      lucideZap,
      lucideVoicemail,
      lucideScale,
      lucideUserCheck,
      lucideRefreshCw,
      lucideSparkles,
      lucideCircle,
      lucideFingerprint,
      lucideBlocks,
      lucideFileText,
      lucideUsers,
      lucideGauge,
      lucideLock,
      lucideShieldAlert,
      lucideSpeech,
      lucideShieldUser,
      lucideArrowLeft,
      lucidePlay,
      lucideVolume2,
      lucideRotateCw,
    }),
  ],
  templateUrl: './voice-cloning-dialog.html',
  styleUrl: './voice-cloning-dialog.css',
})
export class VoiceCloningDialog {
  @ViewChild(AudioRecorder) private audioRecorderComponent!: AudioRecorder;

  constructor(
    private _dialogRef: BrnDialogRef<VoiceCloningDialog>,
    private voiceCloningService: VoiceCloningService,
    private userService: UserService
  ) {}

  // private player: Plyr;

  public currentScreen: Screen = 'selection';
  private screenHistory: Screen[] = ['selection'];
  public enhanceWithAI: boolean = true;

  public languages = LANGUAGES.slice(1, LANGUAGES.length); // Exclude 'Auto'
  public voiceData = {
    name: 'My voice',
    language: LANGUAGES[0].name,
    gender: 'male',
    enhanceWithAI: true,
    file: null as File | null,
  };

  public cloningMethod: 'record' | 'upload' | null = null; // To track if user chose record or upload

  // State to manage consent checkboxes if needed, or just a single consent boolean
  public hasConsented: boolean = false;
  public electronicSignature: string = ''; // For the signature input
  public isRecording: boolean = false; // To manage recording state
  public recordingDuration: number = 0; // To track recording duration
  public recordingInterval: any; // To hold the interval reference
  public maxRecordingDuration: number = 15; // Max recording time in seconds
  public isPlaying: boolean = false; // To manage playback state
  public playbackAudio: HTMLAudioElement | null = null; // To hold the audio element for playback
  public isUploading: boolean = false; // To manage upload state
  public uploadProgress: number = 0; // To track upload progress
  public selectedFile: File | null = null; // To hold the selected file
  audioURL: string | null = null; // To hold the audio URL for playback

  // Content for the "How would you like to clone your voice?" screen
  public methodOptions = [
    {
      icon: 'lucideMic',
      title: 'Record your voice',
      description:
        'Takes 15 seconds. AI will capture your intonation perfectly.',
      method: 'record' as 'record' | 'upload',
      recommended: true,
    },
    {
      icon: 'lucideUpload',
      title: 'Upload a file',
      description: 'Select and upload an mp3 or wav file.',
      method: 'upload' as 'record' | 'upload',
      recommended: false,
    },
  ];

  navigateTo(screen: Screen): void {
    this.currentScreen = screen;
    this.screenHistory.push(screen);
  }

  // ngAfterViewInit() {
  //   // This lifecycle hook ensures the element is in the DOM
  //   if (this.audioPlayerElement) {
  //     this.player = new Plyr(this.audioPlayerElement.nativeElement);
  //   }
  // }

  goBack(): void {
    this.screenHistory.pop();
    const previousScreen = this.screenHistory[this.screenHistory.length - 1];
    if (previousScreen) {
      this.currentScreen = previousScreen;
    }
  }

  // Content for the first consent screen (Image 1)
  public generalConsentItems: ConsentItem[] = [
    {
      icon: 'lucideAudioLines', // Or a custom voice permission icon
      title: 'Voice Permission',
      description:
        'Confirm voice ownership or act on behalf with explicit consent for cloning',
    },
    {
      icon: 'lucideScale', // Or a custom intellectual property icon
      title: 'Intellectual Property Assurance',
      description: 'Ensure voices respect laws & rights, no infringement',
    },
    {
      icon: 'lucideShieldUser', // Or a custom adult speaker icon
      title: 'Adult Speaker Confirmation',
      description: 'Verify speaker’s age is 18 or older for compliance',
    },
    {
      icon: 'lucideSpeech', // Or a custom political figures icon
      title: 'No Political Figures',
      description:
        'Ensure voices are not associated with prominent political figures',
    },
    {
      icon: 'lucideShieldAlert', // Or a custom legal use icon
      title: 'Legal Use Commitment',
      description:
        'Pledged to use platform content only for lawful and authorized purposes',
    },
  ];

  // Content for the second consent screen (Image 2 - Privacy Control)
  public privacyConsentItems: ConsentItem[] = [
    {
      icon: 'lucideUsers',
      title: 'It is never used outside of the app under any circumstances',
      description: '',
    },
    {
      icon: 'lucideLock',
      title: 'Nobody has access to your recordings or voice models',
      description: '',
    },
    {
      icon: 'lucideTrash2',
      title: 'You can permanently delete your voice and models at any time',
      description: '',
    },
    {
      icon: 'lucideGauge',
      title: 'Record and generate your voice in just 15 seconds',
      description: '',
    },
    {
      icon: 'lucideZap',
      title: 'The process is straightforward and delivers exceptional results',
      description: '',
    },
  ];

  ngOnInit(): void {
    // Optionally, if you want the dialog to start from a specific screen based on external state.
  }

  // Resets all state when dialog is closed or user finishes
  resetDialogState() {
    this.currentScreen = 'selection';
    this.cloningMethod = null;
    this.hasConsented = false;
    this.electronicSignature = '';
  }

  // This method selects the cloning method and moves to the appropriate next step
  selectCloningMethod(method: 'record' | 'upload') {
    this.cloningMethod = method;
    this.navigateTo('consent');
  }

  proceedToPrivacy() {
    this.navigateTo('privacy');
  }
  // Logic for handling the electronic signature and proceeding
  signAndProceed() {
    if (this.electronicSignature.toLocaleLowerCase() === 'read') {
      this.hasConsented = true;
      if (this.cloningMethod === 'record') {
        this.navigateTo('recordSample');
      } else if (this.cloningMethod === 'upload') {
        this.navigateTo('uploadSample');
      }
    } else {
      alert('Please type "Read" to confirm consent.');
    }
  }

  // You can also add drag & drop handlers
  onFilesDropped(files: File[]) {
    if (files.length > 0) {
      this.selectedFile = files[0];
      this.validateAndSetAudioFile(this.selectedFile);
    }
  }

  preventDefaults(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  selectedFileName(): string {
    return this.voiceData.file ? this.voiceData.file.name : 'No file selected';
  }

  removeselectedFile() {
    this.voiceData.file = null;
    this.selectedFile = null;
    this.audioURL = null;
    if (this.cloningMethod === 'upload') {
      this.navigateTo('uploadSample');
    } else if (this.cloningMethod === 'record') {
      this.navigateTo('recordSample');
    }
  }

  // uploadSample() {
  //   if (this.voiceData.file) {
  //     this.navigateTo('saveVoice');
  //   } else {
  //     alert('Please select a file to upload.');
  //   }
  // }

  startRecording() {
    ('recording started');
  }

  consentGiven(): boolean {
    return this.hasConsented && this.electronicSignature === 'Read';
  }

  validateAndSetAudioFile(file: File): void {
    const minimumDuration = 15;
    const audio = document.createElement('audio');

    const objectUrl = URL.createObjectURL(file);

    audio.addEventListener('loadedmetadata', () => {
      URL.revokeObjectURL(objectUrl);

      if (audio.duration < minimumDuration) {
        alert(
          `Audio is too short. Please upload a file that is at least ${minimumDuration} seconds long.`
        );
        this.selectedFile = null;
        this.audioURL = null;
      } else {
        this.selectedFile = file;
        this.audioURL = URL.createObjectURL(file);
      }
    });

    audio.src = objectUrl;
  }

  onRecordedFile(file: Blob) {}

  useSample() {
    if (this.currentScreen === 'recordSample' && this.audioRecorderComponent) {
      const audioBlob = this.audioRecorderComponent.getAudioBlob();
      if (audioBlob) {
        const file = new File([audioBlob], 'recorded-sample.wav', {
          type: 'audio/wav',
        });
        this.selectedFile = file;
      }
    }
    if (this.selectedFile) {
      this.voiceData.file = this.selectedFile;
      this.navigateTo('saveVoice');
    } else {
      alert('Please select or upload a valid audio sample.');
    }
  }

  proceedToSaveScreen() {
    this.navigateTo('saveVoice');
  }

  saveVoice() {
    if (!this.voiceData.file) {
      alert('Please provide an audio sample before saving your voice.');
      return;
    }
    let requestPayload = new FormData();
    requestPayload.append('name', this.voiceData.name);
    requestPayload.append('language', this.voiceData.language);
    requestPayload.append('gender', this.voiceData.gender);
    requestPayload.append('sample', this.voiceData.file, this.voiceData.name);

    const userDetails = this.userService.UserDetails.getValue();
    const consentObj = {
      fullName: userDetails ? userDetails.username : '',
      email: userDetails ? userDetails.email : '',
    };
    requestPayload.append('consent', JSON.stringify(consentObj));

    this.voiceCloningService.cloneVoice(requestPayload).subscribe({
      next: (response) => {
        alert('Your voice has been cloned successfully!');
        this._dialogRef.close();
        this.resetDialogState();
      },
      error: (error) => {
        alert('There was an error cloning your voice.');
      },
    });
  }
}
