import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if(authService.currentUser()?.role !== "MALL_ADMIN"){
    const forbiddenPath = router.parseUrl("forbidden");
    return new RedirectCommand(forbiddenPath, {
      skipLocationChange: true
    });
  }
  return true;
};
