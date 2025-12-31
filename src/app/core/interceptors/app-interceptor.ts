import {
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage-service/local-storage-service';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);
  const user = localStorageService.getData('user');
  const redirectUrl = router.url;

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
        if (err && err.status === 401) {
          localStorageService.clearData();
          router.navigate(['/login'], { queryParams: { redirectUrl } });
        }
        throw err;
      })
    )

};
