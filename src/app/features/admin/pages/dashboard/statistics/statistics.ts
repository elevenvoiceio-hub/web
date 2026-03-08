import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { IAdminStats } from '../../../../../core/interfaces/dashboard.interface';
import { AdminService } from '../../../../../services/admin-service/admin-service';
import { ModelUsageChart } from '../model-usage-chart/model-usage-chart';

@Component({
  selector: 'app-statistics',
  imports: [CommonModule, ModelUsageChart],
  templateUrl: './statistics.html',
  styleUrl: './statistics.css',
})
export class Statistics {
  stats = signal<IAdminStats | null>(null);

  constructor(private readonly adminService: AdminService) {
    this.getStatistics();
  }

  getStatistics() {
    this.adminService.getAdminPanelDetails().subscribe((data) => {
      this.stats.set(data);
    });
  }
}
