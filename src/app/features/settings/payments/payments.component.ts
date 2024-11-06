import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    InputSwitchModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    ProgressSpinnerModule,
    DropdownModule,
    ToolbarModule,
    TagModule,
    MonthPipe,
    CheckboxModule
  ],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export default class PaymentsComponent {
  toastService = inject(MessageService);
  paymentsService = inject(PaymentsService);
  paymentList: any[] = [];
  meses: any[] = [
    {id: 1 , month: "enero"},{id: 2 , month: "febrero"},{id: 2 , month: "febrero"},{id: 2 , month: "febrero"},{id: 2 , month: "febrero"}
  ]
  selectedPayment: any;

  isLoadingPayments: boolean = false;

  ngOnInit(): void {
    this.isLoadingPayments = true;
    this.paymentsService.findAll().subscribe({
      next:(data) => {
        this.paymentList = data;
        this.isLoadingPayments = false;
      },
      error:(err) => {
        this.isLoadingPayments = false;
      }
    })
  }

  openEdit(event: any, item: any): void {
    
  }
}
