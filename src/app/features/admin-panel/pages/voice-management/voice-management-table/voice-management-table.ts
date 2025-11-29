import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmTooltipImports } from '@spartan-ng/helm/tooltip';
import { BrnTooltipContentTemplate } from '@spartan-ng/brain/tooltip';
import { HlmSwitch } from '@spartan-ng/helm/switch';
import { Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';

import { Pagination } from '../../../../../shared/components/pagination/pagination';
import {
  lucidePlus,
  lucideTrash2,
  lucideSearch,
  lucideAudioWaveform,
} from '@ng-icons/lucide';
import {
  remixGoogleFill,
  remixMicrosoftFill,
  remixOpenaiFill,
  remixPauseLargeFill,
  remixPencilFill,
  remixPlayLargeFill,
} from '@ng-icons/remixicon';
import { VoicesService } from '../../../../../services/voices-service/voices-service';
import { AiManagementService } from '../../../../../services/ai-management-service/ai-management-service';
import {
  GET_ICON_NAME,
  GET_NAME,
} from '../../../../../shared/utils/ai-models.utils';

@Component({
  selector: 'app-voice-management-table',
  imports: [
    Pagination,
    HlmButton,
    NgIcon,
    BrnSelectImports,
    HlmSelectImports,
    FormsModule,
    HlmInput,
    HlmTooltipImports,
    BrnTooltipContentTemplate,
    HlmSwitch,
  ],
  templateUrl: './voice-management-table.html',
  styleUrl: './voice-management-table.css',
  providers: [
    provideIcons({
      remixPencilFill,
      lucideSearch,
      remixOpenaiFill,
      remixGoogleFill,
      remixMicrosoftFill,
      lucideAudioWaveform,
      remixPauseLargeFill,
      remixPlayLargeFill,
    }),
  ],
})
export class VoiceManagementTable {
  voices: any[] = [];
  pageNumber = signal<number>(1);
  searchText = '';
  model = signal<string>('');
  language = signal<string>('');
  gender = signal<string>('');
  filteredVoices = signal<any[]>([]);
  rowsPerPage = signal<number>(5);
  displayData = computed(() =>
    this.filteredVoices().slice(
      (this.pageNumber() - 1) * this.rowsPerPage(),
      this.pageNumber() * this.rowsPerPage()
    )
  );
  languages: string[] = [];

  aiModels: any[] = [];

  aiImageDetails: any = {};

  constructor(
    private voiceService: VoicesService,
    private aiService: AiManagementService
  ) {
    this.getActiveAiModels();
    this.getVoices();

    effect(() => {
      this.updateTable(
        this.model(),
        this.language(),
        this.gender(),
        this.searchText
      );
    });
  }

  getVoices() {
    this.voiceService.getVoices().subscribe((voices: any) => {
      voices = voices.filter((voice: any) => this.aiImageDetails[voice.model]);
      this.voices = voices;
      voices.sort((a: any, b: any) => a.id - b.id);
      this.languages = this.getLanguages(voices);
      this.updateTable(
        this.model(),
        this.language(),
        this.gender(),
        this.searchText
      );
    });
  }

  getActiveAiModels() {
    this.aiService.getActiveAiModels().subscribe((models: any) => {
      this.aiModels = models;
      this.aiImageDetails = models.reduce((acc: any, model: any) => {
        acc[model.id] = {
          icon: GET_ICON_NAME(
            model.provider === ''
              ? model.model_name.toLowerCase()
              : model.provider
          ),
          provider: GET_NAME(
            model.provider === ''
              ? model.model_name.toLowerCase()
              : model.provider
          ),
        };
        return acc;
      }, {});
    });
  }

  /**
   * Updates the table according to the given model, subscription status and search text
   * @param model the model to filter by
   * @param language the subscription status to filter by
   * @param searchText the search text to filter by
   */
  updateTable = (
    model: string,
    language: string,
    gender: string,
    searchText: string
  ) => {
    const filteredVoices = this.voices.filter((voice) => {
      return (
        (!model || voice.model === model) &&
        (!language || voice.language === language) &&
        (!searchText ||
          voice.voicename.toLowerCase().includes(searchText.toLowerCase())) &&
        (!gender || voice.gender === gender)
      );
    });
    this.pageNumber.set(1);
    this.filteredVoices.set(filteredVoices);
  };

  getLanguages = (voices: any): string[] => {
    const languages: Set<string> = new Set();
    voices.forEach((voice: any) => {
      languages.add(voice.language);
    });
    return Array.from(languages);
  };

  toggleFilteredVoicesActivation = (action: string) => {
    const requestBody = {
      voice_ids: this.filteredVoices().map((voice) => voice.id),
      action: action,
    };
    this.voiceService.toggleVoiceActivation(requestBody).subscribe(() => {
      this.getVoices();
    });
  };

  toggleAllVoicesActivation = (action: string) => {
    const requestBody = {
      voice_ids: this.voices.map((voice) => voice.id),
      action: action,
    };
    this.voiceService.toggleVoiceActivation(requestBody).subscribe(() => {
      this.getVoices();
    });
  };

  toggleSelectedVoicesActivation = (action: string) => {
    const selectedVoices = this.displayData().filter((voice) => voice.selected);
    if (selectedVoices.length === 0) {
      alert('Please select at least one voice to perform this action.');
      return;
    }
    const requestBody = {
      voice_ids: selectedVoices.map((voice) => voice.id),
      action: action,
    };
    this.voiceService.toggleVoiceActivation(requestBody).subscribe(() => {
      this.getVoices();
    });
  };

  toggleOneVoiceActivation = (voice: any, action: boolean) => {
    const requestBody = {
      voice_ids: [voice.id],
      action: action ? 'activate' : 'deactivate',
    };
    this.voiceService.toggleVoiceActivation(requestBody).subscribe(() => {
      this.getVoices();
    });
  };

  playAudio(audioElement: HTMLMediaElement, voice: any): void {
    audioElement.pause();
    audioElement.src = voice.sample_url;
    audioElement.play();
  }
}
