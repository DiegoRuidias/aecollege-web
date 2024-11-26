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
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LabelBlankUsersPipe } from './pipes/label-blank-users.pipe';
import { DialogModule } from 'primeng/dialog';
import { UserRolesService } from './service/user-roles.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { v4 as uuidv4 } from 'uuid';
import { ToolbarModule } from 'primeng/toolbar';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { 
  matVpnKey, matBadge, matDescription
} from '@ng-icons/material-icons/baseline'
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    CheckboxModule,
    ButtonModule,
    RippleModule,
    FormsModule,
    InputSwitchModule,
    InputTextModule,
    InputGroupAddonModule,
    InputGroupModule,
    LabelBlankUsersPipe,
    DialogModule,
    ToolbarModule,
    ProgressSpinnerModule,
    NgIconComponent
  ],
  providers: [
    provideIcons({
      matVpnKey, matBadge, matDescription
    })
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export default class UsersComponent implements OnInit{
  @ViewChild('tableUsers') tableUsers!: Table;
  @ViewChild('tableRoles') tableRoles!: Table;
  private readonly formBuilder = inject(FormBuilder);
  usersService = inject(UsersService);
  userRolesService = inject(UserRolesService)
  toastService = inject(MessageService);
  userList: any[] = [];
  selectedUser: any;

  rolesTable: any[] = [];
  isViewSave: boolean = false;
  isRolesView: boolean = false;
  isLoadingUser: boolean = false;
  isLoadingButton: boolean = false; 
  isFormUser: boolean = false;
  isEdit: boolean = false;

  public formUser: FormGroup = this.formBuilder.group({
    id: [''],
    isActive: [true],
    code: ['', Validators.required],
    name: ['', Validators.required],
    description: [''],
    sort: [0]
  });

  ngOnInit(): void {
    this.isViewSave = false;
    this.isLoadingUser = true;
    this.usersService.findAll().subscribe({
      next: (data) => {
        this.userList = data;
        this.isLoadingUser = false;
        console.log(data)
      },
      error: (data) => {
        this.isLoadingUser = false;
      }
    });
      
  }

  openEdit(event:MouseEvent, item:any): void {
    console.log(this.tableUsers._value);
  }

  save(): void {

  }

  openRoles(event: any , item: any) {
    this.isViewSave = false;
    event.stopPropagation();
    event.preventDefault();
    this.selectedUser = [item]
    this.userRolesService.findAll(item.id).subscribe(data => {
      this.rolesTable = data;
      this.isRolesView = true;
    });
  }
  
  filterGlobal(event: Event, matchMode: string) {
    const inputElement = event.target as HTMLInputElement;
    this.tableUsers.filterGlobal(inputElement.value, matchMode);
  }

  saveRoles(): void {
    this.isLoadingButton = true; 
    var request = this.tableRoles?._value;     
    request.forEach((item) => {
      if (!item.id) {
        item.id = uuidv4(); 
      }
    });

    this.userRolesService.create(this.selectedUser[0].id,this.tableRoles._value).subscribe({
      next:(data) => {
        this.toastService.add({ severity: 'success', life: 5000, summary: 'Rol Editado', detail: 'El rol se editó correctamente.' });
        this.isViewSave = false;
        this.isLoadingButton = false; 
      },
      error:(err) => {
        this.isLoadingButton = false; 
      },
    });
  }

  hasError(field: string, error: string): boolean | undefined {
    const control = this.formUser.get(field);
    return control?.hasError(error) && (control.dirty || control.touched);
  }
}