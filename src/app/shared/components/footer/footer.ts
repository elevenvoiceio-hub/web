import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideAudioLines, lucideInstagram } from '@ng-icons/lucide';
import { remixWechatLine, remixWhatsappLine } from '@ng-icons/remixicon';

@Component({
  selector: 'app-footer',
  imports: [NgIcon, RouterModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  viewProviders: [
    provideIcons({
      lucideAudioLines,
      lucideInstagram,
      remixWhatsappLine,
      remixWechatLine,
    }),
  ],
})
export class Footer {}
