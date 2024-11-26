import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
    PagosComponent
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
export default class SearchComponent {

}
