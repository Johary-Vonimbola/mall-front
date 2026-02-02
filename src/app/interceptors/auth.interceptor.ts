import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
 
  const authService = inject(AuthenticationService);

  const accessToken = authService.getAccessToken();
  let newReq = req;
  if(accessToken){
    newReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${accessToken}`)
    });
  }

  return next(newReq);
};
