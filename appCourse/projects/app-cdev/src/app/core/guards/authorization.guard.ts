import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Data,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthApplication } from '../../auth/application/auth.application';

export const authorizationGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authApplication = inject(AuthApplication);
  const router = inject(Router);

  const rolesAllowed: string[] = (route.data as Data)['roles'];
  const rolesUser: string[] = authApplication.rolesUser;

  console.log('rolesAllowed', rolesAllowed);
  console.log('rolesUser', rolesUser);

  const isUserAllowed = rolesAllowed.some((role: string) =>
    rolesUser.includes(role)
  );

  return isUserAllowed;
};
