import { Component, input, output } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { HlmButton } from '@spartan-ng/helm/button';

export interface MethodOption {
  icon: string;
  title: string;
  description: string;
  method: 'record' | 'upload';
  recommended?: boolean;
}

@Component({
  selector: 'app-voice-meathod-selection',
  imports: [NgIcon, HlmButton],
  templateUrl: './voice-meathod-selection.html',
  styleUrl: './voice-meathod-selection.css',
})
export class VoiceMeathodSelection {
methodOptions = input< MethodOption[]> ([]);
selectMethod = output<'record' | 'upload'>();

  onSelect(method: 'record' | 'upload') {
    this.selectMethod.emit(method);
  }
}
