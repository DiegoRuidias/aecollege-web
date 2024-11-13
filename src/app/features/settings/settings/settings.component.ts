import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export default class SettingsComponent {

}
