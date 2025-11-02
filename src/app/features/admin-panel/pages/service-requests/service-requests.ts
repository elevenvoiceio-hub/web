import { Component } from '@angular/core';
import { ServiceRequestsTable } from "./service-requests-table/service-requests-table";

@Component({
  selector: 'app-service-requests',
  imports: [ServiceRequestsTable],
  templateUrl: './service-requests.html',
  styleUrl: './service-requests.css'
})
export class ServiceRequests {

}
