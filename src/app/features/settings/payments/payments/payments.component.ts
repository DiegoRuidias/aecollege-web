import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { PaymentsService } from './service/payments.service';
import { MonthPipe } from './pipes/month.pipe';
import { TagModule } from 'primeng/tag';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { markAllAsTouched } from '../../../shared/utils/reactive-form-utilities';
import { matAttachMoney, matBadge, matCalendarMonth, matDescription, matToday, matVpnKey } from '@ng-icons/material-icons/baseline';
import { typePayment } from './model/payments.model';
import { PeriodsService } from '../periods/service/periods.service';
@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ReactiveFormsModule,
    InputSwitchModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    InputGroupAddonModule,
    InputGroupModule,
    ProgressSpinnerModule,
    DialogModule,
    DropdownModule,
    ToolbarModule,
    TagModule,
    MonthPipe,
    CheckboxModule,
    NgIconComponent
  ],
  providers: [
    provideIcons({
      matVpnKey, matBadge, matDescription, matCalendarMonth, matAttachMoney,matToday
    })
  ],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export default class PaymentsComponent {
  private readonly formBuilder = inject(FormBuilder);
  toastService = inject(MessageService);
  periodsService = inject(PeriodsService);
  paymentsService = inject(PaymentsService);
  paymentList: any[] = [];
  paymentListC: any[] = [];
  meses: any[] = [
    {id: 1 , month: "enero".toUpperCase()},
    {id: 2 , month: "febrero".toUpperCase()},
    {id: 3 , month: "marzo".toUpperCase()},
    {id: 4 , month: "abril".toUpperCase()},
    {id: 5 , month: "mayo".toUpperCase()},
    {id: 6 , month: "junio".toUpperCase()},
    {id: 7 , month: "julio".toUpperCase()},
    {id: 8 , month: "agosto".toUpperCase()},
    {id: 9, month: "septiembre".toUpperCase()},
    {id: 10, month: "octubre".toUpperCase()},
    {id: 11, month: "noviembre".toUpperCase()},
    {id: 12, month: "diciembre".toUpperCase()}
];

  selectedPeriod: any;
  selectedPayment: any;
  selectedPayments: any[] = [];
  isViewPayment: boolean = false;
  isLoadingPayments: boolean = false;
  typeList = typePayment;
  periodList: any[] = [];
  isSwitchDisabled: boolean = false;
  isLoadingButton: boolean = false; 
  isFormPayments: boolean = false;
  isEdit: boolean = false;
  
  public formPayments: FormGroup = this.formBuilder.group({
    id: [''],
    name: ['', Validators.required],
    day: [0, Validators.required],
    amount: [0.0, Validators.required],
    type: ['', Validators.required],
    isUnique: [false],
    monthStart: [0, Validators.required],
    monthEnd: [0, Validators.required],
    periodId: [undefined, Validators.required],
  },
  {
    validators: this.compareMonth
  }
  )


  ngOnInit(): void {
    this.isLoadingPayments = true;
    this.paymentsService.findAll().subscribe({
      next:(data) => {
        this.paymentListC = data;
        this.paymentList = [...this.paymentListC];
        this.isLoadingPayments = false;
        this.paymentsService.findData().subscribe(data1 =>{
          this.periodList = data1;
        });
        
      },
      error:(err) => {
        this.isLoadingPayments = false;
      }
    })
  }

  filterByPeriod(event: any): void {
    this.paymentList = [...this.paymentListC];
    this.selectedPeriod = event.value;
    this.applyFilter(); 
  }

  applyFilter(): void{
    if(this.selectedPeriod){
      this.paymentList = this.paymentList.filter(value => value.period.id === this.selectedPeriod);
    }
  }
  

  initFormPayments(): void {
    this.formPayments.reset();
    this.isSwitchDisabled = false;
    // this.formUsers.controls['id'].setValue(uuidv4());
    // this.formPayments.controls['isActive'].setValue(true);
  }

  openNew(): void {
    this.initFormPayments();
    this.isEdit = false;
    this.isFormPayments = true;
  }

  openView(event: MouseEvent, item: any): void {
    this.isLoadingButton = false;
    event.stopPropagation();
    event.preventDefault();
    
    this.selectedPayments = [item]
    this.isViewPayment = true;
  }

  openEdit( event: MouseEvent, item: any ): void {
    this.formPayments.reset();
    event.stopPropagation();
    event.preventDefault();
    this.isSwitchDisabled = false;
    this.selectedPayments = [item];
 
    this.formPayments.controls['id'].setValue(item.id);
    this.formPayments.controls['name'].setValue(item.name);
    this.formPayments.controls['day'].setValue(item.day);
    this.formPayments.controls['type'].setValue(item.type);
    if(item.type === 0){
      this.isSwitchDisabled = true;
    }else{
      this.isSwitchDisabled = false;
    }
    this.formPayments.controls['isUnique'].setValue(item.isUnique);
    this.formPayments.controls['monthStart'].setValue(item.monthStart);
    this.formPayments.controls['monthEnd'].setValue(item.monthEnd);
    this.formPayments.controls['amount'].setValue(item.amount);
    this.formPayments.controls['periodId'].setValue(item.period.id);
    this.isEdit = true;
    this.isFormPayments = true;
    

  }


  save(): void {
    if (!this.formPayments.valid) {
      markAllAsTouched(this.formPayments)
      return;
    }
    this.isLoadingButton = true;
    if (this.isEdit){
        this.update();
    }
    else{
        this.create();
    }
  }
  
  update(): void{
    this.paymentsService.update(this.formPayments.value).subscribe({
      next:(data) => {
      this.paymentList.forEach((item, index) => {
        if (item.id === data.id) {
          this.paymentList[index] = data;
        }
      });
      this.toastService.add({ severity: 'success', life: 5000, summary: 'Pago Editado', detail: 'El pago se editó correctamente.' });
      this.selectedPayment = undefined;
      this.isLoadingButton = false;
      this.isFormPayments = false;
      },
      error:(err) => {
        this.isLoadingButton = false;  
      },
    });
  }

  create(): void {
    this.isLoadingButton = true;
    this.paymentsService.create(this.formPayments.value).subscribe({
      next:(data) => {
        this.paymentList = [...this.paymentList, data];
        this.toastService.add({ severity: 'success', life: 5000, summary: 'Pago Creado', detail: 'Pago registrado correctamente.' });
        this.isLoadingButton = false;
        this.isFormPayments = false;
      },
      error:(err) => {
        this.isLoadingButton = false;
      },
    })};

    onlyNumbersDay(event: any){
      const input = event.target as HTMLInputElement;
      let value = input.value;
      value = value.replace(/[^0-9]/g, '');

      if (parseInt(value, 10) < 1 || parseInt(value, 10) > 27) {
        input.value = '';
      } else {
        input.value = value;
      }
    }

    compareMonth(form: FormGroup){
      const monthStart = form.get('monthStart')?.value;
      const monthEnd = form.get('monthEnd')?.value;
      if (monthStart && monthEnd && monthStart > monthEnd) {
        return { monthGreaterThanEnd: true };
      }
      return null;
    }

    onlyNumbers(event: any){
      const input = event.target as HTMLInputElement;
      let value = input.value;

      if (/[^0-9.]/.test(value)) {
        input.value = value.replace(/[^0-9]/g, '');
      }
    }

    onTypeChange(event: any){
      if(event.value === 0){
        this.isSwitchDisabled = true;
        this.formPayments.controls['isUnique'].setValue(true);
      }else{
        this.isSwitchDisabled = false;
      }
    }

    hasError(field: string, error: string): boolean | undefined {
      const control = this.formPayments.get(field);
      return control?.hasError(error) && (control.dirty || control.touched);
    }

    @HostListener('document:keydown.enter', ['$event'])
    handleKeyboardEvent() {
      if (this.isFormPayments) {
        this.save();
      }
    }




}
