import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { from, lastValueFrom } from 'rxjs';
import { LoginService } from '../auth/services/login.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  return from(addHeader(req, next))
};

async function addHeader(request: HttpRequest<unknown>, next: HttpHandlerFn): Promise<HttpEvent<unknown>> {
  const loginService = inject(LoginService);
  const token = loginService.getToken();
  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return await lastValueFrom(next(request));
}