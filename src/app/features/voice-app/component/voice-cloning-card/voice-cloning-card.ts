import { Component, input } from '@angular/core';
import { BrnDialogService } from '@spartan-ng/brain/dialog';
import { VoiceCloningDialog } from '../voice-cloning-dialog/voice-cloning-dialog';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMic } from '@ng-icons/lucide';

@Component({
  selector: 'app-voice-cloning-card',
  imports: [NgIcon],
  templateUrl: './voice-cloning-card.html',
  styleUrl: './voice-cloning-card.css',
  viewProviders: [provideIcons({ lucideMic })],
})
export class VoiceCloningCard {
  voicesCount = input<number>(0);

  constructor(private _dialogService: BrnDialogService) {}

  openDialog() {
    this._dialogService.open(VoiceCloningDialog);
  }
}
