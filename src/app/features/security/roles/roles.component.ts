import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Table, TableCheckbox, TableModule } from 'primeng/table';
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
  matVpnKey, matBadge, matDescription,
  matSchool
} from '@ng-icons/material-icons/baseline'

import { v4 as uuidv4 } from 'uuid';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators,FormsModule } from '@angular/forms';

import { RolesService } from './service/roles.service';
import { ConfirmationService, MessageService, TreeNode } from 'primeng/api';
import { RolesMenusComponent } from './roles-menus/roles-menus.component';
import { MenusService } from '../../system/menus/service/menus.service';
import { ToolbarModule } from 'primeng/toolbar';
import { markAllAsTouched } from '../../../shared/utils/reactive-form-utilities';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { forkJoin } from 'rxjs';
import { typePerson } from './model/roles.model';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';

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
    InputTextareaModule,
    RolesMenusComponent,
    ProgressSpinnerModule,
    MessagesModule,
    ToolbarModule,
    DropdownModule,
    ConfirmDialogModule,
    TooltipModule
  ],
  providers: [
    provideIcons({
      matVpnKey, matBadge, matDescription,matSchool
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
  confirmationService = inject(ConfirmationService);
  selectedRoles: any[] = [];
  rolesList: any[] = [];
  menuData: TreeNode[] = [];
  typePersonList = typePerson;

  
  isDeleteDialog: boolean = false;
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
    typePerson: [undefined, Validators.required],
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
    this.load();
  }

  load(): void {
    const requestMenu = this.menuService.findAll();
    const requestRoles = this.rolesService.findAll();
    
    forkJoin([requestRoles,requestMenu]).subscribe({
      next: ([rol,menu]) => {
        this.menuData = menu;
        this.rolesList = rol;
        this.isLoadingRoles = false;
      },
      error:(err) => {
        this.isLoadingRoles = false;
      }
    })
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
    this.formRoles.controls['typePerson'].setValue(item.typePerson);
    this.formRoles.controls['isActive'].setValue(item.isActive);
    this.formRoles.controls['code'].setValue(item.code);
    this.formRoles.controls['name'].setValue(item.name);
    this.formRoles.controls['description'].setValue(item.description);

    this.isFormRoles = true;
    this.isEdit = true;

  }

  openDelete(event: MouseEvent, item: any): void {
    this.selectedRoles = [item];
    this.confirmationService.confirm({
      message: '¿ Desea eliminar el rol seleccionado, y desactivar sus usuarios ?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.updateDelete()
    });
    event.stopImmediatePropagation();
  }

  openUpdateActive(item: any, event: any): void {
    this.selectedRoles = [item];
    let message: string = '¿ Desea desactivar el rol seleccionado y sus usuarios ?'
    if(event){
      message = '¿ Desea activar el rol seleccionado y sus usuarios ?';
    } 

    this.confirmationService.confirm({
      message: message,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.updateIsActive(event)
    });
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

  updateIsActive(event: boolean): void{
    this.rolesService.updateIsActive(this.selectedRoles[0].id,event).subscribe(data =>{
      this.rolesList = this.rolesList.map(r => {
        if (r.id === this.selectedRoles[0].id) {
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

  updateDelete(): void {
    this.rolesService.updateDeletedAt(this.selectedRoles[0]?.id).subscribe(data =>{
      this.toastService.add({ severity: 'success', life: 5000, summary: 'Rol Eliminado', detail: 'El rol se eliminó correctamente.' }); 
      this.rolesList = this.rolesList.filter(r => r.id !== this.selectedRoles[0]?.id);
      this.isDeleteDialog = false;
    })
  }


  hasError(field: string, error: string): boolean | undefined {
    const control = this.formRoles.get(field);
    return control?.hasError(error) && (control.dirty || control.touched);
  }



}
