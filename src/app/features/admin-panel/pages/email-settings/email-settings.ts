import { Component } from '@angular/core';
import { EmailForm } from './email-form/email-form';

@Component({
  selector: 'app-email-settings',
  imports: [EmailForm],
  templateUrl: './email-settings.html',
  styleUrl: './email-settings.css',
})
export class EmailSettings {}
