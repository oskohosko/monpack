import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Checking if the user is logged in and if so we can access page
  if (auth.isLoggedIn()) {
    return true;
  // If not, we navigate to signin
  } else {
    router.navigate(['signin'])
    return false;
  }
};
