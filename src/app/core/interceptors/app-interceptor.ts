import { CommonService } from './../../services/common-service/common-service';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage-service/local-storage-service';
import { catchError, map } from 'rxjs';
import { Router } from '@angular/router';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageService = inject(LocalStorageService);
  const commonService = inject(CommonService);
  const router = inject(Router);
  const user = localStorageService.getData('user');

  commonService.setLoader(true);

  if (user) {
    const userData = JSON.parse(user);
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${userData.access}`,
      },
    });
  }

  return next(req)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        commonService.setLoader(false);
        if (err && err.status === 401) {
          localStorageService.clearData();
          router.navigate(['/login']);
        }
        throw err;
      })
    )
    .pipe(
      map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
          commonService.setLoader(false);
        }
        return evt;
      })
    );
};
