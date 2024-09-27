import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../service/app.layout.service';
import { CommonModule } from '@angular/common';
import { AppMenuitemComponent } from './app-menuitem/app-menuitem.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    AppMenuitemComponent
  ],
  templateUrl: './app-menu.component.html',
  styleUrl: './app-menu.component.scss'
})
export class AppMenuComponent implements OnInit{
  model: any[] = [];

  ngOnInit(): void {
    this.model = [
        {
            label: 'Dashboard',
            items: [
                {
                    label: 'Panel de Inicio',
                    icon: 'pi pi-fw pi-home',
                    routerLink: ['/']
                },
            
            ]
        },
        {
          label: 'Sistema',
          items: [
              {
                  label: 'Menús',
                  icon: 'pi pi-fw pi-list',
                  routerLink: '/system/menus'
              },
          
          ]
        },
        {
          label: 'Seguridad',
          items: [
            {
              label: 'Roles',
              icon: 'pi pi-fw pi-shield',
              routerLink: '/security/roles'
            },
            {
              label: 'Usuarios',
              icon: 'pi pi-fw pi-user',
              routerLink: ['/security/users']
            },            
          
          ]
        },
        {
          label: 'Mi perfil',
          items: [
            {
              label: 'Cerrar sesión',
              icon: 'pi pi-fw pi-sign-out',
              routerLink: ['/config/users']
            },           
          
          ]
        }
      ]
  }

}
