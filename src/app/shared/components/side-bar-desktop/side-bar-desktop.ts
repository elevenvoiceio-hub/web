import { Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideAudioLines,
  lucideBookCheck,
  lucideMenu,
  lucideMic,
  lucideMicVocal,
  lucideSquareStack,
} from '@ng-icons/lucide';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { environment } from '../../../../environments/environment';
import { remixFeedbackLine, remixVoiceRecognitionLine } from '@ng-icons/remixicon';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-bar-desktop',
  imports: [
    HlmSidebarImports,
    NgIcon,
    HlmIcon,
    HlmDropdownMenuImports,
    HlmAvatarImports,
    RouterModule
],
  templateUrl: './side-bar-desktop.html',
  styleUrl: './side-bar-desktop.css',
  viewProviders: [
    provideIcons({
      lucideAudioLines,
      lucideMenu,
      lucideMic,
      lucideSquareStack,
      lucideMicVocal,
      lucideBookCheck,
      remixFeedbackLine,
      remixVoiceRecognitionLine,
    }),
  ],
})
export class SideBarDesktop {
  app = environment.applicationName;
  @Input() items!: any;
}
