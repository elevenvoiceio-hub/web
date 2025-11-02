import { Component, inject } from '@angular/core';
import { IFeedback } from '../../../../../../core/interfaces/feedback.interface';
import {
  BrnDialogImports,
  BrnDialogRef,
  injectBrnDialogContext,
} from '@spartan-ng/brain/dialog';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../../../../../../services/common-service/common-service';
import { FeedbackService } from '../../../../../../services/feedback-service/feedback-service';
import { CommonModule } from '@angular/common';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmLabel } from '@spartan-ng/helm/label';
import { HlmTextareaImports } from '@spartan-ng/helm/textarea';
import { ISelectOption } from '../../../../../../core/interfaces/select.interface';

@Component({
  selector: 'app-edit-service-requests',
  imports: [
    BrnDialogImports,
    HlmDialogImports,
    HlmButton,
    BrnSelectImports,
    HlmSelectImports,
    ReactiveFormsModule,
    CommonModule,
    HlmInput,
    HlmLabel,
    HlmTextareaImports,
  ],
  templateUrl: './edit-service-requests.html',
  styleUrl: './edit-service-requests.css',
})
export class EditServiceRequests {
  private readonly _dialogRef = inject<BrnDialogRef<IFeedback>>(BrnDialogRef);
  private readonly _dialogContext = injectBrnDialogContext<{
    request: IFeedback;
  }>();

  request = this._dialogContext.request;

  requestForm = new FormGroup({
    category: new FormControl({}),
    priority: new FormControl({}),
    status: new FormControl({}),
  });

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

  constructor(
    private readonly commonService: CommonService,
    private feedbackService: FeedbackService
  ) {
    this.requestForm.patchValue({
      category: this.request.category,
      priority: this.request.priority,
      status: this.request.status,
    });
  }

  onSubmit() {
    if (this.requestForm.valid) {
      const updatedData = {
        ...this.request,
        ...this.requestForm.value,
      };

      this.feedbackService
        .updateFeedback(this.request.ticket_id, updatedData)
        .subscribe({
          next: (response) => {
            this.commonService.setToaster(
              'Service request updated successfully.'
            );
            this._dialogRef.close(response);
          },
          error: (error) => {
            this.commonService.setToaster(
              'Failed to update service request. Please try again.'
            );
          },
        });
    }
  }
}
