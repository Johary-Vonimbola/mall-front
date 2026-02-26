import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { inject } from '@angular/core';

export const adminShopGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if(authService.currentUser()?.role !== "SHOP_ADMIN"){
    const forbiddenPath = router.parseUrl("forbidden");
    return new RedirectCommand(forbiddenPath, {
      skipLocationChange: true
    });
  }
  return true;
};
