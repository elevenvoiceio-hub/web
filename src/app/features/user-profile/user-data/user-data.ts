import { Component } from '@angular/core';
import { UserService } from '../../../services/user/user-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlanDetails } from '../../../shared/components/plan-details/plan-details';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePencil } from '@ng-icons/lucide';
import { UserDataEdit } from './user-data-edit/user-data-edit';
import { HlmDialogService } from '@spartan-ng/helm/dialog';
import { HlmButton } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-user-data',
  imports: [PlanDetails, NgIcon, HlmButton],
  templateUrl: './user-data.html',
  styleUrl: './user-data.css',
  viewProviders: [provideIcons({ lucidePencil })],
})
export class UserData {
  userData: any;
  edit: boolean = false;
  subscription: any;
  value = 50;

  userForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    passwordRepeat: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private readonly userService: UserService,
    private _dialogService: HlmDialogService
  ) {
    this.userService.getUserData().subscribe((data) => {
      this.userData = data;
      this.userService.UserDetailsData = data;
    });
  }

  openEditDialog(isPasswordEdit: boolean) {
    const dialogRef = this._dialogService.open(UserDataEdit, {
      context: {
        users: this.userData,
        isPasswordEdit,
      },
    });

    dialogRef.closed$.subscribe((user) => {
			if (user) {
				this.userData.username = user;
			}
		});
  }
}
