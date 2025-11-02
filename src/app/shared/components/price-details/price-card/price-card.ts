import { Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideX } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { IPlan } from '../../../../core/interfaces/plan.interface';

@Component({
  selector: 'app-price-card',
  imports: [NgIcon, HlmButton],
  templateUrl: './price-card.html',
  styleUrl: './price-card.css',
  viewProviders: [provideIcons({ lucideCheck, lucideX })],
})
export class PriceCard {
  cardData = input<IPlan>();
  key = input<'Monthly' | 'Yearly' | 'Lifetime'>('Monthly');

  get price() {
    switch (this.key()) {
      case 'Monthly':
        return this.cardData()?.price?.monthly ?? '';
      case 'Yearly':
        return this.cardData()?.price?.yearly ?? '';
      case 'Lifetime':
        return this.cardData()?.price?.lifetime ?? '';
    }
  }
}
