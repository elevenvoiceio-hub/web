import { Component } from '@angular/core';
import { VoiceAppMenu } from '../voice-app/component/voice-app-menu/voice-app-menu';
import { UserData } from './user-data/user-data';

@Component({
  selector: 'app-user-profile',
  imports: [VoiceAppMenu, UserData],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile {}
