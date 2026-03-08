import { Component } from '@angular/core';
import { Statistics } from './statistics/statistics';
import { PageHeader } from '../../../../shared/components/page-header/page-header';

@Component({
  selector: 'app-dashboard',
  imports: [Statistics, PageHeader],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
