import { CommonModule, Location } from '@angular/common';
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
import { FileRegisterService } from '../alumnos/service/file-register.service';
import { StateLabelPipe } from '../list/pipes/state-label.pipe';
import { StatePipe } from '../list/pipes/state.pipe';
import { ErrorPageComponent } from '../../../../shared/utils/error-page/error-page.component';
import { AvatarLabelPipe } from '../list/pipes/avatar-label.pipe';
import { LoadingPageComponent } from '../../../../shared/utils/loading-page/loading-page.component';
import { PaymentsComponent } from './payments/payments.component';
import { DocumentsComponent } from './documents/documents.component';
import { forkJoin } from 'rxjs';
import { ParentsComponent } from './parents/parents.component';
import { ParentsService } from '../alumnos/service/parents.service';
import { ChargesService } from '../alumnos/service/charges.service';
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
    StateLabelPipe,
    StatePipe,
    AvatarLabelPipe,
    ErrorPageComponent,
    LoadingPageComponent,
    PaymentsComponent,
    DocumentsComponent,
    ParentsComponent
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
  parentService = inject(ParentsService);
  location = inject(Location);
  chargesService = inject (ChargesService);
  @Input("id") id: number = 0;

  matricule!: any;
  pays: any[] = [];
  isLoading: boolean = false;
  isError: boolean = false;

  ngOnInit(): void {
    this.isLoading = true
    const fileRequest = this.fileRegisterService.findById(this.id);

    forkJoin([fileRequest]).subscribe({
      next:([fileRegister]) => {
        this.matricule = fileRegister;

        if(fileRegister){
          this.getCharges(this.matricule.fileEconomic.id)
        }else {
          this.isLoading = true;
          this.isError = true;
        }
      },
      error:([err]) => {
        this.isLoading = true;
        this.isError = true;
      }
    });
  }

  getCharges(id: number): void {
    this.chargesService.findPays(id).subscribe({
      next: (charge) => {
        this.pays = charge;
        this.isLoading = false;
      },
      error: (err) =>{
        this.isLoading = true;
        this.isError = true; 
      },
    })
  }
}
