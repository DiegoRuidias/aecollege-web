import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { from, lastValueFrom } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  return from(addHeader(req, next))
};

async function addHeader(request: HttpRequest<unknown>, next: HttpHandlerFn): Promise<HttpEvent<unknown>> {
  const token = localStorage.getItem('token');
  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return await lastValueFrom(next(request));
}