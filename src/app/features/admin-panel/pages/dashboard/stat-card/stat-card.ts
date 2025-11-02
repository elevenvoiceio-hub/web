import { Component, input } from '@angular/core';
import { HlmCardImports } from '@spartan-ng/helm/card';

@Component({
  selector: 'app-stat-card',
  imports: [HlmCardImports,],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.css',
})
export class StatCard {
  title = input<string>();
  value = input<number>();

}
