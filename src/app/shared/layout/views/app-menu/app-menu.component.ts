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
  //   this.model = [
  //       {
  //           label: 'Dashboard',
  //           items: [
  //               {
  //                   label: 'Panel de inicio',
  //                   icon: 'matHome',
  //                   routerLink: ['/']
  //               },
            
  //           ]
  //       },
  //       {
  //         label: 'Principal',
  //         items: [
  //           {
  //             label: 'Alumnos',
  //             icon: 'matSchool',
  //             items: [
  //               {
  //                 label: 'Matricular',
  //                 icon: 'matBookmarkAdd',
  //                 routerLink: ['/system/matricular']
  //               }, 
  //               {
  //                 label: 'Consultar Matriculas',
  //                 icon: 'matAssignmentInd',
  //                 routerLink: ['/security/users']
  //               }, 
  //             ]
  //           },
  //           {
  //             label: 'Pagos',
  //             icon: 'matMonetizationOn',
  //             routerLink: ['/security/users'],
  //             items: [
  //               {
  //                 label: 'Realizar Pago',
  //                 icon: 'matPayments',
  //                 routerLink: ['/settings/matricular']
  //               }, 
  //               {
  //                 label: 'Reporte Pagos',
  //                 icon: 'matAssessment',
  //                 routerLink: ['/security/users']
  //               }, 
  //             ]
  //           },            
          
  //         ]
  //       },
  //       {
  //         label: 'Ajustes Generales ',
  //         items: [
  //           {
  //             label: 'Cursos',
  //             icon: 'matLibraryBooks',
  //             routerLink: ['/config/periodos']
  //           },
  //           {
  //             label: 'Docentes',
  //             icon: 'matPerson',
  //             routerLink: ['/config/niveles-grados']
  //           },  
  //           {
  //             label: 'Aulas',
  //             icon: 'matClass',
  //             routerLink: ['/config/pagos']
  //           },
          
          
  //         ]
  //       },
  //       {
  //         label: 'Mi perfil',
  //         items: [
  //           {
  //             label: 'Cerrar sesión',
  //             icon: 'matExitToApp',
  //             routerLink: ['/config/users']
  //           },           
          
  //         ]
  //       }
  //     ]
  }

}
