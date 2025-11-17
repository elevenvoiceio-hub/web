import { LocalStorageService } from './../../../../../services/local-storage-service/local-storage-service';
import { Component, computed, effect, signal } from '@angular/core';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { UserService } from '../../../../../services/user/user-service';
import { Pagination } from '../../../../../shared/components/pagination/pagination';
import { HlmButton } from '@spartan-ng/helm/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePlus, lucideSearch, lucideTrash2 } from '@ng-icons/lucide';
import { remixPencilFill } from '@ng-icons/remixicon';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { FormsModule } from '@angular/forms';
import { HlmInput } from '@spartan-ng/helm/input';
import { AddUser } from './add-user/add-user';
import { SubscriptionsService } from '../../../../../services/subscriptions-service/subscriptions-service';
import { IPlan } from '../../../../../core/interfaces/plan.interface';

@Component({
  selector: 'app-users-table',
  imports: [
    HlmBadge,
    Pagination,
    HlmButton,
    NgIcon,
    BrnSelectImports,
    HlmSelectImports,
    FormsModule,
    HlmInput,
    AddUser,
  ],
  templateUrl: './users-table.html',
  styleUrl: './users-table.css',
  providers: [
    provideIcons({
      lucidePlus,
      lucideTrash2,
      remixPencilFill,
      lucideSearch,
    }),
  ],
})
export class UsersTable {
  users: any[] = [];
  pageNumber = signal<number>(1);
  searchText = '';
  role = signal<string>('');
  subscriptionStatus = signal<string>('');
  filteredUsers = signal<any[]>([]);
  rowsPerPage = signal<number>(5);
  displayData = computed(() =>
    this.filteredUsers().slice(
      (this.pageNumber() - 1) * this.rowsPerPage(),
      this.pageNumber() * this.rowsPerPage()
    )
  );
  plans: IPlan[] = [];
  currentUser: any;

  constructor(
    private readonly userService: UserService,
    private readonly subscriptionsService: SubscriptionsService
  ) {
    this.userService.UserDetails.subscribe((data: any) => {
      this.currentUser = data;
      this.getPlansList();
      this.getUsers();
    });

    effect(() => {
      this.updateTable(this.role(), this.subscriptionStatus(), this.searchText);
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe((res: any) => {
      if (this.currentUser.role !== 'admin') {
        this.users = res.filter(
          (u: any) => u.role === 'user' && u.email !== this.currentUser.email
        );
      } else {
        this.users = res.filter((u: any) => u.email !== this.currentUser.email);
      }
      this.filteredUsers.set(this.users);
    });
  }

  /**
   * Updates the table according to the given role, subscription status and search text
   * @param role the role to filter by
   * @param subscriptionStatus the subscription status to filter by
   * @param searchText the search text to filter by
   */
  updateTable = (
    role: string,
    subscriptionStatus: string,
    searchText: string
  ) => {
    const filteredUsers = this.users.filter((user) => {
      return (
        (!role || user.role === role) &&
        (!subscriptionStatus ||
          !!user.subscribed === (subscriptionStatus === 'Active')) &&
        (!searchText ||
          user.username.toLowerCase().includes(searchText.toLowerCase()) ||
          user.email.toLowerCase().includes(searchText.toLowerCase()))
      );
    });
    this.pageNumber.set(1);
    this.filteredUsers.set(filteredUsers);
  };

  getPlansList() {
    this.subscriptionsService.getSubscriptions().subscribe((res: any) => {
      console.log(res);
      this.plans = res;
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe((res: any) => {
      this.getUsers();
    });
  }
}
