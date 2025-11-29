import { HlmBadge } from '@spartan-ng/helm/badge';
import { HlmButton } from '@spartan-ng/helm/button';
import {
  BrnDialog,
  BrnDialogContent,
  BrnDialogTrigger,
} from '@spartan-ng/brain/dialog';
import {
  HlmDialog,
  HlmDialogContent,
  HlmDialogDescription,
  HlmDialogFooter,
  HlmDialogHeader,
  HlmDialogTitle,
} from '@spartan-ng/helm/dialog';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmSwitchImports } from '@spartan-ng/helm/switch';
import { Component, model, viewChild, effect, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideAudioWaveform, lucidePencil } from '@ng-icons/lucide';
import {
  remixGoogleFill,
  remixMicrosoftFill,
  remixOpenaiFill,
  remixPauseLargeFill,
  remixRobot3Line,
} from '@ng-icons/remixicon';
import { gameFoxHead } from '@ng-icons/game-icons';

import { IAiModel } from '../../../../../core/interfaces/ai-models.interface';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AiManagementService } from '../../../../../services/ai-management-service/ai-management-service';

import {
  GET_ICON_NAME,
  GET_NAME,
} from '../../../../../shared/utils/ai-models.utils';

@Component({
  selector: 'app-ai-management-cards',
  imports: [
    NgIcon,
    HlmButton,
    HlmBadge,
    BrnDialogTrigger,
    BrnDialogContent,
    HlmDialog,
    HlmDialogContent,
    HlmDialogHeader,
    HlmDialogFooter,
    HlmDialogTitle,
    HlmDialogDescription,
    HlmInput,
    ReactiveFormsModule,
    HlmSwitchImports,
  ],
  templateUrl: './ai-management-cards.html',
  styleUrl: './ai-management-cards.css',
  providers: [
    provideIcons({
      remixOpenaiFill,
      remixGoogleFill,
      remixMicrosoftFill,
      lucideAudioWaveform,
      remixPauseLargeFill,
      lucidePencil,
      gameFoxHead,
      remixRobot3Line,
    }),
  ],
})
export class AiManagementCards {
  aiData = model<IAiModel>();
  public viewchildDialogRef = viewChild(BrnDialog);

  aiForm: FormGroup;
  hasChange = false;
  otherChanges = false;
  sttChanged = false;
  cloneChanged = false;

  sttChangedEvent = output<number>();
  cloneChangedEvent = output<number>();

  constructor(private readonly aiService: AiManagementService) {
    this.aiForm = new FormGroup({
      model: new FormControl(this.aiData()?.model_name ?? '', [
        Validators.required,
      ]),
      apiKey: new FormControl(
        this.aiData()?.provider === 'gcp'
          ? this.aiData()?.gcp_config ?? ''
          : this.aiData()?.api_key ?? '',
        [Validators.required]
      ),
      active: new FormControl(this.aiData()?.active ?? false),
      is_stt: new FormControl(this.aiData()?.is_stt ?? false),
      is_tts: new FormControl(this.aiData()?.is_tts ?? false),
      is_clone: new FormControl(this.aiData()?.is_clone ?? false),
    });

    effect(() => {
      this.aiData(); // Trigger re-evaluation when aiData changes
      this.aiForm.patchValue({
        model: this.aiData()?.model_name ?? '',
        apiKey:
          this.aiData()?.provider === 'gcp'
            ? this.aiData()?.gcp_config ?? ''
            : this.aiData()?.api_key ?? '',
        active: this.aiData()?.active ?? false,
        is_stt: this.aiData()?.is_stt ?? false,
        is_tts: this.aiData()?.is_tts ?? false,
        is_clone: this.aiData()?.is_clone ?? false,
      });
    });
  }

  ngOnInit() {
    this.aiForm.patchValue({
      model: this.aiData()?.model_name ?? '',
      apiKey:
        this.aiData()?.provider === 'gcp'
          ? this.aiData()?.gcp_config ?? ''
          : this.aiData()?.api_key ?? '',
      active: this.aiData()?.active ?? false,
      is_stt: this.aiData()?.is_stt ?? false,
      is_tts: this.aiData()?.is_tts ?? false,
      is_clone: this.aiData()?.is_clone ?? false,
    });
    this.onAiFormValueChange();
  }

  closeDialog = () => {
    this.viewchildDialogRef()?.close({});
  };

  getIconName = (name: string | undefined) => {
    return GET_ICON_NAME(name);
  };

  getName = (name: string | undefined) => {
    return GET_NAME(name);
  };

  createAiModel() {
    if (this.aiForm.valid) {
      const { model, apiKey, active, is_stt, is_tts, is_clone } =
        this.aiForm.value;
      const requestBody: any = {
        provider: this.aiData()?.provider,
        model_name: model ?? '',
        active: active ?? false,
        is_stt: is_stt ?? false,
        is_tts: is_tts ?? false,
        is_clone: is_clone ?? false,
      };
      if (this.aiData()?.provider === 'gcp') {
        requestBody.gcp_config = apiKey ?? '';
      } else {
        requestBody.api_key = apiKey ?? '';
      }

      this.aiService.createAiModel(requestBody).subscribe({
        next: (data) => {
          this.aiData.set({
            ...this.aiData()!,
            ...data,
          });
          this.closeDialog();

          if (this.sttChanged && data?.is_stt) {
            this.sttChangedEvent.emit(data?.id);
          }
          if (this.cloneChanged && data?.is_clone) {
            this.cloneChangedEvent.emit(data?.id);
          }
        },
      });
    }
  }

  updateAiModel() {
    if (this.aiForm.valid) {
      const { model, apiKey, active, is_stt, is_tts, is_clone } =
        this.aiForm.value;
      const requestBody: any = {
        id: this.aiData()?.id,
        provider: this.aiData()?.provider,
        model_name: model ?? '',
        active: active ?? false,
        is_stt: is_stt ?? false,
        is_tts: is_tts ?? false,
        is_clone: is_clone ?? false,
      };

      if (this.aiData()?.provider === 'gcp') {
        requestBody.gcp_config = apiKey ?? '';
      } else {
        requestBody.api_key = apiKey ?? '';
      }

      if (this.otherChanges) {
        this.aiService.updateAiModel(requestBody).subscribe({
          next: (data) => {
            this.aiData.set({
              ...this.aiData()!,
              ...data,
            });

            if (this.hasChange) {
              this.toggleAiModelStatus();
              this.hasChange = false;
            } else {
              this.closeDialog();
            }
            if (this.sttChanged && data?.is_stt) {
              this.sttChangedEvent.emit(this.aiData()?.id!);
            }
            if (this.cloneChanged && data?.is_clone) {
              this.cloneChangedEvent.emit(this.aiData()?.id!);
            }
            this.sttChanged = false;
            this.cloneChanged = false;
            this.otherChanges = false;
          },
        });
      } else if (this.hasChange) {
        this.toggleAiModelStatus();
        this.hasChange = false;
      }
    }
  }

  toggleAiModelStatus() {
    const requestBody: any = {
      ids: [this.aiData()?.id],
      activate: this.aiForm.value['active'],
    };

    this.aiService.updateAiModelStatus(requestBody).subscribe(() =>
      this.aiData.set({
        ...this.aiData()!,
        active: this.aiForm.value['active'],
      })
    );
    this.closeDialog();
  }

  onAiFormValueChange() {
    const initialValue = this.aiForm.value;
    this.aiForm.valueChanges.subscribe((value) => {
      this.hasChange = this.aiForm.value['active'] != initialValue['active'];
      this.otherChanges =
        this.aiForm.value['model'] != initialValue['model'] ||
        this.aiForm.value['apiKey'] != initialValue['apiKey'] ||
        this.aiForm.value['is_stt'] != initialValue['is_stt'] ||
        this.aiForm.value['is_tts'] != initialValue['is_tts'] ||
        this.aiForm.value['is_clone'] != initialValue['is_clone'];
      this.sttChanged = this.aiForm.value['is_stt'] != initialValue['is_stt'];
      this.cloneChanged =
        this.aiForm.value['is_clone'] != initialValue['is_clone'];
    });
  }
}
