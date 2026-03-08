import { Component } from '@angular/core';
import { ADMIN_SIDE_NAV_CONSTANT } from '../../shared/constants/user-side-nav.constant';
import { RouterModule } from '@angular/router';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { SideBarDesktop } from '../../shared/components/side-bar-desktop/side-bar-desktop';

@Component({
  selector: 'app-admin',
  imports: [SideBarDesktop, HlmSidebarImports, RouterModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  protected readonly _items = ADMIN_SIDE_NAV_CONSTANT;
}
