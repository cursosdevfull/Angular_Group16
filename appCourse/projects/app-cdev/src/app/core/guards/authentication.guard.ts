import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthApplication } from '../../auth/application/auth.application';

/* @Injectable()
import { CanActivateFn } from '@angular/router';

export class AuthenticationGuard implements CanActivate, CanActivateChild {
  constructor(private readonly authApplication: AuthApplication) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.authApplication.isUserLogged;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.authApplication.isUserLogged;
  }
} */

export const authenticationGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  const authApplication = inject(AuthApplication);
  const router = inject(Router);

  const isUserLogged = authApplication.isUserLogged;
  if (!isUserLogged) {
    router.navigate(['/auth/login']);
  }
  return isUserLogged;
};
