import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {

  toaster = new BehaviorSubject<any>(null);

  constructor() {}

  setToaster(message: any) {
    this.toaster.next(message);
  }
}
