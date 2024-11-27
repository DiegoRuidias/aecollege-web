import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuChangeEvent } from '../api/menuchangeevent';


@Injectable({
    providedIn: 'root'
})
export class MenuService {

    private menuSource = new Subject<MenuChangeEvent>();
    private resetSource = new Subject();

    constructor() {
        this.loadFromLocalStorage();
    }

    _model = [
        {
          label: 'Sistema',
          items: [
              {
                  label: 'Menús',
                  icon: 'matList',
                  routerLink: '/system/menus'
              },
          
          ]
        },
        {
          label: 'Seguridad',
          items: [
            {
              label: 'Roles',
              icon: 'matSecurity',
              routerLink: '/security/roles'
            },
            {
              label: 'Usuarios',
              icon: 'matPeopleAlt',
              routerLink: ['/security/users']
            },            
          
          ]
        },
        {
          label: 'Ajustes Generales ',
          items: [
            {
              label: 'Configuraciones',
              icon:'matSettings',
              items: [
                {
                  label: 'Periodos E.',
                  icon: 'matCalendarMonth',
                  routerLink: ['/config/periodos']
                },
                {
                  label: 'Documentación',
                  icon: 'matFolder',
                  routerLink: ['/config/documentos']
                },
                {
                  label: 'T. de Documento',
                  icon: 'matDescription',
                  routerLink: ['/config/tiposDocumentos']
                },
              ]
            },
            {
              label: 'Niveles - Grados',
              icon: 'matBarChart',
              routerLink: ['/config/niveles-grados']
            },  
            {
              label: 'Pagos',
              icon: 'matMonetizationOn',
              routerLink: ['/config/pagos']
            },
            {
              label: 'Predeterminados',
              icon: 'matSettingsApplications',
              routerLink: ['/config/predeterminados']
            },
          ]
        },
        {
          label: 'Mi perfil',
          items: [
            {
              label: 'Cerrar sesión',
              icon: 'matExitToApp',
              routerLink: ['/config/users']
            },           
          
          ]
        }
    ]

    _model1 = [
        {
            label: 'Dashboard',
            items: [
                {
                    label: 'Panel de inicio',
                    icon: 'matHome',
                    routerLink: ['']
                },
            
            ]
        },
        {
          label: 'Principal',
          items: [
            {
              label: 'Alumnos',
              icon: 'matSchool',
              items: [
                {
                  label: 'Matricular',
                  icon: 'matBookmarkAdd',
                  routerLink: ['/system/matricular']
                }, 
                {
                  label: 'Consultar',
                  icon: 'matAssignmentInd',
                  routerLink: ['/system/consultar-matricula']
                }, 
              ]
            },
            {
              label: 'Pagos',
              icon: 'matMonetizationOn',
              routerLink: ['/security/users'],
              items: [
                {
                  label: 'Realizar Pago',
                  icon: 'matPayments',
                  routerLink: ['/settings/matricular']
                }, 
                {
                  label: 'Reporte Pagos',
                  icon: 'matAssessment',
                  routerLink: ['/security/users']
                }, 
              ]
            },            
          
          ]
        },
        {
          label: 'Ajustes Generales ',
          items: [
            {
              label: 'Cursos',
              icon: 'matLibraryBooks',
              routerLink: ['/config/periodos']
            },
            {
              label: 'Docentes',
              icon: 'matPerson',
              routerLink: ['/config/niveles-grados']
            },  
            {
              label: 'Aulas',
              icon: 'matClass',
              routerLink: ['/config/pagos']
            },
          
          
          ]
        },
        {
          label: 'Mi perfil',
          items: [
            {
              label: 'Cerrar sesión',
              icon: 'matExitToApp',
              routerLink: ['/config/users']
            },           
          
          ]
        }
    ]

    private menu = signal<any>(this._model);
    private item = signal<number>(1);
    menuSource$ = this.menuSource.asObservable();
    resetSource$ = this.resetSource.asObservable();  
  
    // Cargar el menú desde el localStorage
    private loadFromLocalStorage(): void {
      const savedSettings = localStorage.getItem('menu');
      if (savedSettings) {
        const savedMenu = parseInt(savedSettings);
        this.item.set(savedMenu);  // Actualizar la señal con los datos guardados
      }
    }
  
    private saveToLocalStorage(menu: number): void {
      localStorage.setItem('menu', menu.toString() );
    }
  
    change(): void {
        this.loadFromLocalStorage();
        if(this.item() === 1){
            this.item.set(2)
            this.menu.set(this._model1);
            this.saveToLocalStorage(2);
        } else {
            this.item.set(1)
            this.menu.set(this._model);
            this.saveToLocalStorage(1);
        } 
      
 
    }
     
    getSettings(): any[] {
        this.loadFromLocalStorage();
        if(this.item() === 1){
            this.menu.set(this._model);
        } else {
            this.menu.set(this._model1);
        }
        return this.menu();
    }

    onMenuStateChange(event: MenuChangeEvent) {
        this.menuSource.next(event);
    }

    reset() {
        this.resetSource.next(true);
    }
}
