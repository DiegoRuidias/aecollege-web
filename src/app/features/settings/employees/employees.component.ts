import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { EmailValidator } from '../../system/matricule/alumnos/validators/email.validator';
import { PhoneValidator } from '../../system/matricule/alumnos/validators/phone.validator';
import { DialogModule } from 'primeng/dialog';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { 
  matBadge, matDescription,matSchool,matArticle,matFactCheck,matPerson,matPhoneAndroid,matEmail,matAccountBox,
  matCreditCard,matAddLocationAlt,
  matPersonAddAlt1,
  matNewspaper
} from '@ng-icons/material-icons/baseline'
import { CalendarModule } from 'primeng/calendar';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { NumberValidator } from '../../system/matricule/alumnos/validators/number.validator';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { forkJoin } from 'rxjs';
import { TypeDocumentService } from '../type-document/service/type-document.service';
import { EmployeesService } from './services/employees.service';
import { markAllAsTouched } from '../../../shared/utils/reactive-form-utilities';
import { Settings } from '../../../shared/layout/api/settings.model';
import { SettingsService } from '../../../shared/layout/service/settings.service';
import { InputSwitchModule } from 'primeng/inputswitch';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    CheckboxModule,
    ToolbarModule,
    InputGroupAddonModule,
    InputGroupModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    NgIconComponent,
    CalendarModule,
    DropdownModule,
    InputSwitchModule
  ],
  providers: [
    provideIcons({
      matAccountBox, matBadge, matDescription,matSchool,matArticle,matFactCheck,matPerson,
      matPhoneAndroid,matEmail,matCreditCard,matAddLocationAlt, matPersonAddAlt1,matNewspaper
    })
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export default class EmployeesComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  toastService = inject(MessageService);
  typeDocumentService = inject(TypeDocumentService);
  settingsService = inject(SettingsService);
  employeesService = inject(EmployeesService);

  employeesList: any[] = [];
  selectedEmployees: any[] = [];
  typeDocumentList: any[] = [];
  typeDocumentLength: number = 8;

  isLoading: boolean = false;
  isLoadingButton: boolean = false;
  isEdit: boolean = false;
  isViewEmployees: boolean = false;

  settings: Settings = {
    id:0,
    periodId:'',
    studentRole:'',
    employeeRole:''
  }

  public formEmployees: FormGroup = this.formBuilder.group({
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

  changeDocument(event: DropdownChangeEvent): void {
    this.typeDocumentLength = event.value.length;
    this.formEmployees.get('documentNumber')?.setValidators([
      Validators.required,
      NumberValidator(event.value.length)
    ]);    
    this.formEmployees.get('documentNumber')?.updateValueAndValidity();
  }
  
  ngOnInit(): void {
    this.settings = this.settingsService.getSettings();
    this.load();
  }

  load(): void {
    const requestTypeDocument = this.typeDocumentService.findAll();
    const requestEmployees = this.employeesService.findAll();
    this.isLoading = true;
    forkJoin([requestTypeDocument,requestEmployees]).subscribe({
      next:([typeDocument,employees]) => {
          this.employeesList = employees;
          this.typeDocumentList = typeDocument;
          this.isLoading = false;
      },
      error:(err) => {
          this.isLoading = false;
      },
    })
  }

  openView(event: any, item: any): void {

  }

  openEdit(event: any, item: any): void {

  }

  openNew(): void {
    this.formEmployees.reset()
    this.isEdit = false;
    this.isViewEmployees = true;
  }


  save(){
    if (!this.formEmployees.valid) {
      markAllAsTouched(this.formEmployees)
      return;
    }
    if (this.isEdit)
        this.update();
    else
        this.create();
  }

  create(): void {
    const name = this.buildFullName(
      this.formEmployees.value.firstName,
      this.formEmployees.value.middleName,
      this.formEmployees.value.paternalSurname,
      this.formEmployees.value.maternalSurname

    );
    this.formEmployees.get('name')?.setValue(name);
    let request = {
      person: this.formEmployees.value,
      roleId: this.settings.employeeRole,
      periodId: this.settings.periodId
    }
    this.isLoadingButton = true;
    this.employeesService.create(request).subscribe({
      next:(value)=> {
        this.employeesList = [...this.employeesList, value];
        this.isViewEmployees = false;
        this.isLoadingButton = false;
        this.toastService.add({ severity: 'success', life: 5000, summary: 'Rol Creado', detail: 'El Rol se creó correctamente.' });
      },
      error:(err) => {
        this.isLoadingButton = false;
      },
    });
  }

  private buildFullName(firstName: string, middleName: string, maternalSurname: string, paternalSurname: string): string {
    return [firstName, middleName, maternalSurname, paternalSurname]
      .filter(name => name && name.trim() !== '')
      .join(' '); 
  }

  update(): void {

  }

  hasError(field: string, error: string): boolean | undefined {
    const control = this.formEmployees.get(field);
    return control?.hasError(error) && (control.dirty || control.touched);
  };
}
