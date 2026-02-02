import { HttpInterceptorFn } from '@angular/common/http';
import { get } from '../utils/localStorage';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const newReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${get('access_token')}`)
  });

  return next(newReq);
};
