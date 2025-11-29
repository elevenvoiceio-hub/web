import { UserService } from './../../services/user/user-service';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';
import { ISelectOption } from '../../core/interfaces/select.interface';
import { FeedbackService } from '../../services/feedback-service/feedback-service';
import { CommonService } from '../../services/common-service/common-service';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { lucideAudioLines } from '@ng-icons/lucide';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-feedback',
  imports: [
    NgIcon,
    RouterModule,
    HlmButton,
    ReactiveFormsModule,
    BrnSelectImports,
    HlmSelectImports,
    HlmInput
],
  templateUrl: './feedback.html',
  styleUrl: './feedback.css',
  viewProviders: [provideIcons({lucideAudioLines})],
})
export class Feedback {
  applicationName = environment.applicationName;
  feedbackForm = new FormGroup({
    category: new FormControl('', Validators.required),
    priority: new FormControl('', Validators.required),
    user: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(255),
    ]),
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
    private readonly feedbackService: FeedbackService,
    private readonly commonService: CommonService,
    private readonly UserService: UserService
  ) {
    this.UserService.getUserData().subscribe((data: any) => {
      this.feedbackForm.patchValue({ user: data.email });
    })
  }
  onSubmit = () => {
    this.feedbackService.sendFeedback(this.feedbackForm.value).subscribe({
      next: (data) => {
        this.commonService.setToaster('Feedback submitted successfully');
        this.feedbackForm.reset();
      },
      error: (error) => {
        this.commonService.setToaster('Error submitting feedback');
      },
    });
  };
}
