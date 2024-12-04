import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../shared/auth/services/login.service';

export const logoutGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loginService = inject(LoginService);
  loginService.logout();
  router.navigate(['/auth']);
  return false;
};
