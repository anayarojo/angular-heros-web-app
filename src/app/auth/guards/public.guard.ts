import { inject } from '@angular/core';
import {
    CanActivateFn,
    Router,
} from '@angular/router';

import {
    map,
    tap,
} from 'rxjs';

import { AuthService } from '../services';

export const PublicGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication()
    .pipe(
      tap(authenticated => {
        if (authenticated) {
          router.navigate(['/']);
        }
      }),
      map(authenticated => !authenticated)
    );
}
