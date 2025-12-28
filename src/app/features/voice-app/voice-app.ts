import { Component } from '@angular/core';
import { SideBarDesktop } from "../../shared/components/side-bar-desktop/side-bar-desktop";
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { RouterModule } from "@angular/router";
import { USER_SIDE_NAV_CONSTANT } from '../../shared/constants/user-side-nav.constant';

@Component({
  selector: 'app-voice-app',
  imports: [SideBarDesktop, HlmSidebarImports, RouterModule],
  templateUrl: './voice-app.html',
  styleUrl: './voice-app.css',
})
export class VoiceApp {
   protected readonly _items = USER_SIDE_NAV_CONSTANT
}
