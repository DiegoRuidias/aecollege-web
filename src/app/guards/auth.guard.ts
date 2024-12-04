
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../shared/auth/services/login.service';
import { MessageService } from 'primeng/api';


export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(LoginService); 
    const router = inject(Router);
  
    if (authService.isAuthenticated()) {
      return true;
    } else {
      router.navigate(['/auth']); 
      return false;
    }
}