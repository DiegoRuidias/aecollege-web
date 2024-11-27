import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';
import { TabViewModule } from 'primeng/tabview';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { 
  matBadge, matDescription,matSchool,matArticle,matFactCheck,matPerson,matPhoneAndroid,matEmail,matAccountBox,
  matCreditCard,matAddLocationAlt,matFolder,
  matPersonAddAlt1,
  matNewspaper
} from '@ng-icons/material-icons/baseline'
import { PagosComponent } from './pagos/pagos.component';
import { FileRegisterService } from '../alumnos/service/file-register.service';
import { StateLabelPipe } from '../list/pipes/state-label.pipe';
import { StatePipe } from '../list/pipes/state.pipe';
import { ErrorPageComponent } from '../../../../shared/utils/error-page/error-page.component';
import { AvatarLabelPipe } from '../list/pipes/avatar-label.pipe';
import { LoadingPageComponent } from '../../../../shared/utils/loading-page/loading-page.component';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    AvatarModule,
    AvatarGroupModule,
    TagModule,
    ButtonModule,
    RippleModule,
    TabViewModule,
    NgIconComponent,
    PagosComponent,
    StateLabelPipe,
    StatePipe,
    AvatarLabelPipe,
    ErrorPageComponent,
    LoadingPageComponent
  ],
  providers: [
    provideIcons({
      matAccountBox, matBadge, matDescription,matSchool,matArticle,matFactCheck,matPerson,
      matPhoneAndroid,matEmail,matCreditCard,matAddLocationAlt, matPersonAddAlt1,matNewspaper,matFolder
    })
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export default class SearchComponent implements OnInit {
  fileRegisterService = inject(FileRegisterService);
  @Input("id") id!: any[];

  matricule!: any;
  isLoading: boolean = false;
  isError: boolean = false;
  ngOnInit(): void {
    this.isLoading = true
    this.fileRegisterService.findById(this.id).subscribe({
      next:(data) => {
        this.matricule = data;
        this.isLoading = false;
      },
      error:(err) => {
        this.isLoading = true;
        this.isError = true;
      }
    })
  }
}
