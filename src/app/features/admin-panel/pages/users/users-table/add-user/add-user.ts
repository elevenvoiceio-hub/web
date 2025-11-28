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
    plan_duration: new FormControl(30),
  });
  plans = input<IPlan[]>([]);
  planChanges = false;
  otherChanges = false;
  selectedPlan: IPlan | null = null;
  initialChanges = false;
  initialValues: any;

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
      this.getcurrentuserSubscription();

      this.onUserFormChange();
    });
  }

  onUserFormChange() {
    if (!this.initialChanges) {
      this.initialValues = this.userForm.value;
      this.initialChanges = true;
    }

    this.userForm.valueChanges.subscribe((changes) => {
      this.planChanges = this.initialValues.plan !== changes.plan;
      this.otherChanges =
        this.initialValues.email !== changes.email ||
        this.initialValues.role !== changes.role ||
        this.initialValues.password !== changes.password ||
        this.initialValues.repeatPassword !== changes.repeatPassword;
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
      if (this.planChanges || true) {
        this.assignPlanToUser(this.user()?.id ?? '');
      }
    }
  }

  assignPlanToUser(id: number | string) {
    const duration_days = this.userForm.value.plan_duration;
    const requestBody: any = {
      user_id: id,
      duration_days:
        duration_days === 'lifetime'
          ? this.calculateDaysUntilCenturyEnd()
          : parseInt(duration_days.toString()),
    };
    if (this.userForm.value.plan !== '') {
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

  getcurrentuserSubscription() {
    this.subscriptionsService
      .checkSubscription(this.user()?.id ?? 0)
      .subscribe((data: any) => {
        let daysDifference: number = 0;
        if (data) {
          daysDifference = this.getDaysBetweenDates(
            data.start_date,
            data.end_date
          );
        }
        this.userForm
          .get('plan_duration')
          ?.setValue(
            daysDifference > 365 ? 'lifetime' : daysDifference.toString()
          );
        this.selectedPlan = data.subscription || null;
      });
  }
  getDaysBetweenDates(startDate: string, endDate: string) {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);

    const timeDifference = date2.getTime() - date1.getTime();
    const oneDayInMilliseconds = 1000 * 60 * 60 * 24;

    const daysDifference = Math.ceil(timeDifference / oneDayInMilliseconds);
    return daysDifference;
  }

  valueChangePlan(event: string) {
    this.selectedPlan =
      this.plans().find((plan) => plan.name === event) || null;
  }

  calculateDaysUntilCenturyEnd() {
    const today = new Date();
    const lastDayOfCentury = new Date(2099, 11, 31, 23, 59, 59, 999); // Month is 0-indexed (11 for December)

    const timeDifference = lastDayOfCentury.getTime() - today.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
  }
}
