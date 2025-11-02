import { AiManagementService } from './../../../../services/ai-management-service/ai-management-service';
import { Component } from '@angular/core';
import { IAiModel } from '../../../../core/interfaces/ai-models.interface';
import { AiManagementCards } from './ai-management-cards/ai-management-cards';

@Component({
  selector: 'app-ai-management',
  imports: [AiManagementCards],
  templateUrl: './ai-management.html',
  styleUrl: './ai-management.css',
})
export class AiManagement {
  aiModels: IAiModel[] = [
    {
      id: -1,
      provider: 'openai',
      model_name: '',
      api_key: '',
      active: false,
      is_stt: false,
      is_tts: false,
      is_clone: false,
    },
    {
      id: -1,
      provider: 'gcp',
      model_name: '',
      api_key: '',
      active: false,
      is_stt: false,
      is_tts: false,
      is_clone: false,
    },
    {
      id: -1,
      provider: 'azure',
      model_name: '',
      api_key: '',
      active: false,
      is_stt: false,
      is_tts: false,
      is_clone: false,
    },
    {
      id: -1,
      provider: 'speechify',
      model_name: '',
      api_key: '',
      active: false,
      is_stt: false,
      is_tts: false,
      is_clone: false,
    },
    {
      id: -1,
      provider: 'elevenlabs',
      model_name: '',
      api_key: '',
      active: false,
      is_stt: false,
      is_tts: false,
      is_clone: false,
    },
    {
      id: -1,
      provider: 'lemonfox',
      model_name: '',
      api_key: '',
      active: false,
      is_stt: false,
      is_tts: false,
      is_clone: false,
    },
    {
      id: -1,
      provider: 'labs',
      model_name: '',
      api_key: '',
      active: false,
      is_stt: false,
      is_tts: false,
      is_clone: false,
    }
  ];

  constructor(private AiManagementService: AiManagementService) {
    this.getAiModels();
  }

  getAiModels() {
    this.AiManagementService.getAiModels().subscribe((response) => {
      response.sort((a, b) => b.id - a.id);
      this.aiModels = this.aiModels.map((model) => {
        const foundModel = response.find((m) => m.provider === model.provider);
        return foundModel
          ? { ...model, ...foundModel }
          : { ...model, active: false };
      });
    });
  }

  onSttChanged(event: number) {
    const sttModels = this.aiModels.filter(
      (model) => model.is_stt && model.id !== event
    );
    sttModels.forEach((model) => {
      this.AiManagementService.updateAiModel({
        ...model,
        is_stt: false,
      }).subscribe((data) => {
        model.is_stt = data.is_stt;
      });
    });
  }

  onCloneChanged(event: number) {
    const cloneModels = this.aiModels.filter(
      (model) => model.is_clone && model.id !== event
    );
    cloneModels.forEach((model) => {
      this.AiManagementService.updateAiModel({
        ...model,
        is_clone: false,
      }).subscribe((data) => {
        model.is_clone = data.is_clone;
      });
    });
  }
}
