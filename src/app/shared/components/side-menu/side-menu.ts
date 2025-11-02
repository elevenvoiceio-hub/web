import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideAudioLines,
  lucideBookCheck,
  lucideBookOpenText,
  lucideChevronRight,
  lucideCreditCard,
  lucideLogOut,
  lucideMessageSquareMore,
  lucideMoon,
  lucideSquareArrowOutUpRight,
  lucideSun,
  lucideSunMoon,
  lucideUser,
  lucideMenu,
} from '@ng-icons/lucide';
import { remixDashboardLine, remixFeedbackLine } from '@ng-icons/remixicon';
import { BrnMenuTrigger } from '@spartan-ng/brain/menu';
import { HlmIcon } from '@spartan-ng/helm/icon';
import {
  HlmMenu,
  HlmMenuItem,
  HlmMenuLabel,
  HlmMenuSeparator,
  HlmMenuItemIcon,
  HlmMenuGroup,
  HlmSubMenu,
} from '@spartan-ng/helm/menu';
import { UserService } from '../../../services/user/user-service';
import { LocalStorageService } from '../../../services/local-storage-service/local-storage-service';
import { HlmSheet, HlmSheetImports } from '@spartan-ng/helm/sheet';
import { BrnSheetContent, BrnSheetTrigger } from '@spartan-ng/brain/sheet';
import { IMySubscription } from '../../../core/interfaces/subscription.interface';
import { IUser } from '../../../core/interfaces/user.interface';
import { SubscriptionsService } from '../../../services/subscriptions-service/subscriptions-service';
import { forkJoin } from 'rxjs';
import { IPlan } from '../../../core/interfaces/plan.interface';

@Component({
  selector: 'app-side-menu',
  imports: [
    CommonModule,
    BrnMenuTrigger,
    HlmMenu,
    HlmMenuItem,
    HlmMenuLabel,
    HlmMenuSeparator,
    HlmMenuItemIcon,
    HlmMenuGroup,
    HlmIcon,
    NgIcon,
    HlmSubMenu,
    RouterModule,
    HlmSheet,
    HlmSheetImports,
    BrnSheetTrigger,
    BrnSheetContent,
  ],
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.css',
  providers: [
    provideIcons({
      lucideUser,
      lucideCreditCard,
      lucideLogOut,
      lucideSunMoon,
      lucideChevronRight,
      lucideSun,
      lucideMoon,
      lucideAudioLines,
      lucideBookCheck,
      lucideBookOpenText,
      lucideSquareArrowOutUpRight,
      lucideMessageSquareMore,
      remixFeedbackLine,
      remixDashboardLine,
      lucideMenu,
    }),
  ],
})
export class SideMenu {
  userDetails: IUser | null = null;
  subscriptionData: IMySubscription | null = null;
  myPlan: IPlan | undefined;

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly localStorageService: LocalStorageService,
    private readonly subscriptionsService: SubscriptionsService
  ) {
    this.userService.UserDetails.subscribe((data: any) => {
      this.setUserData(data);
    });
  }

  lightMode = () => {
    const element = document.querySelector('html');
    element?.classList.remove('dark');
  };

  darkMode = () => {
    const element = document.querySelector('html');
    element?.classList.add('dark');
  };

  logout = () => {
    this.userService.Logout().subscribe(() => {
      this.localStorageService.clearData();
      this.userService.UserDetailsData = null;
      this.router.navigate(['/login']);
    });
  };

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

  setSubscriptionData = (data: IMySubscription | null) => {
    if (data) {
      this.subscriptionData = data;
    } else {
      forkJoin({
        mySubsctionPlan: this.subscriptionsService.checkUserSubscription(),
        allPlans: this.subscriptionsService.getSubscriptions(),
      }).subscribe(({ mySubsctionPlan, allPlans }) => {
        this.subscriptionData = mySubsctionPlan;
        this.userService.UserSubscriptionData = mySubsctionPlan;
        this.myPlan = allPlans.find(
          (plan) => plan.id == mySubsctionPlan?.plan_id
        );
      });
    }
  };
}
