import { AiManagementService } from './../../../../services/ai-management-service/ai-management-service';
import { Component, OnInit, signal } from '@angular/core';
import { TtsSettings } from '../../component/tts-settings/tts-settings';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown, lucideSettings } from '@ng-icons/lucide';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmTooltip, HlmTooltipTrigger } from '@spartan-ng/helm/tooltip';
import { BrnTooltipContentTemplate } from '@spartan-ng/brain/tooltip';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmSwitch } from '@spartan-ng/helm/switch';
import { HlmSlider } from '@spartan-ng/helm/slider';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { TTS_EMOTIONS } from '../../constants/emotions.constant';
import { MODELS } from '../../constants/models.constant';
import { Voices } from './tts-voices/tts-voices';
import { IVoice } from '../../../../core/interfaces/voices.interface';
import { TtsService } from '../../../../services/tts-service/tts-service';
import { b64toBlob } from '../../../../shared/utils/base64-to-blob';
import { saveAs } from 'file-saver';
import { ActivatedRoute } from '@angular/router';
import { VoicesService } from '../../../../services/voices-service/voices-service';
import {
  HlmSheet,
  HlmSheetContent,
  HlmSheetHeader,
} from '@spartan-ng/helm/sheet';
import { BrnSheetContent, BrnSheetTrigger } from '@spartan-ng/brain/sheet';
import { SubscriptionsService } from '../../../../services/subscriptions-service/subscriptions-service';
import { IPlan } from '../../../../core/interfaces/plan.interface';
import { IMySubscription } from '../../../../core/interfaces/subscription.interface';
import { UserService } from '../../../../services/user/user-service';

@Component({
  selector: 'app-text-to-speech',
  imports: [
    TtsSettings,
    HlmInput,
    FormsModule,
    HlmButton,
    HlmTooltip,
    HlmTooltipTrigger,
    BrnTooltipContentTemplate,
    BrnSelectImports,
    HlmSelectImports,
    HlmSwitch,
    HlmSlider,
    HlmBadge,
    NgIcon,
    Voices,
    HlmSheet,
    HlmSheetHeader,
    HlmSheetContent,
    BrnSheetTrigger,
    BrnSheetContent,
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

  constructor(
    private aiManagementService: AiManagementService,
    private ttsService: TtsService,
    private activatedRoutes: ActivatedRoute,
    private voicesService: VoicesService,
    private subscriptionService: SubscriptionsService,
    private readonly userService: UserService
  ) {
    this.activatedRoutes.params.subscribe((params) => {
      const voiceId = params['voiceId'];
      if (voiceId) {
        this.voicesService.getVoiceById(voiceId).subscribe((voice) => {
          this.selectedVoice.set(voice);
        });
      }
    });
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
        this.ttsService
          .generateSpeechGoogle(requestPayload)
          .subscribe((response) => {
            const audio = b64toBlob(response.audio_base64, 'audio/mpeg');
            saveAs(audio, `${this.text.slice(0, 5) || 'output'}.mp3`);
            this.getUserSubscription();
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
        this.ttsService
          .generateSpeechAzure(requestPayload)
          .subscribe((response) => {
            const audio = b64toBlob(response.audio_base64, 'audio/mpeg');
            saveAs(audio, `${this.text.slice(0, 5) || 'output'}.mp3`);
            this.getUserSubscription();
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

        this.ttsService
          .generateSpeechSpeechify(requestPayload)
          .subscribe((response) => {
            const audio = b64toBlob(response.audio_base64, 'audio/mpeg');
            saveAs(audio, `${this.text.slice(0, 5) || 'output'}.mp3`);
            this.getUserSubscription();
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
        this.ttsService
          .generateSpeechElevenLabs(requestPayload)
          .subscribe((response) => {
            const audio = b64toBlob(response.base64, 'audio/mpeg');
            saveAs(audio, `${this.text.slice(0, 5) || 'output'}.mp3`);
            this.getUserSubscription();
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
        this.ttsService
          .generateSpeechLemonfox(requestPayload)
          .subscribe((response) => {
            const audio = b64toBlob(response.audio_base64, 'audio/mpeg');
            saveAs(audio, `${this.text.slice(0, 5) || 'output'}.mp3`);
            this.getUserSubscription();
          });
        break;
      }
      case 'labs': {
        const requestPayload = {
          text: this.text,
          pitch: this.pitch(),
          speedRate: this.speedRate(),
          textNormalization: this.textNormalization(),
          emotion: this.emotion(),
          voice_id: this.selectedVoice()?.voice_id,
        };
        this.ttsService
          .generateSpeechGenAIPro(requestPayload)
          .subscribe((response) => {
            const audio = b64toBlob(response.audio_base64, 'audio/mpeg');
            saveAs(audio, `${this.text.slice(0, 5) || 'output'}.mp3`);
            this.getUserSubscription();
          });
        break;
      }
      default:
        break;
    }
  };

  formatTextForSpeechify = (inputText: string) => {
    const escapeSSMLChars = inputText
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&apos;');

    return `<speak><prosody pitch="${this.pitch()}%" rate="${this.speedRate()}%"><speechify:style emotion="${this.emotion().toLowerCase()}">${escapeSSMLChars}</speechify:style></prosody></speak>`;
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
        this.textareaMaxLength =
          ((this.userSubscription?.remainining_character_credits ?? 0) >
          (this.selectedPlan?.default_character_limit ?? 0)
            ? this.selectedPlan?.default_character_limit ?? 0
            : (this.userSubscription?.remainining_character_credits ?? 0) > 2000
            ? 2000
            : this.userSubscription?.remainining_character_credits ?? 0);
      });
  }
}
