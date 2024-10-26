import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../../service/app.layout.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

import { heroUserCircleSolid, heroMoonSolid, heroSunSolid} from '@ng-icons/heroicons/solid';
import { AvatarModule } from 'primeng/avatar';
@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [ 
    CommonModule,
    RouterLink,
    ButtonModule,
    RippleModule,
    NgIconComponent,
    AvatarModule
  ],
  providers: [
    provideIcons({ 
      heroUserCircleSolid, heroMoonSolid, heroSunSolid
     })
  ],
  templateUrl: './app-topbar.component.html',
  styleUrl: './app-topbar.component.scss'
})
export class AppTopbarComponent {
  items!: MenuItem[];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(public layoutService: LayoutService) { }

}
