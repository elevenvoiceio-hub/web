import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  loader = new BehaviorSubject<boolean>(false);

  toaster = new BehaviorSubject<any>(null);

  constructor() {}

  setLoader(value: boolean) {
    this.loader.next(value);
  }

  setToaster(message: any) {
    this.toaster.next(message);
  }
}
