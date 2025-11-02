import { Component } from '@angular/core';
import { Statistics } from "./statistics/statistics";

@Component({
  selector: 'app-dashboard',
  imports: [Statistics],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

}
