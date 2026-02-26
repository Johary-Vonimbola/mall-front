import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const clientGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if(authService.currentUser()?.role !== "CLIENT"){
    const forbiddenPath = router.parseUrl("forbidden");
    return new RedirectCommand(forbiddenPath, {
      skipLocationChange: true
    });
  }
  return true;
};
