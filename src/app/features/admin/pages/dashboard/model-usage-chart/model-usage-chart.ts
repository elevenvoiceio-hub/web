import { Component, signal } from '@angular/core';
import { GET_NAME } from '../../../../../shared/utils/ai-models.utils';
import { AiManagementService } from '../../../../../services/ai-management-service/ai-management-service';
import { HlmBadge } from '@spartan-ng/helm/badge';
interface ModelData {
  name: string;
  tokens: number;
  color: string;
  isActive?: boolean;
}

@Component({
  selector: 'app-model-usage-chart',
  imports: [HlmBadge],
  templateUrl: './model-usage-chart.html',
  styleUrl: './model-usage-chart.css',
})
export class ModelUsageChart {
  mockModels = signal<ModelData[]>([
    { name: 'openai', tokens: 0, color: 'bg-blue-500', isActive: false },
    { name: 'gcp', tokens: 0, color: 'bg-purple-500', isActive: false },
    { name: 'azure', tokens: 0, color: 'bg-pink-500', isActive: false },
    { name: 'speechify', tokens: 0, color: 'bg-cyan-500', isActive: false },
    { name: 'elevenlabs', tokens: 0, color: 'bg-emerald-500', isActive: false },
    { name: 'lemonfox', tokens: 0, color: 'bg-orange-500', isActive: false },
    { name: 'labs', tokens: 0, color: 'bg-red-500', isActive: false },
  ]);

  // Property to hold the maximum token count
  maxTokens = signal<number>(0);

  constructor(private AiManagementService: AiManagementService) {
    this.getAiModels();
  }

  getAiModels() {
    this.AiManagementService.getAiModels().subscribe((response) => {
      response.sort((a, b) => b.id - a.id);
      const updatedModels = this.mockModels().map((model) => {
        const foundModel = response.find((m) => m.provider === model.name);
        if (foundModel) {
          model.tokens = foundModel.credits_used || 0;
          model.isActive = foundModel.active;
        }
        return model;
      });
      this.mockModels.set(updatedModels);

      this.maxTokens.set(Math.max(...this.mockModels().map((m) => m.tokens)));
    });
  }

  /**
   * Calculates the percentage of tokens used relative to the max usage.
   * @param tokens The token count for the current model.
   * @returns The percentage value as a number.
   */
  getPercentage(tokens: number): number {
    if (this.maxTokens() === 0) return 0; // Avoid division by zero
    return (tokens / this.maxTokens()) * 100;
  }

  /**
   * Formats the token number into a readable string (Billion or Million).
   * @param tokens The raw token count.
   * @returns The formatted string (e.g., "42.5B").
   */
  formatTokens(tokens: number): string {
    if (tokens >= 1000000000) {
      return `${(tokens / 1000000000).toFixed(1)}B`;
    }
    if (tokens >= 1000000) {
      return `${(tokens / 1000000).toFixed(1)}M`;
    }
    if (tokens >= 1000) {
      return `${(tokens / 1000).toFixed(1)}K`;
    }
    return tokens.toString();
  }

  getName = (name: string | undefined) => {
    return GET_NAME(name);
  };
}
