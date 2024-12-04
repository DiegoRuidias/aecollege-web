import { CanActivateFn } from '@angular/router';

export const blankGuard: CanActivateFn = (route, state) => {
  return true;
};
