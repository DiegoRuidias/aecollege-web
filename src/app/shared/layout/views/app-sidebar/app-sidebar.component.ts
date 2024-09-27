import { CommonModule } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { LayoutService } from '../../service/app.layout.service';
import { AppMenuComponent } from '../app-menu/app-menu.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports:[
    CommonModule,
    AppMenuComponent
  ],
  templateUrl: './app-sidebar.component.html',
  styleUrl: './app-sidebar.component.scss'
})
export class AppSidebarComponent {
  constructor(public layoutService: LayoutService, public el: ElementRef) { }
}
