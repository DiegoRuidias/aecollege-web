import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { UsersService } from './service/users.service';
import { ConfirmationService, MessageService } from 'primeng/api';
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
import { typePerson } from '../roles/model/roles.model';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { PasswordModule } from 'primeng/password';
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
    NgIconComponent,
    DropdownModule,
    TooltipModule,
    PasswordModule
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
  confirmationService = inject(ConfirmationService);
  usersService = inject(UsersService);
  userRolesService = inject(UserRolesService)
  toastService = inject(MessageService);
  typePerson = typePerson;
  userList: any[] = [];
  selectedUser: any[] = [];

  isChangePassword: boolean = false;
  isViewUsers: boolean = false;
  isFormUsers: boolean = false;
  rolesTable: any[] = [];
  isViewSave: boolean = false;
  isRolesView: boolean = false;
  isLoadingUser: boolean = false;
  isLoadingRole: boolean = false;
  isLoadingButton: boolean = false; 
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

  public formChangePass: FormGroup = this.formBuilder.group({
    id: [''],
    password: ['', Validators.required],
    prePass: ['', Validators.required]
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

    const activeRoles = request.filter(d => d.isActive);
    if (activeRoles.length > 1) {
      this.toastService.add({ severity: 'error', life: 5000, summary: 'Error de rol', detail: 'Solo puede haber un rol activo.' });
      this.isLoadingButton = false; 
      return;
    } 

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

  openUpdateActive(item: any, event: any): void {
    this.selectedUser= [item];
    let message: string = '¿ Desea desactivar el usuario Seleccionado ?'
    if(event){
      message = '¿ Desea activar el usuario Seleccionado ?';
    } 

    this.confirmationService.confirm({
      message: message,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.updateIsActive(event)
    });
  }



  updateIsActive(event: boolean): void{
    this.usersService.updateIsActive(this.selectedUser[0].id,event).subscribe(data =>{
      this.userList = this.userList.map(r => {
        if (r.id === this.selectedUser[0].id) {
          return { ...r, isActive: event }; 
        }
        return r; 
      });
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
    this.formUsers.controls['isActive'].setValue(true);
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
    this.formUsers.controls['password'].setValue('****');

    this.isFormUsers = true;
    this.isEdit = true;

  }

  openSavePassword(event: any, item: any ): void {
    this.formChangePass.reset();
    event.stopPropagation();
    event.preventDefault();
    this.selectedUser = [item]
    this.isChangePassword = true;
  }

  savePassword(): void {
    const newPassword: string = this.formChangePass?.value.prePass;
    if (!this.formChangePass.valid) {
      markAllAsTouched(this.formChangePass)
      return;
    }
    if(this.formChangePass.value.password !== newPassword){
      this.toastService.add({ severity: 'warn', life: 5000, summary: 'Contraseñas', detail: 'Las contraseñas no coinciden.' });
      return;
    }
    this.confirmationService.confirm({
      message: 'Desea cambiar la contraseña',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.updatePassword()
    });
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

  updatePassword(): void {
    this.isLoadingButton = true;
    this.formChangePass.controls['id'].setValue(this.selectedUser[0].id);
    this.usersService.updatePassword(this.formChangePass.value).subscribe({
      next:(data) => {
      this.toastService.add({ severity: 'success', life: 5000, summary: 'Contraseña cambiada', detail: 'La contraseña se restauró correctamente.' });
      this.isChangePassword = false;
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

  hasErrorPassword(field: string, error: string): boolean | undefined {
    const control = this.formChangePass.get(field);
    return control?.hasError(error) && (control.dirty || control.touched);
  }
}
