import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { SideMenu } from '../../../../shared/components/side-menu/side-menu';
import {
  remixAiGenerate2,
  remixDashboardFill,
  remixFeedbackLine,
  remixMailFill,
  remixMoneyRupeeCircleFill,
  remixSecurePaymentFill,
  remixUserVoiceFill,
} from '@ng-icons/remixicon';
import { lucideUsers } from '@ng-icons/lucide';
import { UserService } from '../../../../services/user/user-service';

@Component({
  selector: 'app-admin-side-nav',
  imports: [CommonModule, SideMenu, RouterModule, NgIcon],
  templateUrl: './admin-side-nav.html',
  styleUrl: './admin-side-nav.css',
  providers: [
    provideIcons({
      remixDashboardFill,
      lucideUsers,
      remixAiGenerate2,
      remixUserVoiceFill,
      remixMoneyRupeeCircleFill,
      remixMailFill,
      remixSecurePaymentFill,
      remixFeedbackLine
    }),
  ],
})
export class AdminSideNav {
   userDetails: any;

  constructor(
    private readonly userService: UserService
  ) {
    this.userService.UserDetails.subscribe((data: any) => {
      this.setUserData(data);
    });
  }

  setUserData = (data: any) => {
    if (data) {
      this.userDetails = data;
    } else {
      this.userService.getUserData().subscribe((data) => {
        this.userDetails = data;
        this.userService.UserDetailsData = data;
      });
    }
  };
}
