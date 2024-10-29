import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { UsersService } from './service/users.service';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { LabelBlankUsersPipe } from './pipes/label-blank-users.pipe';
import { DialogModule } from 'primeng/dialog';
import { UserRolesService } from './service/user-roles.service';
import { v4 as uuidv4 } from 'uuid';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    CheckboxModule,
    ButtonModule,
    RippleModule,
    FormsModule,
    InputSwitchModule,
    InputTextModule,
    LabelBlankUsersPipe,
    DialogModule,
    ToolbarModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export default class UsersComponent implements OnInit{
  @ViewChild('tableUsers') tableUsers!: Table;
  @ViewChild('tableRoles') tableRoles!: Table;

  usersService = inject(UsersService);
  userRolesService = inject(UserRolesService)
  toastService = inject(MessageService);
  userList: any[] = [];
  selectedUser: any;

  rolesTable: any[] = [];
  isViewSave: boolean = false;
  isRolesView: boolean = false;

  ngOnInit(): void {
      this.isViewSave = false;
      this.usersService.findAll().subscribe(data =>{
        this.userList = data;
      })
      
  }

  openEdit(event:MouseEvent, item:any):void{
    console.log(this.tableUsers._value);
  }

  openRoles(event:any , item: any){
    this.isViewSave = false;
    event.stopPropagation();
    event.preventDefault();
    this.selectedUser = [item]
    this.userRolesService.findAll(item.id).subscribe(data => {
      this.rolesTable = data;
      this.isRolesView = true;
    })
  }
  
  filterGlobal(event: Event, matchMode: string) {
    const inputElement = event.target as HTMLInputElement;
    this.tableUsers.filterGlobal(inputElement.value, matchMode);
  }

  saveRoles(): void {
    var request = this.tableRoles?._value;     
    request.forEach((item) => {
      if (!item.id) {
        item.id = uuidv4(); 
      }
    });
    this.userRolesService.create(this.selectedUser[0].id,this.tableRoles._value).subscribe(data =>{
      this.toastService.add({ severity: 'success', life: 5000, summary: 'Rol Editado', detail: 'El rol se editó correctamente.' });
      this.isViewSave = false;
    })
  }
}