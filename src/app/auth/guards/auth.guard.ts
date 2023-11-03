import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    CanMatchFn,
    Route,
    Router,
    RouterStateSnapshot,
    UrlSegment,
} from '@angular/router';

import { tap } from 'rxjs';

import { AuthService } from '../services';

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication()
    .pipe(
      tap(authenticated => {
        if (!authenticated) {
          router.navigate(['/auth']);
        }
      })
    );
}

export const canActivateGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  console.log('CanActivate');
  console.log({ route, state });

  return false;
};

export const canMatchGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  console.log('CanMatch');
  console.log({ route, segments });

  return false;
};
