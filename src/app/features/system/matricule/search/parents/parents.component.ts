import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { 
  matInsertDriveFile
} from '@ng-icons/material-icons/baseline'
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AvatarLabelPipe } from '../../list/pipes/avatar-label.pipe';
import { RelationPipe } from './pipes/relation.pipe';
import { TruncateLabelPipe } from '../../../../../shared/pipes/truncate-label.pipe';
@Component({
  selector: 'app-parents',
  standalone: true,
  imports: [
    CommonModule,
    TagModule,
    NgIconComponent,
    ButtonModule,
    AvatarModule,
    AvatarGroupModule,
    AvatarLabelPipe,
    RelationPipe,
    TruncateLabelPipe
  ],
  providers: [
    provideIcons({
      matInsertDriveFile
    })
  ],
  templateUrl: './parents.component.html',
  styleUrl: './parents.component.scss'
})
export class ParentsComponent {
  @Input() parents: any[]= []
  @Input() admin: boolean = false
}
