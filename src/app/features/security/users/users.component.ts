import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    CheckboxModule,
    ButtonModule,
    RippleModule,
    InputSwitchModule,
    InputTextModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export default class UsersComponent {
  userList: any[]= [
    {
      id:"1a",
      name:"DIEGO JEFFERSON RUIDIAS OLIVERA",
      user:"74862780",
    },
    {
      id:"2a",
      name:"DIEGO JEFFERSON RUIDIAS OLIVERA",
      user:"DIEGORUIDIASO",
    }
  ];
  selectedRoles: any;

  
  openEdit(event:MouseEvent, item:any):void{

  }
}
