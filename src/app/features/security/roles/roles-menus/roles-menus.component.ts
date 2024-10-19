import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { TreeTableModule } from 'primeng/treetable';
import { TreeNode } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matDashboard, matHome, matList, matSecurity, matPeopleAlt, matCalendarMonth , matMonetizationOn,
  matExitToApp, matLaptopChromebook, matLock, matSettingsApplications
  
} from '@ng-icons/material-icons/baseline';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RolesPermissionsService } from '../../rolesPermissions/roles-permissions.service';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PermissionsLabelPipe } from './pipes/permissions.label.pipe';

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
      matExitToApp, matLaptopChromebook, matLock, matSettingsApplications
     })
  ],
  templateUrl: './roles-menus.component.html',
  styleUrl: './roles-menus.component.scss'
})
export class RolesMenusComponent {
  rolesPermissions = inject(RolesPermissionsService)
  cdr = inject(ChangeDetectorRef)
  permissionsTable: any = [];
  menuTable: TreeNode[] = [];
  role: any = [];
  isActionView: boolean = false;
  selectedMenu: any = [];

  reset(): void{
    this.menuTable = [];
    this.selectedMenu = null;
    this.permissionsTable = [];
    this.cdr.detectChanges();
  }

  openMenusComponents(role: any, menuData: TreeNode[]): void {
    this.reset();
    this.role = role;
    this.isActionView = true;
    this.menuTable = JSON.parse(JSON.stringify(menuData));
  }

  onSelectedMenu(event:any){
    this.rolesPermissions.findAll(this.selectedMenu?.key,this.role.id).subscribe(data=>{
      this.permissionsTable = data;
    })

  }

  save():void{

  }
}
