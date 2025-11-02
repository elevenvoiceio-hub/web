import { Component } from '@angular/core';
import { SubscriptionsService } from '../../../../services/subscriptions-service/subscriptions-service';
import { PlanCards } from './plan-cards/plan-cards';
import { HlmButton } from '@spartan-ng/helm/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePlus } from '@ng-icons/lucide';
import { IPlan } from '../../../../core/interfaces/plan.interface';

@Component({
  selector: 'app-plan-management',
  imports: [PlanCards, HlmButton, NgIcon],
  templateUrl: './plan-management.html',
  styleUrl: './plan-management.css',
  viewProviders: [provideIcons({ lucidePlus })],
})
export class PlanManagement {
  plans: IPlan[] = [];

  constructor(private planService: SubscriptionsService) {
    this.getPlans();
  }

  getPlans() {
    this.planService.getSubscriptions().subscribe((plans: any) => {
      this.plans = plans;
    });
  }

  addPlan() {
    if (this.plans.length < 4) {
      this.plans.push({
        id: null,
        name: '',
        price: {},
        description: '',
        features: [],
        limitations: [],
        old_price: 0,
        duration_days: 0,
        is_popular: false,
        character_limit: 0,
        voice_limit: 0,
        default_character_limit: 0,
        discount: 0,
        on_offer: false,
        plan_id: '',
      });
    }
  }
}
