import { Component } from '@angular/core';
import { SideBarDesktop } from "../../shared/components/side-bar-desktop/side-bar-desktop";
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';

@Component({
  selector: 'app-voice-app',
  imports: [SideBarDesktop, HlmSidebarImports],
  templateUrl: './voice-app.html',
  styleUrl: './voice-app.css',
})
export class VoiceApp {
}
