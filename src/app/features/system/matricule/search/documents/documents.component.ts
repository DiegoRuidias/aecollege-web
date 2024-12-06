import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { 
  matInsertDriveFile
} from '@ng-icons/material-icons/baseline'
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [
    CommonModule,
    TagModule,
    NgIconComponent,
    ButtonModule
  ],
  providers: [
    provideIcons({
      matInsertDriveFile
    })
  ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss'
})
export class DocumentsComponent {
  @Input() documents: any[] = [];
  @Input() admin: boolean = false
}
