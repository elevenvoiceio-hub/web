import { Component } from '@angular/core';
import { AdminService } from '../../../../../services/admin-service/admin-service';
import { CommonModule } from '@angular/common';
import { IAdminStats } from '../../../../../core/interfaces/dashboard.interface';
import { provideIcons } from '@ng-icons/core';
import { lucideUsers } from '@ng-icons/lucide';
import { remixAiGenerate2, remixUserVoiceFill, remixMoneyRupeeCircleFill, remixFeedbackLine } from '@ng-icons/remixicon';
import { ModelUsageChartComponent } from "../model-usage-chart/model-usage-chart";

@Component({
  selector: 'app-statistics',
  imports: [CommonModule, ModelUsageChartComponent],
  templateUrl: './statistics.html',
  styleUrl: './statistics.css',
  viewProviders: [provideIcons({
      lucideUsers,
      remixAiGenerate2,
      remixUserVoiceFill,
      remixMoneyRupeeCircleFill,
      remixFeedbackLine
  })],
})
export class Statistics {
  stats: IAdminStats | null = null;

  constructor(private readonly adminService: AdminService ) {
    this.getStatistics();

  }

  getStatistics() {
    this.adminService.getAdminPanelDetails().subscribe((data) => {
      this.stats = data;
    });
  }

}
