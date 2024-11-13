import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';
import { MenusService } from './service/menus.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matDashboard, matHome, matList, matSecurity, matPeopleAlt, matCalendarMonth , matMonetizationOn,
  matExitToApp, matLaptopChromebook, matLock, matSettingsApplications, matBarChart,matClass,
  matFolder
  
} from '@ng-icons/material-icons/baseline';
@Component({
  selector: 'app-menus',
  standalone: true,
  imports: [
    CommonModule,
    TreeTableModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    NgIconComponent,
    ProgressSpinnerModule,
  ],
  providers: [
    provideIcons({ 
      matDashboard, matHome, matList, matSecurity, matPeopleAlt, matCalendarMonth, matMonetizationOn,
      matExitToApp, matLaptopChromebook, matLock, matSettingsApplications,matBarChart,matClass, matFolder
     })
    ],
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.scss'
})
export default class MenusComponent implements OnInit{
  menuService = inject(MenusService);

  menuTable: any;
  menuData: TreeNode[] = []

  isLoadingMenu: boolean = false;
  
  ngOnInit(): void {
    this.isLoadingMenu = true;
    this.menuService.findAll().subscribe({
      next: (data) => {
        this.isLoadingMenu = false;
        this.menuData = data
      },
      error: (err) => {
        this.isLoadingMenu = false;
      },
    })
  }
  
  openEdit(event:MouseEvent, item:any): void{

  }
}
