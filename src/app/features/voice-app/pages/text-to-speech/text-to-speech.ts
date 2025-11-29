import { AiManagementService } from './../../../../services/ai-management-service/ai-management-service';
import { Component, OnInit, signal } from '@angular/core';
import { TtsSettings } from '../../component/tts-settings/tts-settings';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown, lucideSettings } from '@ng-icons/lucide';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmButton } from '@spartan-ng/helm/button';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { TTS_EMOTIONS } from '../../constants/emotions.constant';
import { MODELS } from '../../constants/models.constant';
import { Voices } from './tts-voices/tts-voices';
import { IVoice } from '../../../../core/interfaces/voices.interface';
import { TtsService } from '../../../../services/tts-service/tts-service';
import { b64toBlob } from '../../../../shared/utils/base64-to-blob';
import { ActivatedRoute } from '@angular/router';
import { VoicesService } from '../../../../services/voices-service/voices-service';
import { HlmSheet, HlmSheetContent } from '@spartan-ng/helm/sheet';
import { BrnSheetContent, BrnSheetTrigger } from '@spartan-ng/brain/sheet';
import { SubscriptionsService } from '../../../../services/subscriptions-service/subscriptions-service';
import { IPlan } from '../../../../core/interfaces/plan.interface';
import { IMySubscription } from '../../../../core/interfaces/subscription.interface';
import { UserService } from '../../../../services/user/user-service';
import { DEMO_TEXT } from '../../constants/demo-text.constant';
import { AudioWaveform } from '../../component/audio-waveform/audio-waveform';
import { IGenAIProResponse } from '../../../../core/interfaces/tts-response.interface';
import { CommonService } from '../../../../services/common-service/common-service';
import { mapRange } from '../../../../shared/utils/map-range,utils';
import { getFileNameFromUrl } from '../../../../shared/utils/file-name-extractor.utils';
import saveAs from 'file-saver';

@Component({
  selector: 'app-text-to-speech',
  imports: [
    TtsSettings,
    HlmInput,
    FormsModule,
    HlmButton,
    BrnSelectImports,
    HlmSelectImports,
    NgIcon,
    Voices,
    HlmSheet,
    HlmSheetContent,
    BrnSheetTrigger,
    BrnSheetContent,
    AudioWaveform,
  ],
  templateUrl: './text-to-speech.html',
  styleUrl: './text-to-speech.css',
  providers: [
    provideIcons({
      lucideChevronDown,
      lucideSettings,
    }),
  ],
})
export class TextToSpeech implements OnInit {
  text: string = '';

  emotions = TTS_EMOTIONS;
  models = MODELS;

  pitch = signal(50);
  speedRate = signal(50);
  textNormalization = signal(false);
  emotion = signal('None');
  model = signal(MODELS[0]);
  selectedVoice = signal<IVoice | null>(null);

  aiModels: any = null;
  plans: IPlan[] = [];
  userSubscription: IMySubscription | undefined;
  selectedPlan: IPlan | undefined;

  textareaMaxLength = 2000;
  user: any;
  file = signal<File | null>(null);

  constructor(
    private aiManagementService: AiManagementService,
    private ttsService: TtsService,
    private activatedRoutes: ActivatedRoute,
    private voicesService: VoicesService,
    private subscriptionService: SubscriptionsService,
    private readonly userService: UserService,
    private readonly commonService: CommonService
  ) {
    this.activatedRoutes.params.subscribe((params) => {
      const voiceId = params['voiceId'];
      if (voiceId) {
        this.voicesService.getVoiceById(voiceId).subscribe((voice) => {
          this.selectedVoice.set(voice);
        });
      }
    });
    this.userService.UserDetails.subscribe((data) => (this.user = data));
    this.getAllPlans();
  }

  ngOnInit() {
    this.aiManagementService.getActiveAiModels().subscribe((models) => {
      this.aiModels = models.reduce((acc: any, model: any) => {
        acc[model.id] = model;
        return acc;
      }, {});
    });
  }

  public isDesktopSettingsOpen = false;

  generateSpeech = () => {
    switch (this.aiModels[this.selectedVoice()?.model ?? '']?.provider) {
      case 'gcp': {
        const requestPayload = {
          text: this.text,
          language_code: this.selectedVoice()?.language_code,
          voice_name: this.selectedVoice()?.voice_id,
          speaking_rate: this.speedRate(),
          pitch: this.pitch(),
        };
        this.ttsService.generateSpeechGoogle(requestPayload).subscribe({
          next: (response) => {
            this.decodeAudioFile(response.audio_base64);
          },
          error: () => {
            this.commonService.setToaster('Error generating speech');
          },
        });

        break;
      }
      case 'azure': {
        const requestPayload = {
          text: this.text,
          pitch: this.pitch(),
          speedRate: this.speedRate(),
          textNormalization: this.textNormalization(),
          emotion: this.emotion(),
          voice_name: this.selectedVoice()?.voice_id,
        };
        this.ttsService.generateSpeechAzure(requestPayload).subscribe({
          next: (response) => {
            this.decodeAudioFile(response.audio_base64);
          },
          error: () => {
            this.commonService.setToaster('Error generating speech');
          },
        });
        break;
      }
      case 'speechify': {
        const requestPayload = {
          text: this.formatTextForSpeechify(this.text),
          pitch: this.pitch(),
          speedRate: this.speedRate(),
          textNormalization: this.textNormalization(),
          emotion: this.emotion(),
          voice_id: this.selectedVoice()?.voice_id,
        };

        this.ttsService.generateSpeechSpeechify(requestPayload).subscribe({
          next: (response) => {
            this.decodeAudioFile(response.audio_base64);
          },
          error: () => {
            this.commonService.setToaster('Error generating speech');
          },
        });
        break;
      }
      case 'elevenlabs': {
        const requestPayload = {
          text: this.text,
          pitch: this.pitch(),
          speedRate: this.speedRate(),
          textNormalization: this.textNormalization(),
          emotion: this.emotion(),
          voice_id: this.selectedVoice()?.voice_id,
        };
        this.ttsService.generateSpeechElevenLabs(requestPayload).subscribe({
          next: (response) => {
            this.decodeAudioFile(response.base64);
          },
          error: () => {
            this.commonService.setToaster('Error generating speech');
          },
        });
        break;
      }
      case 'lemonfox': {
        const requestPayload = {
          text: this.text,
          pitch: this.pitch(),
          speedRate: this.speedRate(),
          textNormalization: this.textNormalization(),
          emotion: this.emotion(),
          voice: this.selectedVoice()?.voice_id,
        };
        this.ttsService.generateSpeechLemonfox(requestPayload).subscribe({
          next: (response) => {
            this.decodeAudioFile(response.audio_base64);
          },
          error: () => {
            this.commonService.setToaster('Error generating speech');
          },
        });
        break;
      }
      case 'labs': {
        const requestPayload = {
          input: this.text,
          voice_id: this.selectedVoice()?.voice_id,
          model_id: 'eleven_multilingual_v2',
          speed: mapRange(this.speedRate(), 0, 100, 0.7, 1.2),
        };
        this.ttsService.generateSpeechGenAIPro(requestPayload).subscribe({
          next: (response) => {
            this.generateGenAIProVoice(response);
            this.commonService.setLoader(true);
          },
          error: () => {
            this.commonService.setToaster('Error generating speech');
          },
        });
        break;
      }
      default:
        break;
    }
  };

  generateGenAIProVoice(input: IGenAIProResponse) {
    const taskId = input.task_id;
    const taskTimer = setInterval(() => {
      this.ttsService.getGenAIProTaskStatus(taskId).subscribe({
        next: (res: any) => {
          if (res.status === 'completed') {
            clearInterval(taskTimer);
            this.getAudioFile(res.result);
            this.decodeAudioFile(res.audio_base64);
          } else if (res.status === 'failed') {
            clearInterval(taskTimer);
          } else {
            this.commonService.setLoader(true);
          }
        },
        error: () => {
          clearInterval(taskTimer);
          this.commonService.setToaster('Error generating speech');
        },
      });
    }, 10000);
  }

  getAudioFile(url: string) {
    this.ttsService.getaudiofile(url).subscribe({
      next: (res: Blob) => {
        const myFile = new File([
          res],
          getFileNameFromUrl(url),
          {
            type: 'audio/mpeg',
            lastModified: new Date().getTime(), // Or a specific timestamp
          }
        );
        this.file.set(myFile);
        this.getUserSubscription();
      },
      error: () => {
        this.commonService.setToaster('Error generating speech');
      },
    });
  }

  formatTextForSpeechify = (inputText: string) => {
    const escapeSSMLChars = inputText
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&apos;');

    let emotion: string = '';

    if (this.emotion().toLowerCase() !== 'none') {
      emotion = `<speechify:style emotion="${this.emotion().toLowerCase()}">`;
    }

    return `<speak><prosody pitch="${this.pitch() - 50}%" rate="${
      this.speedRate() - 50
    }%">${emotion}${escapeSSMLChars}${
      this.emotion().toLowerCase() !== 'none' ? '</speechify:style>' : ''
    }</prosody></speak>`;
  };

  getAllPlans() {
    this.subscriptionService.getSubscriptions().subscribe((res: IPlan[]) => {
      this.plans = res;
      this.getUserSubscription(true);
    });
  }

  getUserSubscription(findMyPlan?: boolean) {
    this.subscriptionService
      .checkUserSubscription()
      .subscribe((res: IMySubscription) => {
        this.userSubscription = res;
        this.userService.UserSubscriptionData = res;
        if (findMyPlan) {
          this.selectedPlan = this.plans.find(
            (plan: IPlan) => plan.id === this.userSubscription?.plan_id
          );
        }
        if (res.plan_id === 'admin_access') {
          this.textareaMaxLength = 2000;
        } else {
          this.textareaMaxLength =
            (this.userSubscription?.remainining_character_credits ?? 0) >
            (this.selectedPlan?.default_character_limit ?? 0)
              ? this.selectedPlan?.default_character_limit ?? 0
              : (this.userSubscription?.remainining_character_credits ?? 0) >
                2000
              ? 2000
              : this.userSubscription?.remainining_character_credits ?? 0;
        }
      });
  }

  setDemoText() {
    const currentLang = this.selectedVoice()?.language_code.slice(0, 2) || 'en';
    const demoTexts = DEMO_TEXT[currentLang.toLowerCase()] || DEMO_TEXT['en'];
    const randomNumber = Math.floor(Math.random() * demoTexts.length);
    this.text = demoTexts[randomNumber];
  }

  clearText() {
    this.text = '';
    this.file.set(null);
  }

  decodeAudioFile(input: string) {
    const audio = b64toBlob(input, 'audio/mpeg');
    const myFile = new File(
      [audio],
      `${this.text.slice(0, 5) || 'output'}.mp3`,
      {
        type: audio.type,
        lastModified: new Date().getTime(), // Or a specific timestamp
      }
    );
    this.file.set(myFile);
    // saveAs(audio, `${this.text.slice(0, 5) || 'output'}.mp3`);
    this.getUserSubscription();
  }
}
