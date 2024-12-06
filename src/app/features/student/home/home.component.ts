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
import { forkJoin } from 'rxjs';

import { Router } from '@angular/router';
import { StateLabelPipe } from '../../system/matricule/list/pipes/state-label.pipe';
import { StatePipe } from '../../system/matricule/search/payments/pipes/state.pipe';
import { AvatarLabelPipe } from '../../system/matricule/list/pipes/avatar-label.pipe';
import { ErrorPageComponent } from '../../../shared/utils/error-page/error-page.component';
import { LoadingPageComponent } from '../../../shared/utils/loading-page/loading-page.component';
import { PaymentsComponent } from '../../system/matricule/search/payments/payments.component';
import { DocumentsComponent } from '../../system/matricule/search/documents/documents.component';
import { ParentsComponent } from '../../system/matricule/search/parents/parents.component';
import { FileRegisterService } from '../../system/matricule/alumnos/service/file-register.service';
import { ParentsService } from '../../system/matricule/alumnos/service/parents.service';
import { ChargesService } from '../../system/matricule/alumnos/service/charges.service';
import { SettingsService } from '../../../shared/layout/service/settings.service';
import { Settings } from '../../../shared/layout/api/settings.model';
import { LoginService } from '../../../shared/auth/services/login.service';
@Component({
  selector: 'app-home',
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
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent implements OnInit{
  fileRegisterService = inject(FileRegisterService);
  parentService = inject(ParentsService);
  router = inject(Router);
  chargesService = inject (ChargesService);
  settingsService = inject(SettingsService);
  loginService = inject(LoginService);
  @Input("id") id: number = 0;

  matricule?: any;
  pays: any[] = [];
  charges: any[] = [];
  isLoading: boolean = false;
  isError: boolean = false;
  settings: Settings = {
    id:0,
    periodId:'',
    studentRole:'',
    employeeRole:''
  }

  ngOnInit(): void {
    this.isLoading = true
    this.settings = this.settingsService.getSettings();
    this.fileRegisterService.findByDocumentNumberByPeriod(this.loginService.getUser(),this.settings.periodId).subscribe({
      next:(data) => {
        this.matricule = data;
        console.log(this.matricule)
        if(data){
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
    const paysRequest = this.chargesService.findPays(id);
    const chargesRequest = this.chargesService.findcharges(id);
    forkJoin([paysRequest,chargesRequest]).subscribe({
      next: ([pay,charge]) => {
        this.pays = pay;
        this.charges = charge;
        this.isLoading = false;
      },
      error: (err) =>{
        this.isLoading = true;
        this.isError = true; 
      },
    })
  }
}
