import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LocalStorageService } from '../../../services/local-storage-service/local-storage-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    return this.checkLogin(state.url);
  }

  checkLogin(url: string): boolean {
    if (this.localStorageService.getData('user')) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
