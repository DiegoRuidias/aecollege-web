import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { 
  matBadge, matDescription,matSchool,matArticle,matFactCheck,matPerson,matPhoneAndroid,matEmail,matAccountBox,
  matCreditCard,matAddLocationAlt,
  matPersonAddAlt1,
  matNewspaper
} from '@ng-icons/material-icons/baseline'
import { CalendarModule } from 'primeng/calendar';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { typeMatricule, typeParent } from './model/alumnos.model';
import { PeriodsService } from '../../settings/periods/service/periods.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { forkJoin } from 'rxjs';
import { LevelsService } from '../../settings/levels-grades/service/levels.service';
import { GradeService } from '../../settings/levels-grades/service/grade.service';
import { TypeDocumentService } from '../../settings/type-document/service/type-document.service';
import { PaymentsService } from '../../settings/payments/service/payments.service';
import { Payments } from '../../settings/payments/model/payments.model';
import { markAllAsTouched } from '../../../shared/utils/reactive-form-utilities';
import { DocumentsService } from '../../settings/documents/service/documents.service';
import { LoadingPageComponent } from '../../../shared/utils/loading-page/loading-page.component';
@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    NgIconComponent,
    CalendarModule,
    ReactiveFormsModule,
    FormsModule,
    TabViewModule,
    InputTextModule,
    InputTextareaModule,
    InputSwitchModule,
    CheckboxModule,
    ProgressSpinnerModule,
    InputGroupAddonModule,
    InputGroupModule,
    DropdownModule,
    ToolbarModule,
    TableModule,
    DialogModule,
    LoadingPageComponent
  ],
  providers: [
    provideIcons({
      matAccountBox, matBadge, matDescription,matSchool,matArticle,matFactCheck,matPerson,
      matPhoneAndroid,matEmail,matCreditCard,matAddLocationAlt, matPersonAddAlt1,matNewspaper
    })
  ],
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.scss'
})
export default class AlumnosComponent implements OnInit{
  private readonly formBuilder = inject(FormBuilder);
  periodService = inject(PeriodsService);
  levelsService = inject(LevelsService);
  gradesService = inject(GradeService);
  paymentsService = inject(PaymentsService);
  typeDocumentService = inject(TypeDocumentService);
  documentService = inject(DocumentsService);

  matriculeList = typeMatricule;
  typeParentList = typeParent;
  selectedParents: any[] = [];
  activeIndex: number = 0;
  parents: any[] = [];
  documents: any[] = [];
  typeDocumentList: any[] = [];
  periodsList: any[] = [];
  levelList: any[] = [];
  gradeList: any[] = [];
  matriculePayList: Payments[] = [];
  pensionPayList: Payments[] = [];

  isLoading: boolean = true;
  isLevelSelected: boolean = true;
  isViewParents: boolean = false;
  isEdit: boolean = false;
  isLoadingButton: boolean = false;

  public formAcademic: FormGroup = this.formBuilder.group({
    level: [undefined, Validators.required],
    gradeId: [undefined, Validators.required],
    periodId: [undefined, Validators.required],
    matriculeId: [undefined, Validators.required],
    pensionId: [undefined, Validators.required]
  });

  public formStudent: FormGroup = this.formBuilder.group({
    id: [''],
    documentType: [undefined, Validators.required],
    documentNumber: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    name: [''],
    firstName: ['', Validators.required],
    middleName: [''],
    maternalSurname: ['',Validators.required],
    paternalSurname: ['',Validators.required],
    email: [''],
    phone:[''],
    address:['']
  });

  public formParent: FormGroup = this.formBuilder.group({
    id: [''],
    documentType: [undefined, Validators.required],
    documentNumber: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    name: [''],
    relation: [undefined, Validators.required],
    firstName: ['', Validators.required],
    isPrincipal: [false, Validators.required],
    middleName: [''],
    maternalSurname: ['',Validators.required],
    paternalSurname: ['',Validators.required],
    email: [''],
    phone:[''],
    address:['']
  });

  public formEconoamic: FormGroup = this.formBuilder.group({
    pension: [undefined, Validators.required],
    matricule: [undefined, Validators.required]
  });

  ngOnInit(): void {
    this.load();
  };

  load(): void {
    const requestPeriod = this.periodService.findAll();
    const requestLevel = this.levelsService.findAll();
    const requestTypeDocument = this.typeDocumentService.findAll();
    const requestDocument = this.documentService.findAll();
    const requestPayment = this.paymentsService.findAll();
    forkJoin([requestPeriod, requestLevel,requestTypeDocument,requestDocument, requestPayment]).subscribe({
      next:([period, level, typedocument,document, payments]) => {
        this.periodsList = period;
        this.levelList = level;
        this.typeDocumentList = typedocument;
        this.matriculePayList = payments.filter(d => d.type === 0);
        this.pensionPayList = payments.filter(d => d.type === 1);
        this.documents = document;
        this.documents.forEach(d => d.state = false)
        this.isLoading = false;
      },
    });
  };

  onChangeLevel(event: DropdownChangeEvent): void {
    this.gradeList = event.value.grades;
    this.isLevelSelected = false;
  };
  
  openNewParents(): void {
    this.isViewParents = true;
  };

  openEditParents(event: any, items: any): void {
    this.selectedParents = [items];
    this.isViewParents = true;
  };

  save(): void {
    console.log(this.formAcademic.value)
    console.log(this.documents)
  }

  saveParents(): void {
    if (!this.formParent.valid) {
      markAllAsTouched(this.formParent)
      return;
    }
    if (this.isEdit)
      console.log()  
    else {
      this.formParent.get('name')?.setValue(
        [
          this.formParent.value.firstName,
          this.formParent.value.middleName,
          this.formParent.value.maternalSurname,
          this.formParent.value.paternalSurname
        ]
          .filter(name => name && name.trim() !== '')
          .join(' ') as string );
      this.parents = [...this.parents,this.formParent.value];
      this.isViewParents = false;
    }

  }

  hasErrorStudent(field: string, error: string): boolean | undefined {
    const control = this.formStudent.get(field);
    return control?.hasError(error) && (control.dirty || control.touched);
  };

  hasErrorParent(field: string, error: string): boolean | undefined {
    const control = this.formParent.get(field);
    return control?.hasError(error) && (control.dirty || control.touched);
  };

  hasErrorAcademic(field: string, error: string): boolean | undefined {
    const control = this.formAcademic.get(field);
    return control?.hasError(error) && (control.dirty || control.touched);
  };

}
