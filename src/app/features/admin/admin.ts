import { Component, inject, signal } from '@angular/core';
import {
  ADMIN_SIDE_NAV_CONSTANT,
  SUBADMIN_SIDE_NAV_CONSTANT,
} from '../../shared/constants/user-side-nav.constant';
import { RouterModule } from '@angular/router';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { SideBarDesktop } from '../../shared/components/side-bar-desktop/side-bar-desktop';
import { UserService } from '../../services/user/user-service';

@Component({
  selector: 'app-admin',
  imports: [SideBarDesktop, HlmSidebarImports, RouterModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  protected _items = signal(SUBADMIN_SIDE_NAV_CONSTANT);
  private readonly userService = inject(UserService);

  ngOnInit() {
    this.userService.UserDetails.subscribe((data: any) => {
      this.setUserData(data);
    });
  }

  setUserData(data: any) {
    if (data) {
      if (data.role === 'admin') {
        this._items.set(ADMIN_SIDE_NAV_CONSTANT);
      }
    } else {
      this.userService.getUserData().subscribe((data) => {
        this.userService.UserDetailsData = data;
        if (data.role === 'admin') {
          this._items.set(ADMIN_SIDE_NAV_CONSTANT);
        }
      });
    }
  }
}
