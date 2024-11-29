import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RippleModule } from 'primeng/ripple';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { PeriodsService } from './service/periods.service';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { PeriodoTagPipe } from './pipes/periodo.tag.pipe';
import { TagSevetityPipe } from './pipes/tag.sevetity.pipe';
import { ToolbarModule } from 'primeng/toolbar';
import { v4 as uuidv4 } from 'uuid';
import { markAllAsTouched } from '../../../shared/utils/reactive-form-utilities';

import { NgIconComponent, provideIcons} from '@ng-icons/core';
import { 
  matVpnKey, matBadge, matDescription,
  matSchool,
  matWorkHistory
} from '@ng-icons/material-icons/baseline'
import { DateValidator } from './validators/date.validator';

@Component({
  selector: 'app-periods',
  standalone: true,
  imports: [
    CommonModule,
    CalendarModule,
    TableModule,
    DialogModule,
    DropdownModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputSwitchModule,
    NgIconComponent,
    FormsModule,
    FloatLabelModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    ProgressSpinnerModule,
    TagModule,
    PeriodoTagPipe,
    TagSevetityPipe,
    ToolbarModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    InputSwitchModule,
    ProgressSpinnerModule,
    TagModule,
    ToolbarModule
  ],
  providers: [
    provideIcons({
      matVpnKey, matBadge, matDescription,matSchool, matWorkHistory
    })
  ],
  templateUrl: './periods.component.html',
  styleUrl: './periods.component.scss'
})

export default class PeriodsComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  periodsService = inject(PeriodsService);
  toastService = inject(MessageService);

  selectedPeriod: any[] = [];
  periodList: any[] = [];
 
  stateOptions = [
    { label: 'Terminado', value: 0 },
    { label: 'En curso', value: 1 },
    { label: 'Próximo', value: 2 }
  ];

  isEdit: boolean = false;
  isFormPeriods: boolean = false;
  isLoadingPeriods: boolean = false;
  isViewPeriods: boolean = false;
  isLoadingButton: boolean = false;


  public formPeriods: FormGroup = this.formBuilder.group({
    id: [''],
    name: ['', Validators.required],
    yearStart: ['', Validators.required], 
    yearEnd: ['', Validators.required],    
    state: [0], 
    createdAt: [''],
  },{ validators: DateValidator() } );

  initFormPeriods(): void {
    this.formPeriods.reset();
    this.formPeriods.controls['id'].setValue(uuidv4());
    this.formPeriods.controls['state'].setValue(0);
  }

  ngOnInit(): void {
    this.isLoadingPeriods = true;
    this.periodsService.findAll().subscribe({
      next: (data) => {
        this.periodList = data;
        this.isLoadingPeriods = false;
      },
      error: (data) => {
        this.isLoadingPeriods = false;
      }
    });  
  }

  openNew(): void {
    this.initFormPeriods();
    this.isEdit = false;
    this.isFormPeriods = true;
  }

  openEdit( event: MouseEvent, item: any ): void {
    this.isLoadingButton = false;
    this.formPeriods.reset();
    event.stopPropagation();
    event.preventDefault();

    this.selectedPeriod = [item]

    this.formPeriods.controls['id'].setValue(item.id);
    this.formPeriods.controls['state'].setValue(item.state);
    this.formPeriods.controls['yearStart'].setValue(new Date(item.yearStart));
    this.formPeriods.controls['name'].setValue(item.name);
    this.formPeriods.controls['yearEnd'].setValue(new Date(item.yearEnd)); 
    this.formPeriods.controls['createdAt'].setValue(item.createdAt);

    this.isEdit = true;
    this.isFormPeriods = true;
  }

  openView(event: MouseEvent, item: any): void {
    this.isLoadingButton = false;
    event.stopPropagation();
    event.preventDefault();
  
    this.selectedPeriod = [item]
    this.isViewPeriods = true;
  }

  save(): void {
    if (!this.formPeriods.valid) {
      markAllAsTouched(this.formPeriods);
      return;
    }
  
    const isStateInProgress = this.formPeriods.value.state === 1;
    const currentPeriodId = this.formPeriods.value.id;
  
    if (isStateInProgress && this.hasCurrentPeriod(this.isEdit ? currentPeriodId : null)) {
      this.toastService.add({
        severity: 'warn',
        life: 5000,
        summary: 'Periodo duplicado',
        detail: 'Solo puede haber un período en curso a la vez.',
      });
      return;
    }
  
    this.isEdit ? this.update() : this.create();
  }
  
  create(): void {
    this.isLoadingButton = true;
    this.periodsService.create(this.formPeriods.value).subscribe({
      next:(data) => {
        this.periodList = [...this.periodList, data];
        this.toastService.add({ severity: 'success', life: 5000, summary: 'Periodo Creado', detail: 'El Periodo se creó correctamente.' });
        this.isLoadingButton = false;
        this.isFormPeriods = false;
      },
      error:(err) => {
        this.isLoadingButton = false;
      },
    });
}

  update(): void{
    this.isLoadingButton = true;
    this.periodsService.update(this.formPeriods.value).subscribe({
      next:(data) => {
      this.periodList.forEach((item, index) => {
        if (item.id === data.id) {
          this.periodList[index] = data;
        }
      });
      this.toastService.add({ severity: 'success', life: 5000, summary: 'Periodo Editado', detail: 'El periodo se editó correctamente.' });
      this.isLoadingButton = false;
      this.isFormPeriods = false;
      },
      error:(err) => {
        this.isLoadingButton = false;  
      },
    });
}

  hasError(field: string, error: string): boolean | undefined {
    const control = this.formPeriods.get(field);
    return control?.hasError(error) && (control.dirty || control.touched);
  }

  private hasCurrentPeriod(excludeId: string | null = null): boolean {
    return this.periodList.some(period => 
      period.state === 1 && period.id !== excludeId
    );
  }
}