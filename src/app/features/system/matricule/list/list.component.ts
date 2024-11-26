import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    DropdownModule,
    ToolbarModule,
    InputTextModule,
    PaginatorModule,
    AvatarModule,
    TagModule,
    CardModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export default class ListComponent {
  
  hola():void{
    console.log("prueba");
  }
}
