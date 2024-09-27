import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matEdit }from '@ng-icons/material-icons/baseline'
@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    RippleModule,
    CheckboxModule,
    NgIconComponent,
    DialogModule
  ],
  providers: [
    provideIcons({
      matEdit
    })
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export default class RolesComponent {
  selectedRoles: any;
  visible: boolean = true;
  rolesList: any[]= [
    {
      id:"1a",
      code:"ADMIN",
      name:"Administrador",
      description:"Administrador del sistema que realiza todas las acciones"
    },
    {
      id:"2a",
      code:"DIREC",
      name:"Dirección",
      user:""
    }
  ];

  openEdit(event:MouseEvent, item:any):void{

  }
}
