import { HlmButton } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import {
  BrnDialog,
  BrnDialogContent,
  BrnDialogTrigger,
} from '@spartan-ng/brain/dialog';
import { HlmInput } from '@spartan-ng/helm/input';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { SubscriptionsService } from './../../../../../../services/subscriptions-service/subscriptions-service';
import { Component, effect, input, output, viewChild } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePlus } from '@ng-icons/lucide';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IPlan } from '../../../../../../core/interfaces/plan.interface';
import { UserService } from '../../../../../../services/user/user-service';
import { IUser } from '../../../../../../core/interfaces/user.interface';

import { remixPencilFill } from '@ng-icons/remixicon';

@Component({
  selector: 'app-add-user',
  imports: [
    NgIcon,
    HlmDialogImports,
    HlmButton,
    BrnDialogTrigger,
    BrnDialogContent,
    HlmInput,
    ReactiveFormsModule,
    BrnSelectImports,
    HlmSelectImports,
  ],
  templateUrl: './add-user.html',
  styleUrl: './add-user.css',
  viewProviders: [provideIcons({ lucidePlus, remixPencilFill })],
})
export class AddUser {
  user = input<IUser>();
  isEdit = input<boolean>(false);
  public viewchildDialogRef = viewChild(BrnDialog);
  refreshUser = output<void>();
  isAdmin = input<boolean>(false);

  userForm: FormGroup = new FormGroup({
    password: new FormControl(''),
    repeatPassword: new FormControl(''),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('user', [Validators.required]),
    plan: new FormControl(''),
  });
  plans = input<IPlan[]>([]);
  planChanges = false;
  otherChanges = false;

  constructor(
    private readonly userService: UserService,
    private readonly subscriptionsService: SubscriptionsService
  ) {
    effect(() => {
      this.user();
      this.userForm.patchValue({
        username: this.user()?.username || '',
        email: this.user()?.email || '',
        role: this.user()?.role || '',
        plan: this.user()?.plan_name || '',
        password: '',
        repeatPassword: '',
      });
      this.userForm.controls['password'].setValidators(
        this.isEdit() ? null : [Validators.required, Validators.minLength(6)]
      );
      this.userForm.controls['repeatPassword'].setValidators(
        this.isEdit() ? null : [Validators.required, Validators.minLength(6)]
      );
      if (this.isEdit()) {
        this.userForm.controls['username'].disable();
        this.userForm.controls['email'].disable();
      }
    });
  }

  ngOnInit() {
    this.userForm.patchValue({
      username: this.user()?.username || '',
      email: this.user()?.email || '',
      role: this.user()?.role || '',
      plan: this.user()?.plan_name || '',
      password: '',
      repeatPassword: '',
    });
    this.userForm.controls['password'].setValidators(
      this.isEdit() ? null : [Validators.required, Validators.minLength(6)]
    );
    this.userForm.controls['repeatPassword'].setValidators(
      this.isEdit() ? null : [Validators.required, Validators.minLength(6)]
    );
    this.onUserFormChange();
  }

  onUserFormChange() {
    const initialValues = this.userForm.value;

    this.userForm.valueChanges.subscribe((changes) => {
      this.planChanges = initialValues.plan !== changes.plan;
      this.otherChanges =
        initialValues.username !== changes.username ||
        initialValues.email !== changes.email ||
        initialValues.role !== changes.role ||
        initialValues.password !== changes.password ||
        initialValues.repeatPassword !== changes.repeatPassword;
    });
  }

  addUser() {
    this.userService.addUser(this.userForm.value).subscribe((res: any) => {
      if (this.planChanges) {
        this.assignPlanToUser(res.id);
      } else {
        this.refreshUser.emit();
      }
      this.closeDialog();
    });
  }

  closeDialog = () => {
    this.viewchildDialogRef()?.close({});
  };

  updateUser() {
    if (this.otherChanges) {
      this.userService
        .updateUserRole(this.user()?.id!, this.userForm.value.role)
        .subscribe((res: any) => {
          if (this.planChanges) {
            this.assignPlanToUser(this.user()?.id ?? '');
          } else {
            this.refreshUser.emit();
            this.closeDialog();
          }
        });
    } else {
      if (this.planChanges) {
        this.assignPlanToUser(this.user()?.id ?? '');
      }
    }
  }

  assignPlanToUser(id: number | string) {
    const requestBody: any = {
      user_id: id,
    };

    if (this.user()?.plan_name !== '') {
      requestBody['subscription_id'] =
        this.plans().find((plan) => plan.name === this.userForm.value.plan)
          ?.id ?? null;
      this.subscriptionsService
        .assignSubscriptionToUser(requestBody)
        .subscribe(() => {
          this.refreshUser.emit();
          this.closeDialog();
        });
    } else {
      this.subscriptionsService
        .revokeSubscription(requestBody)
        .subscribe(() => {
          this.refreshUser.emit();
          this.closeDialog();
        });
    }
  }
}
