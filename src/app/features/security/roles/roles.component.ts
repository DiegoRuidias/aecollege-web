import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from 'primeng/messages';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { 
  matVpnKey, matBadge, matDescription
} from '@ng-icons/material-icons/baseline'

import { v4 as uuidv4 } from 'uuid';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators,FormsModule } from '@angular/forms';

import { RolesService } from './service/roles.service';
import { MessageService, TreeNode } from 'primeng/api';
import { RolesMenusComponent } from './roles-menus/roles-menus.component';
import { MenusService } from '../../system/menus/service/menus.service';
import { ToolbarModule } from 'primeng/toolbar';
import { markAllAsTouched } from '../../../shared/utils/reactive-form-utilities';
@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    TableModule,
    ButtonModule,
    RippleModule,
    CheckboxModule,
    NgIconComponent,
    DialogModule,
    InputTextModule,
    InputSwitchModule,
    InputGroupAddonModule,
    InputGroupModule,
    RolesMenusComponent,
    ProgressSpinnerModule,
    MessagesModule,
    ToolbarModule
  ],
  providers: [
    provideIcons({
      matVpnKey, matBadge, matDescription
    })
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export default class RolesComponent implements OnInit{
  private readonly formBuilder = inject(FormBuilder);
  rolesService = inject(RolesService);
  menuService = inject(MenusService);
  toastService = inject(MessageService);

  selectedRoles: any[] = [];
  rolesList: any[] = [];
  menuData: TreeNode[] = [];

  isViewRoles: boolean = false;
  isFormRoles: boolean = false;
  isEdit: boolean = false;
  isLoadingRoles: boolean = false;
  isLoadingButton: boolean = false;

public formRoles: FormGroup = this.formBuilder.group({
    id: [''],
    isActive: [true],
    code: ['', Validators.required],
    name: ['', Validators.required],
    description: [''],
    sort: [0]
});

  initFormRoles(): void {
    this.formRoles.reset();
    this.formRoles.controls['id'].setValue(uuidv4());
    this.formRoles.controls['isActive'].setValue(true);
    this.formRoles.controls['sort'].setValue(0);
  }
  
  ngOnInit(): void {
    this.isLoadingRoles = true;
    this.menuService.findAll().subscribe(data => {
      this.menuData = data;
    })
    this.loadRolesList();
  }

  loadRolesList(): void {
    this.rolesService.findAll().subscribe({
      next: (data) => {
        this.rolesList = data;
        this.isLoadingRoles = false;
      },
      error:(err) => {
        this.isLoadingRoles = false;
      }
    });
  }

  openAccess(event: any, item: any){
    event.stopPropagation();
    event.preventDefault();
    this.selectedRoles = [item];
  }
  
  openView(event: MouseEvent, item: any): void {
    this.isLoadingButton = false;
    event.stopPropagation();
    event.preventDefault();
    
    this.selectedRoles = [item]
    this.isViewRoles = true;
  }

  openNew(): void {
    this.initFormRoles();
    this.isEdit = false;
    this.isFormRoles = true;
  }

  openEdit( event: MouseEvent, item: any ): void {
    this.isLoadingButton = false;
    this.formRoles.reset();
    event.stopPropagation();
    event.preventDefault();

    this.selectedRoles = [item]

 
    this.formRoles.controls['id'].setValue(item.id);
    this.formRoles.controls['isActive'].setValue(item.isActive);
    this.formRoles.controls['code'].setValue(item.code);
    this.formRoles.controls['name'].setValue(item.name);
    this.formRoles.controls['description'].setValue(item.description);

    this.isFormRoles = true;
    this.isEdit = true;

  }

  save(): void {
    if (!this.formRoles.valid) {
      markAllAsTouched(this.formRoles)
      return;
    }
    if (this.isEdit)
        this.update();
    else
        this.create();
  }

  create(): void {
    this.isLoadingButton = true;
    this.rolesService.create(this.formRoles.value).subscribe({
      next:(data) => {
        this.rolesList = [...this.rolesList, data];
        this.toastService.add({ severity: 'success', life: 5000, summary: 'Rol Creado', detail: 'El Rol se creó correctamente.' });
        this.isLoadingButton = false;
        this.isFormRoles = false;
      },
      error:(err) => {
        this.isLoadingButton = false;
      },
    });
  }
  

  update(): void{
    this.isLoadingButton = true;
    this.rolesService.update(this.formRoles.value).subscribe({
      next:(data) => {
      this.rolesList.forEach((item, index) => {
        if (item.id === data.id) {
          this.rolesList[index] = data;
        }
      });
      this.toastService.add({ severity: 'success', life: 5000, summary: 'Rol Editado', detail: 'El rol se editó correctamente.' });
      this.isLoadingButton = false;
      this.isFormRoles = false;
      },
      error:(err) => {
        this.isLoadingButton = false;  
      },
    });
  }

  updateIsActive(id: string , event: boolean): void{
    this.rolesService.updateIsActive(id,event).subscribe(data =>{
      this.toastService.add({ severity: 'success', life: 5000, summary: 'Rol Editado', detail: 'El rol se editó correctamente.' }); 
    })
  }

  hasError(field: string, error: string): boolean | undefined {
    const control = this.formRoles.get(field);
    return control?.hasError(error) && (control.dirty || control.touched);
  }

}
