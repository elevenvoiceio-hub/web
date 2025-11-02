import { Component, effect, input, output } from '@angular/core';
import { HlmProgressIndicator, HlmProgress } from '@spartan-ng/helm/progress';
import { UserService } from '../../../services/user/user-service';
import { IUser } from '../../../core/interfaces/user.interface';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideInfinity } from '@ng-icons/lucide';
import { SubscriptionsService } from '../../../services/subscriptions-service/subscriptions-service';
import { IMySubscription } from '../../../core/interfaces/subscription.interface';
import { IPlan } from '../../../core/interfaces/plan.interface';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-plan-details',
  imports: [HlmProgressIndicator, HlmProgress, NgIcon, CommonModule],
  templateUrl: './plan-details.html',
  styleUrl: './plan-details.css',
  viewProviders: [provideIcons({ lucideInfinity })],
})
export class PlanDetails {
  value = 0;
  userData: IUser | null = null;

  mySubscriptionData: IMySubscription | null = null;
  planDetails: IPlan[] = [];

  myPlan: IPlan | undefined;

  emitMySubscription = output<IMySubscription | null>();
  emitAllPlans = output<IPlan[]>();
  constructor(
    private readonly userService: UserService,
    private subscriptionsService: SubscriptionsService
  ) {
    this.userService.UserDetails.subscribe((data) => {
      this.userData = data;
    });

    this.getAllSubscriptionDetails();
  }

  getAllSubscriptionDetails() {
    forkJoin({
      mySubsctionPlan: this.subscriptionsService.checkUserSubscription(),
      allPlans: this.subscriptionsService.getSubscriptions(),
    }).subscribe(({ mySubsctionPlan, allPlans }) => {
      this.mySubscriptionData = mySubsctionPlan;
      this.userService.UserSubscriptionData = mySubsctionPlan;
      this.emitMySubscription.emit(mySubsctionPlan);
      this.planDetails = allPlans;
      this.emitAllPlans.emit(allPlans);
      this.myPlan = allPlans.find(
        (plan) => plan.id == mySubsctionPlan?.plan_id
      );
    });
  }
}
