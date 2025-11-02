import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { SideMenu } from '../../../../shared/components/side-menu/side-menu';
import {
  lucideChartColumn,
  lucideCreditCard,
  lucideMicVocal,
  lucideMic,
  lucideSquareStack,
  lucideInfinity,
} from '@ng-icons/lucide';
import { remixVoiceRecognitionLine } from '@ng-icons/remixicon';
import { UserService } from '../../../../services/user/user-service';
import { IUser } from '../../../../core/interfaces/user.interface';

@Component({
  selector: 'app-voice-app-menu',
  imports: [CommonModule, SideMenu, RouterModule, NgIcon],
  templateUrl: './voice-app-menu.html',
  styleUrl: './voice-app-menu.css',
  providers: [
    provideIcons({
      lucideChartColumn,
      lucideCreditCard,
      lucideMicVocal,
      lucideMic,
      lucideSquareStack,
      remixVoiceRecognitionLine,
      lucideInfinity
    }),
  ],
})
export class VoiceAppMenu {
  tokens = 0;
  userData: IUser | null = null;

  constructor(private readonly userService: UserService) {
      this.userService.UserDetails.subscribe((data) => {
        this.userData = data;
      });
      this.userService.UserSubscription.subscribe((data) => {
        this.tokens = data?.remainining_character_credits || 0;
      });

    }
}
