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
                    icon: 'matHome',
                    routerLink: ['/']
                },
            
            ]
        },
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
              label: 'Periodos Escolares',
              icon: 'matCalendarMonth',
              routerLink: ['/config/period']
            },
            {
              label: 'Pagos',
              icon: 'matMonetizationOn',
              routerLink: ['/config/pay']
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
  }

}
