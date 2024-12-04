import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../shared/auth/services/login.service';
import { inject } from '@angular/core';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginService); 
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/home']); 
    return false;
  }
};
