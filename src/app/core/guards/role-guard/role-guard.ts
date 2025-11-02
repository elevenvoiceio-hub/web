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
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    const value = route.url.join('');
    return this.checkRole(value);
  }

  checkRole = (url: string) => {
    return this.userService.UserDetails.pipe(
      map((data) => {
        if(data?.role === 'subadmin' && (url === 'users' || url === 'service-requests')) {
          return true;
        } else if(data?.role === 'admin') {
          return true;
        } else {
          this.router.navigate(['/app']);
          return false;
        }
      })
    );
  };
}
