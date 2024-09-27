import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-menus',
  standalone: true,
  imports: [
    CommonModule,
    TreeTableModule,
    ButtonModule,
    RippleModule
  ],
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.scss'
})
export default class MenusComponent implements OnInit{
  menuTable: any;
  menuData: TreeNode[] = [
    {
      data: {
        label: 'Dashboard',
        icon: '',
        routerLink: ['/']
      },
      children: [
        {
          data: {
            label: 'Panel de Inicio',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/']
          },
          children: []
        }
      ]
    },
    {
      data: {
        label: 'Sistema',
        icon: '',
        routerLink: ''
      },
      children: [
        {
          data: {
            label: 'Menús',
            icon: 'pi pi-fw pi-list',
            routerLink: '/system/menus'
          },
          children: []
        }
      ]
    },
    {
      data: {
        label: 'Seguridad',
        icon: '',
        routerLink: null
      },
      children: [
        {
          data: {
            label: 'Roles',
            icon: 'pi pi-fw pi-shield',
            routerLink: '/security/roles'
          },
          children: []
        },
        {
          data: {
            label: 'Usuarios',
            icon: 'pi pi-fw pi-user',
            routerLink: ['/security/users']
          },
          children: []
        }
      ]
    },
    {
      data: {
        label: 'Mi perfil',
        icon: '',
        routerLink: null
      },
      children: [
        {
          data: {
            label: 'Cerrar sesión',
            icon: 'pi pi-fw pi-sign-out',
            routerLink: ['/config/users']
          },
          children: []
        }
      ]
    }
  ];
  
  ngOnInit(): void {
      
  }
  
  openEdit(event:MouseEvent, item:any):void{

  }
}
