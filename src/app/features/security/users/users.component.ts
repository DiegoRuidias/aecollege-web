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
  matVpnKey, matBadge, matDescription, matPerson,
  matEmail, matPerson2
} from '@ng-icons/material-icons/baseline'
import { markAllAsTouched } from '../../../shared/utils/reactive-form-utilities';
import { identity } from 'rxjs';
import { EmailValidator } from '../../system/matricule/alumnos/validators/email.validator';
import { PhoneValidator } from '../../system/matricule/alumnos/validators/phone.validator';
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
      matVpnKey, matBadge, matDescription, matEmail, matPerson2, matPerson
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
  selectedUser: any[] = [];

  isViewUsers: boolean = false;
  isFormUsers: boolean = false;
  rolesTable: any[] = [];
  isViewSave: boolean = false;
  isRolesView: boolean = false;
  isLoadingUser: boolean = false;
  isLoadingRole: boolean = false;
  isLoadingButton: boolean = false; 
  isFormUser: boolean = false;
  isEdit: boolean = false;

  public formUsers: FormGroup = this.formBuilder.group({
    id: [''],
    isActive: [true],
    name: ['', Validators.required],
    username: ['', Validators.required],
    phone: ['',[PhoneValidator(), Validators.required]],
    email: ['',[EmailValidator(), Validators.required]],
    password: ['', Validators.required]
});

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
      },
      error: (data) => {
        this.isLoadingUser = false;
      }
    });
      
  }


  openRoles(event: any , item: any) {
    this.rolesTable = [];
    this.isViewSave = false;
    event.stopPropagation();
    event.preventDefault();
    this.isRolesView = true;
    this.selectedUser = [item]
    this.isLoadingRole = true;
    this.userRolesService.findAll(item.id).subscribe({
      next: (data) => {
        this.rolesTable = data;
        this.isLoadingRole = false
      },
      error:(err) => {
        this.isLoadingRole = false
      },
      
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
    const control = this.formUsers.get(field);
    return control?.hasError(error) && (control.dirty || control.touched);
  }

  updateIsActive(id: string , event: boolean): void{
    this.usersService.updateIsActive(id,event).subscribe(data =>{
      if(event){
        this.toastService.add({ severity: 'success', life: 5000, summary: 'Usuario Activado', detail: 'El usuario se activo correctamente.' });
      } else {
        this.toastService.add({ severity: 'success', life: 5000, summary: 'Usuario desactivado', detail: 'El usuario se desactivo correctamente.' });
      }
    })
  }

  openAccess(event: any, item: any){
    event.stopPropagation();
    event.preventDefault();
    this.selectedUser = [item];
  }

  openView(event: any, item: any): void {
    this.isLoadingButton = false;
    event.stopPropagation();
    event.preventDefault();
    
    this.selectedUser = [item]
    this.isViewUsers = true;
  }
  initFormUsers(): void {
    this.formUsers.reset();
    //this.formUsers.controls['id'].setValue(uuidv4());
    this.formUsers.controls['isActive'].setValue(true);
  }

  openNew(): void {
    this.initFormUsers();
    this.isEdit = false;
    this.isFormUsers = true;
  }

  openEdit( event: any, item: any ): void {
    this.isLoadingButton = false;
    this.formUsers.reset();
    event.stopPropagation();
    event.preventDefault();

    this.selectedUser = [item]

 
    this.formUsers.controls['id'].setValue(item.id);
    this.formUsers.controls['isActive'].setValue(item.isActive);
    this.formUsers.controls['name'].setValue(item.name);
    this.formUsers.controls['username'].setValue(item.username);
    this.formUsers.controls['phone'].setValue(item.phone);
    this.formUsers.controls['email'].setValue(item.email);
    this.formUsers.controls['password'].setValue(item.password);

    this.isFormUsers = true;
    this.isEdit = true;

  }

  save(): void {
    if (!this.formUsers.valid) {
      markAllAsTouched(this.formUsers)
      return;
    }
    if (this.isEdit)
        this.update();
    else
        this.create();
  }

  update(): void{
    this.isLoadingButton = true;
    this.usersService.update(this.formUsers.value).subscribe({
      next:(data) => {
      this.userList.forEach((item, index) => {
        if (item.id === data.id) {
          this.userList[index] = data;
        }
      });
      this.toastService.add({ severity: 'success', life: 5000, summary: 'User Editado', detail: 'El usuario se editó correctamente.' });
      this.isLoadingButton = false;
      this.isFormUsers = false;
      },
      error:(err) => {
        this.isLoadingButton = false;  
      },
    });
  }

  create(): void {
    this.isLoadingButton = true;
    this.usersService.create(this.formUsers.value).subscribe({
      next:(data) => {
        this.userList = [...this.userList, data];
        this.toastService.add({ severity: 'success', life: 5000, summary: 'User Creado', detail: 'El Usuario se creó correctamente.' });
        this.isLoadingButton = false;
        this.isFormUsers = false;
      },
      error:(err) => {
        this.isLoadingButton = false;
      },
    });
  }
}
