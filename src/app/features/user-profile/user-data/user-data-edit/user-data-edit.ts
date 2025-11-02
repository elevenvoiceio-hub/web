import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrnDialogImports, BrnDialogRef, injectBrnDialogContext } from '@spartan-ng/brain/dialog';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { IUser } from '../../../../core/interfaces/user.interface';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmButton } from '@spartan-ng/helm/button';
import { UserService } from '../../../../services/user/user-service';
import { CommonService } from '../../../../services/common-service/common-service';

@Component({
  selector: 'app-user-data-edit',
  imports: [FormsModule, BrnDialogImports, HlmDialogImports, HlmInput, HlmButton],
  templateUrl: './user-data-edit.html',
  styleUrl: './user-data-edit.css',
})
export class UserDataEdit {
  currentPassword: string = '';
  newPassword: string = '';
  renewPassword: string = '';

  private readonly _dialogRef = inject<BrnDialogRef<string>>(BrnDialogRef);
	private readonly _dialogContext = injectBrnDialogContext<{ users: IUser, isPasswordEdit: boolean }>();

  userData = this._dialogContext.users;
  isPasswordEdit = this._dialogContext.isPasswordEdit;
 userName = this.userData?.username || '';

  constructor(private userService: UserService, private commonService: CommonService) {
  }

  updateUserData() {
    let requestBody: any;
    if(this.isPasswordEdit) {
      if(this.newPassword !== this.renewPassword) {
        this.commonService.setToaster('New password and Re-entered password do not match');
        return;
      }
      requestBody = {
        currentPassword: this.currentPassword,
        newPassword: this.newPassword
      };
    } else {
      requestBody = {
        username: this.userName
      };
    }
    this.userService.updateUser(requestBody).subscribe({
      next: (response) => {
        this.commonService.setToaster(`${this.isPasswordEdit ? 'Password' : 'Username'} updated successfully`);
        this._dialogRef.close(this.userName);
      },
      error: () => {
        this.commonService.setToaster(`Failed to update ${this.isPasswordEdit ? 'password' : 'username'}`);
      },
    });
  }
}


