import { SubscriptionsService } from './../../../services/subscriptions-service/subscriptions-service';
import { Component } from '@angular/core';
import {
  HlmTabs,
  HlmTabsList,
  HlmTabsTrigger,
} from '@spartan-ng/helm/tabs';
import { PriceCard } from './price-card/price-card';
import { IPlan } from '../../../core/interfaces/plan.interface';

@Component({
  selector: 'app-price-details',
  imports: [
    HlmTabs,
    HlmTabsList,
    HlmTabsTrigger,
    PriceCard,
  ],
  templateUrl: './price-details.html',
  styleUrl: './price-details.css',
})
export class PriceDetails {
  planDetails: IPlan[] = [];
  tabs: ('Monthly' | 'Yearly' | 'Lifetime')[] = [];
  key: 'Monthly' | 'Yearly' | 'Lifetime' = 'Monthly';

  constructor(private readonly subscriptionsService: SubscriptionsService) {
    this.getPlanDetails();
  }

  getPlanDetails() {
    this.subscriptionsService.getSubscriptions().subscribe((plans: IPlan[]) => {
      this.planDetails = plans;
      const isMonthly = this.planDetails.some(
        (plan) =>
          plan.price.monthly &&
          plan.price.monthly !== '0' &&
          plan.price.monthly !== ''
      );
      const isYearly = this.planDetails.some(
        (plan) =>
          plan.price.yearly &&
          plan.price.yearly !== '0' &&
          plan.price.yearly !== ''
      );
      const isLifetime = this.planDetails.some(
        (plan) =>
          plan.price.lifetime &&
          plan.price.lifetime !== '0' &&
          plan.price.lifetime !== ''
      );
      this.tabs = [];
      if (isMonthly) this.tabs.push('Monthly');
      if (isYearly) this.tabs.push('Yearly');
      if (isLifetime) this.tabs.push('Lifetime');
      this.key = this.tabs[0] || '';
    });
  }
}
