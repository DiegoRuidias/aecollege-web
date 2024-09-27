import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  console.log(route.routeConfig?.path);
  if(route.routeConfig?.path==='')
    return true
  return false;
};
