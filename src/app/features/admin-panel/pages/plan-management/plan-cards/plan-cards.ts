import { Component, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCheck,
  lucideMinus,
  lucideTrash2,
  lucideX,
} from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { IPlan } from '../../../../../core/interfaces/plan.interface';
import { remixPencilFill } from '@ng-icons/remixicon';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmSwitch } from '@spartan-ng/helm/switch';
import { SubscriptionsService } from '../../../../../services/subscriptions-service/subscriptions-service';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmLabel } from '@spartan-ng/helm/label';
import { features } from 'process';

@Component({
  selector: 'app-plan-cards',
  imports: [
    NgIcon,
    HlmButton,
    ReactiveFormsModule,
    HlmInput,
    HlmSwitch,
    HlmCardImports,
    HlmLabel,
  ],
  templateUrl: './plan-cards.html',
  styleUrl: './plan-cards.css',
  viewProviders: [
    provideIcons({
      lucideCheck,
      lucideX,
      lucideTrash2,
      remixPencilFill,
      lucideMinus,
    }),
  ],
})
export class PlanCards {
  cardData = input<IPlan>();
  fetchLatestPlans = output<void>();
  edit = false;

  planForm = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    features: new FormArray([new FormControl()]),
    limitations: new FormArray([new FormControl()]),
    is_popular: new FormControl(),
    character_limit: new FormControl(1, { validators: [Validators.min(1)] }),
    voice_limit: new FormControl(),
    default_character_limit: new FormControl(1, {
      validators: [Validators.min(1)],
    }),
    discount: new FormControl(),
    on_offer: new FormControl(),
    old_price: new FormControl(),
    duration_days: new FormControl(),
    price: new FormGroup({
      monthly: new FormControl(),
      yearly: new FormControl(),
      lifetime: new FormControl(),
    }),
    plan_id: new FormControl(),
  });

  constructor(private subscriptionsService: SubscriptionsService) {}

  ngOnInit() {
    if (this.cardData()) {
      this.cardData()
        ?.features.slice(0, -1)
        .forEach(() => this.addFeature());
      this.cardData()
        ?.limitations.slice(0, -1)
        .forEach(() => this.addLimitation());
      this.planForm.patchValue(this.cardData()!);
    }
  }

  get features(): FormArray {
    return this.planForm.get('features') as FormArray;
  }

  get limitations(): FormArray {
    return this.planForm.get('limitations') as FormArray;
  }

  addFeature() {
    this.features.push(new FormControl(''));
  }

  addLimitation() {
    this.limitations.push(new FormControl(''));
  }

  deleteFeature(index: number) {
    this.features.removeAt(index);
  }

  deleteLimitation(index: number) {
    this.limitations.removeAt(index);
  }

  savePlan() {
    if (this.planForm.valid) {
      const requestBody = {
        ...this.cardData(),
        ...this.planForm.getRawValue(),
      };

      requestBody.features = requestBody.features.filter(
        (data) => data &&data.trim() !== ''
      );
      requestBody.limitations = requestBody.limitations.filter(
        (data) => data && data.trim() !== ''
      );
      if (this.cardData()?.id) {
        this.subscriptionsService
          .updateSubscription(requestBody)
          .subscribe(() => {
            this.fetchLatestPlans.emit();
            this.edit = false;
          });
      } else {
        this.subscriptionsService.addSubscription(requestBody).subscribe(() => {
          this.fetchLatestPlans.emit();
          this.edit = false;
        });
      }
    }
  }

  deletePlan() {
    if (this.cardData()?.id) {
      this.subscriptionsService
        .deleteSubscription(this.cardData()!.id!)
        .subscribe(() => {
          this.fetchLatestPlans.emit();
        });
    } else {
      this.fetchLatestPlans.emit();
    }
  }
}
