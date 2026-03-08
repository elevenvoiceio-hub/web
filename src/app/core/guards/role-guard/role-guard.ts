import { UserService } from './../../../services/user/user-service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, map, of, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    const value = route.url.join('');
    return this.checkRole(value);
  }

  checkRole = (url: string) => {
    return this.userService.UserDetails.pipe(
      take(1),
      switchMap((data) => {
        if (data) {
          return of(data);
        }
        return this.userService.getUserData().pipe(
          map((res) => {
            if (res) {
              this.userService.UserDetailsData = res;
            }
            return res;
          }),
          catchError(() => of(null)),
        );
      }),
      map((data: any) => {
        if (data?.role === 'subadmin' && (url === 'users' || url === 'service-requests')) {
          return true;
        } else if (data?.role === 'admin') {
          return true;
        } else {
          this.router.navigate(['/app']);
          return false;
        }
      }),
    );
  };
}
