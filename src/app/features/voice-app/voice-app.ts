import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VoiceAppMenu } from './component/voice-app-menu/voice-app-menu';
import { lucideMenu } from '@ng-icons/lucide';
import { provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-voice-app',
  imports: [
    RouterOutlet,
    VoiceAppMenu
],
  providers: [provideIcons({ lucideMenu })],
  templateUrl: './voice-app.html',
  styleUrl: './voice-app.css',
})
export class VoiceApp {}
