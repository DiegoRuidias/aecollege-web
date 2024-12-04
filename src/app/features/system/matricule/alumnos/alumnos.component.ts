import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
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
import { PeriodsService } from '../../../settings/periods/service/periods.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { forkJoin } from 'rxjs';
import { LevelsService } from '../../../settings/levels-grades/service/levels.service';
import { GradeService } from '../../../settings/levels-grades/service/grade.service';
import { TypeDocumentService } from '../../../settings/type-document/service/type-document.service';
import { PaymentsService } from '../../../settings/payments/service/payments.service';
import { Payments } from '../../../settings/payments/model/payments.model';
import { markAllAsTouched } from '../../../../shared/utils/reactive-form-utilities';
import { DocumentsService } from '../../../settings/documents/service/documents.service';
import { LoadingPageComponent } from '../../../../shared/utils/loading-page/loading-page.component';
import { FileRegisterService } from './service/file-register.service';
import { MessageService } from 'primeng/api';
import { PersonService } from './service/person.service';
import { ErrorPageComponent } from '../../../../shared/utils/error-page/error-page.component';
import { NumberValidator } from './validators/number.validator';
import { EmailValidator } from './validators/email.validator';
import { PhoneValidator } from './validators/phone.validator';
import { ParentsService } from './service/parents.service';
import { UppercaseDirective } from '../../../../shared/utils/directives/uppercase.directive';
import { Settings } from '../../../../shared/layout/api/settings.model';
import { SettingsService } from '../../../../shared/layout/service/settings.service';
import { Router } from '@angular/router';
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
    LoadingPageComponent,
    ErrorPageComponent,
    UppercaseDirective
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
  fileRegisterService = inject(FileRegisterService);
  personService = inject(PersonService);
  parentsService = inject(ParentsService);
  settingsService = inject(SettingsService);
  toastService = inject(MessageService);
  router = inject(Router);

  matriculeList = typeMatricule;
  typeParentList = typeParent;
  activeIndex: number = 0;
  typeDocumentLength: number = 8;
  typeDocumentLengthParent: number = 8;

  selectedParents: any[] = [];
  parents: any[] = [];
  documents: any[] = [];
  typeDocumentList: any[] = [];
  periodsList: any[] = [];
  levelList: any[] = [];
  gradeList: any[] = [];
  matriculePayList: Payments[] = [];
  pensionPayList: Payments[] = [];

  isLoading: boolean = true;
  isError: boolean = false;
  isLevelSelected: boolean = true;
  isStudentReadonly: boolean = false;
  isViewParents: boolean = false;
  isEdit: boolean = false;
  isLoadingButton: boolean = false;
  isParentExist: boolean = false;
  isParentReadonly: boolean = false;

  settings: Settings = {
    id:0,
    periodId:'',
    studentRole:''
  }

  public formAcademic: FormGroup = this.formBuilder.group({
    level: [undefined, Validators.required],
    gradeId: [undefined, Validators.required],
    period: [undefined, Validators.required],
    matricule: [undefined, Validators.required],
    pension: [undefined, Validators.required],
    roleId: [''],
    type: [undefined, Validators.required],
    state:[0]
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
    email: ['',[EmailValidator()]],
    phone:['',[PhoneValidator()]],
    address:[''],
  });

  public formParent: FormGroup = this.formBuilder.group({
    id:[''],
    personId: [''],
    documentType: [undefined, Validators.required],
    documentNumber: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    name: [''],
    relation: [undefined, Validators.required],
    firstName: ['', Validators.required],
    isPrincipal: [false],
    middleName: [''],
    maternalSurname: ['',Validators.required],
    paternalSurname: ['',Validators.required],
    email: ['',[EmailValidator()]],
    phone:['',[PhoneValidator()]],
    address:['']
  });

  reset(): void {
    this.activeIndex = 0;
    this.formAcademic.reset();
    this.formStudent.reset();
    this.formParent.reset();
  }
  onChangeDocumentNumber(event: any): void {
    let value = event.target.value;
    value = value.replace(/[^0-9]/g, '');
    this.formStudent.controls['documentNumber'].setValue(value);
  }

  onChangeDocumentNumberParent(event: any): void {
    let value = event.target.value;
    value = value.replace(/[^0-9]/g, '');
    this.formParent.controls['documentNumber'].setValue(value);
  }

  onChangePhone(event: any): void {
    let value = event.target.value;
    value = value.replace(/[^0-9]/g, '');
    this.formStudent.controls['phone'].setValue(value);
  }
  
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
      next:([periods, levels, typeDocuments, documents, payments]) => {
      this.periodsList = periods;
      this.levelList = levels;
      this.typeDocumentList = typeDocuments;

      this.matriculePayList = payments.filter(payment => payment.type === 0);
      this.pensionPayList = payments.filter(payment => payment.type === 1);

      this.documents = documents.map(doc => ({
        ...doc,
        isActive: false
      }));

      this.loadSettings();
      this.isLoading = false;
      },
      error:(err) => {
        this.isError = true;
      },
    });
  };

  loadSettings(){
    this.settings = this.settingsService.getSettings();
    const period = this.periodsList.find(d => d.id === this.settings.periodId );
    this.formAcademic.get('roleId')?.setValue(this.settings.studentRole);
    this.formAcademic.get('period')?.setValue(period);
    if (!this.formAcademic.value.roleId) {
      this.router.navigate(['config/predeterminados']);
    }
  }

  onChangeLevel(event: DropdownChangeEvent): void {
    this.gradeList = event.value.grades;
    this.isLevelSelected = false;
  };
  
  openNewParents(): void {
    this.formParent.reset();
    this.isEdit = false;
    this.isViewParents = true;

  };

  openEditParents(data: any): void {
    this.selectedParents = [data];
    this.formParent.reset();
    this.isEdit = true;
    const dateValue = new Date(data?.dateOfBirth); 

    this.formParent.controls['name'].setValue(data?.name);
    this.formParent.controls['documentType'].setValue(data?.documentType);
    this.formParent.controls['relation'].setValue(data?.relation);
    this.formParent.controls['documentNumber'].setValue(data?.documentNumber);
    this.formParent.controls['isPrincipal'].setValue(false);
    this.formParent.controls['id'].setValue(data?.id);
    this.formParent.controls['personId'].setValue(data?.personId);
    this.formParent.controls['firstName'].setValue(data?.firstName);
    this.formParent.controls['middleName'].setValue(data?.middleName);
    this.formParent.controls['maternalSurname'].setValue(data?.maternalSurname);
    this.formParent.controls['paternalSurname'].setValue(data?.paternalSurname);
    this.formParent.controls['phone'].setValue(data?.phone);
    this.formParent.controls['email'].setValue(data?.email);
    this.formParent.controls['address'].setValue(data?.address);
    this.formParent.controls['dateOfBirth'].setValue(dateValue);
    this.isViewParents = true;

  };

  validateStudent(): void {
    const documentNumber = this.formStudent.value.documentNumber;
    const period = this.formAcademic.value.period;
    this.isLoadingButton = true;
    this.fileRegisterService.validateStudentPeriod(documentNumber,period.id).subscribe({
      next: (data) => {
        if(data){
          this.hasFormValid();
        } else {
          this.toastService.add({
            severity: 'error',
            life: 5000,
            summary: 'Alumno ya matriculado',
            detail: `El alumno ya se encuentra matriculado en este periodo ${period.name}.`,
          });
        }
        this.isLoadingButton = false;
      },
      error: (err) => {
        this.isLoadingButton = false;
      },
    });
  }


  hasFormValid(): void {
    if(!this.formAcademic.valid){
      markAllAsTouched(this.formAcademic)
      return;
    }
    if(!this.formStudent.valid && this.activeIndex > 0){
      markAllAsTouched(this.formStudent)
      return;
    }

    if(!(this.parents.length > 0) && this.activeIndex > 1){
      this.toastService.add({
        severity: 'error',
        life: 5000,
        summary: 'No hay Apoderados',
        detail: 'Cree Apoderados para continuar.',
      });
      return;
    }

    if(this.activeIndex === 3){
      this.save();
      return;
    }
    this.activeIndex = this.activeIndex + 1;
  }


  save(): void {
    this.isLoadingButton = true;
    const fullName = this.buildFullName(
      this.formStudent.value.firstName,
      this.formStudent.value.middleName,
      this.formStudent.value.paternalSurname,
      this.formStudent.value.maternalSurname
      
    );
  
    this.formStudent.get('name')?.setValue(fullName);
    const allActive = this.documents.every(doc => doc.isActive === true);
    const request = {
      ...this.formAcademic.value, 
      person: this.formStudent.value,
      parents: [this.formParent.value],
      documents: this.documents,
      isDocuments: allActive
    };

    this.fileRegisterService.create(request).subscribe({
      next:(value) => {
        this.toastService.add({
          severity: 'success',
          life: 5000,
          summary: 'Alumno Matriculado',
          detail: 'El Alumno se matriculó correctamente.',
        });
        this.reset();
        this.load();
        this.isLoadingButton = false;
      },
      error:(err) => {
        this.isLoadingButton = false;
      },
    });
  }

  saveParents(): void {
    this.isLoadingButton = true;
    if (!this.formParent.valid) {
      markAllAsTouched(this.formParent)
      this.isLoadingButton = false;
      return;
    }
    if (this.isEdit){
      this.editParents()
    } else {
      this.createParents();
    }
  }

  editParents(): void {
    this.parents.forEach((item, index) => {
      if (item.id === this.formParent.value.id) {
        this.parents[index] = this.formParent.value;
      }
    });
    this.isViewParents = false;
    this.isLoadingButton = false;
  }
  createParents(): void {
    const searchDocument: any[] = this.parents.filter(d => 
      d.documentNumber === this.formParent.value.documentNumber );

    if(searchDocument.length > 0) {
      this.toastService.add({
        severity: 'error',
        life: 5000,
        summary: 'Apoderado Duplicado',
        detail: 'Ya existe apoderado con ese documento',
      });
      this.isLoadingButton = false;
      return;
    }
    const fullName = this.buildFullName(
      this.formParent.value.firstName,
      this.formParent.value.middleName,
      this.formParent.value.paternalSurname,
      this.formParent.value.maternalSurname

    );
  
    this.formParent.get('name')?.setValue(fullName);
    this.formParent.get('isPrincipal')?.setValue(false);
    this.parents = [...this.parents,this.formParent.value];
    this.isViewParents = false;
    this.isLoadingButton = false;
  }

  deleteParents(item: any): void {
    this.parents = this.parents.filter(d => 
      d.documentNumber !== item.documentNumber );
  }

  private buildFullName(firstName: string, middleName: string, maternalSurname: string, paternalSurname: string): string {
    return [firstName, middleName, maternalSurname, paternalSurname]
      .filter(name => name && name.trim() !== '')
      .join(' '); 
  }

  changeDocumentNumber(event: any): void {
    this.parents = [];
    this.isParentExist = false;
    this.isStudentReadonly = false;
    const value: string = event.target.value;
    const documentType = this.formStudent.value.documentType;

    this.formStudent.reset();
    this.formStudent.controls['documentNumber'].setValue(value);
    this.formStudent.controls['documentType'].setValue(documentType);

    if(value && value.trim() !== "" && value.length === 8) {
      const requestPerson = this.personService.findByDocumentNumber(value);
      const requestParent = this.parentsService.findByDocumentStudent(value);
      forkJoin([requestPerson,requestParent]).subscribe(([data,parent]) => {
        if(data.length > 0) {
        this.isStudentReadonly = true;
        const dateValue = new Date(data[0]?.dateOfBirth); 
        this.formStudent.controls['id'].setValue(data[0]?.id);
        this.formStudent.controls['firstName'].setValue(data[0]?.firstName);
        this.formStudent.controls['middleName'].setValue(data[0]?.middleName);
        this.formStudent.controls['maternalSurname'].setValue(data[0]?.maternalSurname);
        this.formStudent.controls['paternalSurname'].setValue(data[0]?.paternalSurname);
        this.formStudent.controls['phone'].setValue(data[0]?.phone);
        this.formStudent.controls['email'].setValue(data[0]?.email);
        this.formStudent.controls['address'].setValue(data[0]?.address);
        this.formStudent.controls['dateOfBirth'].setValue(dateValue);
        }
        if(parent.length > 0){
          this.parents = parent;
          this.isParentExist = true;
        }
      })
    }
  };

  changeDocumentNumberParent(event: any): void {
    this.isParentReadonly = false;
    const value: string = event.target.value;
    const documentType = this.formParent.value.documentType;

    this.formParent.reset();
    this.formParent.controls['documentNumber'].setValue(value);
    this.formParent.controls['documentType'].setValue(documentType);

    if(value && value.trim() !== "" && value.length === 8) {
      this.personService.findByDocumentNumber(value).subscribe((data) => {
        if(data.length > 0) {
        const dateValue = new Date(data[0]?.dateOfBirth); 
        this.isParentReadonly = true;
        this.formParent.controls['personId'].setValue(data[0]?.id);
        this.formParent.controls['firstName'].setValue(data[0]?.firstName);
        this.formParent.controls['middleName'].setValue(data[0]?.middleName);
        this.formParent.controls['maternalSurname'].setValue(data[0]?.maternalSurname);
        this.formParent.controls['paternalSurname'].setValue(data[0]?.paternalSurname);
        this.formParent.controls['phone'].setValue(data[0]?.phone);
        this.formParent.controls['email'].setValue(data[0]?.email);
        this.formParent.controls['address'].setValue(data[0]?.address);
        this.formParent.controls['dateOfBirth'].setValue(dateValue); }
      });
    }
  };

  changeDocumentType(event: DropdownChangeEvent): void {
    this.typeDocumentLength = event.value.length;
    this.formStudent.get('documentNumber')?.setValidators([
      Validators.required,
      NumberValidator(event.value.length)
    ]);    
    this.formStudent.get('documentNumber')?.updateValueAndValidity();
  }

  changeDocumentTypeParent(event: DropdownChangeEvent): void {
    this.typeDocumentLengthParent = event.value.length;
    this.formParent.get('documentNumber')?.setValidators([
      Validators.required,
      NumberValidator(event.value.length)
    ]);    
    this.formParent.get('documentNumber')?.updateValueAndValidity();
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

  @HostListener('document:keydown.enter', ['$event'])
  handleKeyboardEvent() {
    if(this.activeIndex === 1){
      this.validateStudent();
    } else {
    this.hasFormValid();
    }
  }

}
