import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VoiceAppMenu } from './component/voice-app-menu/voice-app-menu';
import { BrnSheetContent, BrnSheetTrigger } from '@spartan-ng/brain/sheet';
import {
  HlmSheet,
  HlmSheetContent,
  HlmSheetHeader,
} from '@spartan-ng/helm/sheet';
import { lucideMenu } from '@ng-icons/lucide';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';

@Component({
  selector: 'app-voice-app',
  imports: [
    RouterOutlet,
    VoiceAppMenu,
    HlmSheet,
    HlmSheetHeader,
    HlmSheetContent,
    BrnSheetTrigger,
    BrnSheetContent,
    NgIcon,
  ],
  providers: [provideIcons({ lucideMenu })],
  templateUrl: './voice-app.html',
  styleUrl: './voice-app.css',
})
export class VoiceApp {}
