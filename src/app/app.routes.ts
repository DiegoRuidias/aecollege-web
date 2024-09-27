import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./shared/layout/views/app-layout/app-layout.component'),
        children: [
            {
                path: '',
                canActivate:[authGuard],
                title: 'Panel de Inicio',
                data: { breadcrumb: 'Dashboard' },
                loadComponent: () => import('./features/dashboard/dashboard.component')
            }
        ],
        
    },
    {
        path: 'system',
        loadComponent: () => import('./shared/layout/views/app-layout/app-layout.component'),
        children: [
            {
                path: 'menus',
                title: 'Menús',
                data: { breadcrumb: 'Dashboard' },
                loadComponent: () => import('./features/system/menus/menus.component')
            }
        ],
        
    },
    {
        path: 'security',
        loadComponent: () => import('./shared/layout/views/app-layout/app-layout.component'),
        children: [
            {
                path: 'roles',
                title: 'Roles',
                data: { breadcrumb: 'Roles' },
                loadComponent: () => import('./features/security/roles/roles.component')
            },                  
            {
                path: 'users',
                title: 'Usuarios',
                data: { breadcrumb: 'Usuarios' },
                loadComponent: () => import('./features/security/users/users.component')
            }
        ],
        
    },
    {
        path: '**',
        redirectTo: ''
    }
];