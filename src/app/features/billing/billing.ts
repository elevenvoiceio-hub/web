import { Component } from '@angular/core';
import { UserService } from '../../services/user/user-service';
import { PriceDetails } from '../../shared/components/price-details/price-details';
import { VoiceAppMenu } from '../voice-app/component/voice-app-menu/voice-app-menu';
import { PlanDetails } from "../../shared/components/plan-details/plan-details";

@Component({
  selector: 'app-billing',
  imports: [PriceDetails, VoiceAppMenu, PlanDetails],
  templateUrl: './billing.html',
  styleUrl: './billing.css',
})
export class Billing {
  userData: any;
  edit: boolean = false;
  subscription: any;

  constructor(
    private readonly userService: UserService,
  ) {
    this.userService.getUserData().subscribe((data) => {
      this.userData = data;
      this.userService.UserDetailsData = data;
    });
  }
}
