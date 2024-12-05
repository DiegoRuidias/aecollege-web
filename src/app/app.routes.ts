import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { logoutGuard } from './guards/logout.guard';
import { noAuthGuard } from './guards/no-auth.guard';
import { authorizedGuard } from './guards/authorized.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadComponent:() => import('./shared/auth/login/login.component'),
        canActivate:[noAuthGuard],
    },
    {
        path: 'logout',
        loadComponent:()=> import('./shared/layout/views/app-layout/app-layout.component'),
        canActivate:[logoutGuard],
    },
    {
        path: 'home',
        loadComponent: () => import('./shared/layout/views/app-layout/app-layout.component'),
        children: [
            {
                path: '',
                title: 'Panel de Inicio',
                loadComponent: () => import('./features/dashboard/dashboard.component'),
                data: { breadcrumb: 'Dashboard' },
                canActivate:[authGuard]
            },
            {
                path:'unauthorized',
                loadComponent: () => import('./shared/utils/error-page/error-401/error-401.component')
            },
        ],
        
    },
    {
        path: 'system',
        loadComponent: () => import('./shared/layout/views/app-layout/app-layout.component'),
        children: [
            {
                path: 'menus',
                canActivate:[authGuard,authorizedGuard],
                title: 'Menús',
                data: { breadcrumb: 'Dashboard' },
                loadComponent: () => import('./features/system/menus/menus.component')
            },
            {
                path: 'matricular',
                title: 'AEC - Matricular Alumnos',
                canActivate:[authGuard,authorizedGuard],
                data: { breadcrumb: 'Dashboard' },
                loadComponent: () => import('./features/system/matricule/alumnos/alumnos.component')
            },
            {
                path: 'consultar-matricula/:id',
                title: 'AEC - Consulta Matriculas',
                canActivate:[authGuard,authorizedGuard],
                data: { breadcrumb: 'Dashboard' },
                loadComponent: () => import('./features/system/matricule/search/search.component')
            },
            {
                path: 'consultar-matricula',
                title: 'AEC - Matriculados',
                canActivate:[authGuard,authorizedGuard],
                data: { breadcrumb: 'Matricualdos' },
                loadComponent: () => import('./features/system/matricule/list/list.component')
            },
            {
                path: 'ver-pagos',
                title: 'AEC - Matriculados',
                canActivate:[authGuard,authorizedGuard],
                data: { breadcrumb: 'Ver Pagos' },
                loadComponent: () => import('./features/system/search-pays/search-pays.component')
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
                canActivate:[authGuard,authorizedGuard],
                loadComponent: () => import('./features/security/roles/roles.component')
            },                  
            {
                path: 'users',
                title: 'Usuarios',
                data: { breadcrumb: 'Usuarios' },
                canActivate:[authGuard,authorizedGuard],
                loadComponent: () => import('./features/security/users/users.component')
            }
        ],
        
    },
    {
        path: 'config',
        loadComponent: () => import('./shared/layout/views/app-layout/app-layout.component'),
        children:[
            {
                path: 'tiposDocumentos',
                title: 'AEC - Tipos de Documentos',
                canActivate:[authGuard,authorizedGuard],
                data: { breadcrumb: 'Tipos de Documentos' },
                loadComponent: () => import('./features/settings/type-document/type-document.component')
            },
            {
                path: 'periodos',
                title: 'AEC - Periodos Escolares',
                canActivate:[authGuard,authorizedGuard],
                data: { breadcrumb: 'Periodos Escolares' },
                loadComponent: () => import('./features/settings/periods/periods.component')
            },
            {
                path: 'documentos',
                title: 'AEC - Documentación',
                canActivate:[authGuard,authorizedGuard],
                data: { breadcrumb: 'Documentación' },
                loadComponent: () => import('./features/settings/documents/documents.component')
            }, 
            {
                path: 'niveles-grados',
                title: 'AEC - Niveles Grados Escolares',
                canActivate:[authGuard,authorizedGuard],
                data: { breadcrumb: 'Niveles Grados Escolares' },
                loadComponent: () => import('./features/settings/levels-grades/levels-grades.component')
            }, 
            {
                path: 'pagos',
                title: 'AEC - Pagos',
                data: { breadcrumb: 'Periodos Escolares' },
                canActivate:[authGuard,authorizedGuard],
                loadComponent: () => import('./features/settings/payments/payments.component')
            }, 
            {
                path: 'predeterminados',
                title: 'AEC - Ajustes de Sistema',
                canActivate:[authGuard,authorizedGuard],
                data: { breadcrumb: 'Ajustes de sistema' },
                loadComponent: () => import('./features/settings/settings/settings.component')
            }, 
        ]
    },
    {
        path: 'settings',
        loadComponent: () => import('./shared/layout/views/app-layout/app-layout.component'),
        children:[
            {
                path: 'docentes',
                title: 'AEC - Docentes',
                canActivate:[authGuard,authorizedGuard],
                data: { breadcrumb: 'Docentes' },
                loadComponent: () => import('./features/settings/employees/employees.component')
            },  
        ]
    },
    {
        path: '**',
        redirectTo: '/home'
    }
];