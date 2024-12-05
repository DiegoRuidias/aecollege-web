import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { RolesService } from '../../security/roles/service/roles.service';
import { PeriodsService } from '../periods/service/periods.service';
import { forkJoin } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { markAllAsTouched } from '../../../shared/utils/reactive-form-utilities';
import { Settings } from '../../../shared/layout/api/settings.model';
import { SettingsService } from '../../../shared/layout/service/settings.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    RippleModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export default class SettingsComponent implements OnInit{
  private readonly formBuilder = inject(FormBuilder);
  settingsService = inject(SettingsService);
  rolesService = inject(RolesService);
  periodService = inject(PeriodsService);
  toastService = inject(MessageService);

  periodList: any[] = [];
  studentRoleList: any[] = [];
  employeeRoleList: any[] = [];

  settings: Settings = {
    id:0,
    periodId:'',
    studentRole:'',
    employeeRole:''
  }

  isLoadingButton: boolean = false

  public formSettings: FormGroup = this.formBuilder.group({
    id: [''],
    periodId: [this.settings?.periodId, Validators.required],
    studentRole: [this.settings?.studentRole,Validators.required],
    employeeRole:[this.settings?.studentRole,Validators.required]
  });

  ngOnInit(): void {
    this.load();
    const requestPeriod = this.periodService.findAll(); 
    const requestRoles = this.rolesService.findAll()
    forkJoin([requestPeriod,requestRoles]).subscribe({
      next:([period,roles]) => {
        this.studentRoleList = roles.filter(d => d.typePerson === 1);
        this.employeeRoleList = roles.filter(d => d.typePerson === 2);
        this.periodList = period;
      }
    });
      this.rolesService.findAll().subscribe({
        next:(data) => {
          this.studentRoleList = data.filter(d => d.typePerson === 1);
        }
      });
  }

  load(){
    this.settings = this.settingsService.getSettings();
    this.formSettings.get('studentRole')?.setValue(this.settings.studentRole);
    this.formSettings.get('periodId')?.setValue(this.settings.periodId);
    this.formSettings.get('employeeRole')?.setValue(this.settings.employeeRole);
  }

  save(){
    if (!this.formSettings.valid) {
      markAllAsTouched(this.formSettings);
      return;
    }
    this.isLoadingButton = true;
    this.settingsService.create(this.formSettings.value).subscribe({
      next: (data) => {
        this.isLoadingButton = false;
        this.settings = data;
        this.formSettings.get('studentRole')?.setValue(this.settings.studentRole);
        this.formSettings.get('periodId')?.setValue(this.settings.periodId);
        this.formSettings.get('employeeRole')?.setValue(this.settings.employeeRole);
        this.toastService.add({ severity: 'success', life: 5000, summary: 'Ajustes correctos', detail: 'Los ajustes se guardaron correctamente.' });
      },
      error: (data) => {
        this.isLoadingButton = false;
      }
    })


  }

  hasError(field: string, error: string): boolean | undefined {
    const control = this.formSettings.get(field);
    return control?.hasError(error) && (control.dirty || control.touched);
  }

}
