import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { TreeTableModule } from 'primeng/treetable';
import { MessageService, TreeNode } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matDashboard, matHome, matList, matSecurity, matPeopleAlt, matCalendarMonth , matMonetizationOn,
  matExitToApp, matLaptopChromebook, matLock, matSettingsApplications, matBarChart,matClass
  
} from '@ng-icons/material-icons/baseline';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PermissionsLabelPipe } from './pipes/permissions.label.pipe';

import { v4 as uuidv4 } from 'uuid';
import { RolesPermissionsService } from './services/roles-permissions.service';
@Component({
  selector: 'app-roles-menus',
  standalone: true,
  imports: [
    CommonModule,
    TreeTableModule,
    TableModule,
    DialogModule,
    FormsModule,
    NgIconComponent,
    ButtonModule,
    RippleModule,
    InputSwitchModule,
    PermissionsLabelPipe
  ],
  providers: [
    provideIcons({ 
      matDashboard, matHome, matList, matSecurity, matPeopleAlt, matCalendarMonth, matMonetizationOn,
      matExitToApp, matLaptopChromebook, matLock, matSettingsApplications, matBarChart,matClass
     })
  ],
  templateUrl: './roles-menus.component.html',
  styleUrl: './roles-menus.component.scss'
})
export class RolesMenusComponent {
  @ViewChild('tablePermissions') tablePermissions!: Table;
  rolesPermissions = inject(RolesPermissionsService)
  toastService = inject(MessageService);

  cdr = inject(ChangeDetectorRef)
  permissionsTable: any[] = [];
  menuTable: TreeNode[] = [];
  role: any = [];
  isActionView: boolean = false;
  selectedMenu: any = [];

  isViewSave: boolean = false;

  reset(): void {
    this.menuTable = [];
    this.selectedMenu = null;
    this.isViewSave = false;
    this.permissionsTable = [];
    this.cdr.detectChanges();
  }

  openMenusComponents(role: any, menuData: TreeNode[]): void {
    this.reset();
    this.role = role;
    this.isActionView = true;
    this.menuTable = JSON.parse(JSON.stringify(menuData));
  }

  onSelectedMenu(event: any): void {
    this.isViewSave = false;
    this.rolesPermissions.findAll(this.selectedMenu?.key,this.role.id).subscribe(data=>{
      this.permissionsTable = data;
    })
  }

  onUnSelectedMenu(): void {
    this.isViewSave = false;
    this.permissionsTable = [];
  }

  save(): void {
    var request = this.tablePermissions?._value;     
    request.forEach((item) => {
      if (!item.id) {
        item.id = uuidv4(); 
      }
    });
    this.rolesPermissions.create(this.role.id,request).subscribe(data=>{
      this.toastService.add({ severity: 'success', life: 5000, summary: 'Permisos Actualizados', detail: 'El Permiso se actualizo correctamente.' });
      this.isViewSave = false;
    })
  }
}
