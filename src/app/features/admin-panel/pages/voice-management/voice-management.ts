import { Component } from '@angular/core';
import { VoicesService } from '../../../../services/voices-service/voices-service';
import { VoiceManagementTable } from './voice-management-table/voice-management-table';

@Component({
  selector: 'app-voice-management',
  imports: [VoiceManagementTable],
  templateUrl: './voice-management.html',
  styleUrl: './voice-management.css',
})
export class VoiceManagement {}
