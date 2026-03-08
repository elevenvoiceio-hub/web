import { Component, Input, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideAudioLines,
  lucideBookCheck,
  lucideBookOpenText,
  lucideChevronRight,
  lucideCreditCard,
  lucideEllipsisVertical,
  lucideInfinity,
  lucideLogOut,
  lucideMenu,
  lucideMessageSquareMore,
  lucideMic,
  lucideMicVocal,
  lucideMoon,
  lucideSquareArrowOutUpRight,
  lucideSquareStack,
  lucideSun,
  lucideSunMoon,
  lucideUser,
  lucideLayoutDashboard,
  lucideUsers,
  lucideMail,
} from '@ng-icons/lucide';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { environment } from '../../../../environments/environment';
import {
  remixAiGenerate2,
  remixCoinsFill,
  remixDashboardLine,
  remixFeedbackLine,
  remixVoiceRecognitionLine,
} from '@ng-icons/remixicon';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IUser } from '../../../core/interfaces/user.interface';
import { IMySubscription } from '../../../core/interfaces/subscription.interface';
import { IPlan } from '../../../core/interfaces/plan.interface';
import { forkJoin } from 'rxjs';
import { LocalStorageService } from '../../../services/local-storage-service/local-storage-service';
import { SubscriptionsService } from '../../../services/subscriptions-service/subscriptions-service';
import { UserService } from '../../../services/user/user-service';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';

@Component({
  selector: 'app-side-bar-desktop',
  imports: [
    HlmSidebarImports,
    NgIcon,
    HlmIcon,
    HlmDropdownMenuImports,
    HlmAvatarImports,
    RouterModule,
    CommonModule,
    HlmButton,
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
      lucideCreditCard,
      lucideChevronRight,
      lucideEllipsisVertical,
      lucideUser,
      lucideLogOut,
      lucideSunMoon,
      lucideSun,
      lucideMoon,
      lucideBookOpenText,
      lucideSquareArrowOutUpRight,
      lucideMessageSquareMore,
      remixDashboardLine,
      lucideInfinity,
      lucideLayoutDashboard,
      lucideUsers,
      remixAiGenerate2,
      lucideMail,
      remixCoinsFill,
    }),
  ],
})
export class SideBarDesktop {
  app = environment.applicationName;
  @Input() items!: any;
  @Input() showCredits: boolean = false;
  tokens = signal<string>('');
  userData = signal<IUser | null>(null);
  subscriptionData = signal<IMySubscription | null>(null);
  myPlan = signal<IPlan | undefined>(undefined);

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly localStorageService: LocalStorageService,
    private readonly subscriptionsService: SubscriptionsService,
  ) {
    this.userService.UserDetails.subscribe((data: any) => {
      this.setUserData(data);
    });

    this.userService.UserSubscription.subscribe((data: IMySubscription | null) => {
      this.setSubscriptionData(data);
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
      this.userData.set(data);
    } else {
      this.userService.getUserData().subscribe((data) => {
        this.userData.set(data);
        this.userService.UserDetailsData = data;
      });
    }
  };

  setSubscriptionData = (data: IMySubscription | null) => {
    if (data) {
      this.subscriptionData.set(data);
    } else {
      forkJoin({
        mySubsctionPlan: this.subscriptionsService.checkUserSubscription(),
        allPlans: this.subscriptionsService.getSubscriptions(),
      }).subscribe(({ mySubsctionPlan, allPlans }) => {
        this.subscriptionData.set(mySubsctionPlan);
        this.userService.UserSubscriptionData = mySubsctionPlan;
        const myPlan = allPlans.find((plan) => plan.id == mySubsctionPlan?.plan_id);
        this.myPlan.set(myPlan);
      });
    }
  };
}
