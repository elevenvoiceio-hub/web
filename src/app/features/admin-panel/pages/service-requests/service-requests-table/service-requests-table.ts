import { Component, computed, effect, signal } from '@angular/core';
import { EditServiceRequests } from './edit-service-requests/edit-service-requests';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { Pagination } from '../../../../../shared/components/pagination/pagination';
import { ISelectOption } from '../../../../../core/interfaces/select.interface';
import { FeedbackService } from '../../../../../services/feedback-service/feedback-service';
import { IFeedback } from '../../../../../core/interfaces/feedback.interface';
import { CommonModule } from '@angular/common';
import { lucideSearch, lucideTrash2 } from '@ng-icons/lucide';
import { remixPencilFill } from '@ng-icons/remixicon';
import { HlmDialogService } from '@spartan-ng/helm/dialog';
import { CommonService } from '../../../../../services/common-service/common-service';

@Component({
  selector: 'app-service-requests-table',
  imports: [
    Pagination,
    HlmButton,
    NgIcon,
    BrnSelectImports,
    HlmSelectImports,
    FormsModule,
    HlmInput,
    CommonModule,
  ],
  templateUrl: './service-requests-table.html',
  styleUrl: './service-requests-table.css',
  viewProviders: [
    provideIcons({
      lucideTrash2,
      remixPencilFill,
      lucideSearch,
    }),
  ],
})
export class ServiceRequestsTable {
  serviceRequests: IFeedback[] = [];

  CATEGORY_CHOICES: ISelectOption[] = [
    { value: 'billing_inquiry', label: 'Billing Inquiry' },
    { value: 'feedback', label: 'Feedback' },
    { value: 'technical_inquiry', label: 'Technical Inquiry' },
    { value: 'general_inquiry', label: 'General Inquiry' },
    { value: 'improvement_idea', label: 'Improvement Idea' },
  ];

  PRIORITY_CHOICES: ISelectOption[] = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];

  STATUS_CHOICES: ISelectOption[] = [
    { value: 'open', label: 'Open' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'closed', label: 'Closed' },
  ];

  selectedCategory = signal<string>('');
  selectedPriority = signal<string>('');
  selectedStatus = signal<string>('');
  searchText = '';

  pageNumber = signal<number>(1);
  filteredRequests = signal<IFeedback[]>([]);
  rowsPerPage = signal<number>(5);
  displayData = computed(() =>
    this.filteredRequests().slice(
      (this.pageNumber() - 1) * this.rowsPerPage(),
      this.pageNumber() * this.rowsPerPage()
    )
  );

  constructor(
    private readonly serviceRequestsService: FeedbackService,
    private _dialogService: HlmDialogService,
    private readonly commonService: CommonService
  ) {
    this.serviceRequestsService
      .getFeebackList()
      .subscribe((requests: IFeedback[]) => {
        this.serviceRequests = requests;
        this.filteredRequests.set(requests);
      });
    effect(() => {
      this.updateTable(
        this.selectedCategory(),
        this.selectedPriority(),
        this.selectedStatus(),
        this.searchText
      );
    });
  }

  updateTable = (
    category: string,
    priority: string,
    status: string,
    searchText: string
  ) => {
    const filteredRequests = this.serviceRequests.filter((request) => {
      return (
        (!category || request.category === category) &&
        (!priority || request.priority === priority) &&
        (!status || request.status === status) &&
        (!searchText ||
          request.created_by.toLowerCase().includes(searchText.toLowerCase()) ||
          request.subject.toLowerCase().includes(searchText.toLowerCase()))
      );
    });
    this.pageNumber.set(1);
    this.filteredRequests.set(filteredRequests);
  };

  deleteRequest = (id: number) => {
    this.serviceRequestsService.deleteFeedback(id.toString()).subscribe({
      next: () => {
        this.serviceRequests = this.serviceRequests.filter(
          (request) => request.ticket_id !== id
        );
        this.updateTable(
          this.selectedCategory(),
          this.selectedPriority(),
          this.selectedStatus(),
          this.searchText
        );
        this.commonService.setToaster(
          `Service request with id ${id} deleted successfully`
        );
      },
      error: () => {
        this.commonService.setToaster('Error deleting service request');
      },
    });
  };

  openEditDialog(request: IFeedback) {
    const dialogRef = this._dialogService.open(EditServiceRequests, {
      context: {
        request: request,
      },
    });

    dialogRef.closed$.subscribe((updatedRequest) => {
      if (updatedRequest) {
        const index = this.serviceRequests.findIndex(
          (r) => r.ticket_id === updatedRequest.ticket_id
        );
        if (index !== -1) {
          this.serviceRequests[index] = updatedRequest;
          this.updateTable(
            this.selectedCategory(),
            this.selectedPriority(),
            this.selectedStatus(),
            this.searchText
          );
        }
      }
    });
  }

  findCategoryLabel(value: string): string {
    return (
      this.CATEGORY_CHOICES.find((option) => option.value === value)?.label ||
      value
    );
  }

  findPriorityLabel(value: string): string {
    return (
      this.PRIORITY_CHOICES.find((option) => option.value === value)?.label ||
      value
    );
  }

  findStatusLabel(value: string): string {
    return (
      this.STATUS_CHOICES.find((option) => option.value === value)?.label ||
      value
    );
  }
}
