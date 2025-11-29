import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideAudioLines } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-headers',
  imports: [RouterModule, NgIcon, HlmButton],
  templateUrl: './headers.html',
  styleUrl: './headers.css',
  providers: [provideIcons({ lucideAudioLines })],
})
export class Headers {
  applicationName = environment.applicationName;
}
