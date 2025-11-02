import { Component } from '@angular/core';
import { Headers } from '../../shared/components/headers/headers';
import { Footer } from '../../shared/components/footer/footer';
import { PriceDetails } from '../../shared/components/price-details/price-details';

@Component({
  selector: 'app-pricing',
  imports: [Headers, Footer, PriceDetails],
  templateUrl: './pricing.html',
  styleUrl: './pricing.css',
})
export class Pricing {}
