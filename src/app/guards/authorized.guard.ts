import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authorizedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const storedMenus = localStorage.getItem('menus');

  if (!storedMenus) {
    router.navigate(['/home/unauthorized']);
    return false;
  }

  const menus = JSON.parse(storedMenus); 
  const foundMenu = findMenuByUrl(menus, state.url); 

  if (foundMenu) {
    return true;
  }
  router.navigate(['/home/unauthorized']);
  return false;
};

function findMenuByUrl(menus: any[], url: string): any {
  for (const menu of menus) {
    if (compareUrl(menu.routerLink, url)) {
      return menu;
    }

    if (menu.items) {
      const found = findMenuByUrl(menu.items, url);
      if (found) {
        return found;
      }
    }
  }
  return null; 
}

function compareUrl(routerLink: string, url: string): boolean {
  const cleanRouterLink = cleanUrl(routerLink); 
  const cleanUrls = cleanUrl(url); 

  return cleanRouterLink === cleanUrls;
}

function cleanUrl(url: string): string {
  if (!url) {
    return ''; 
  }

  const urlSegments = url.split('/').filter(Boolean); 
  return urlSegments.slice(0, 2).join('/'); 
};
