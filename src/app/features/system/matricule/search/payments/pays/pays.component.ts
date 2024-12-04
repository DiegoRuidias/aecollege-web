import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { halfPayments } from '../../../alumnos/model/alumnos.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RevenuesService } from '../../../alumnos/service/revenues.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-pays',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CheckboxModule,
    DropdownModule
  ],
  templateUrl: './pays.component.html',
  styleUrl: './pays.component.scss'
})
export class PaysComponent {
  @Input() person: any;
  @Input() pays: any[] = [];
  @Input() fileEconomic: any;
  @Output() load = new EventEmitter<void>();
  router = inject(Router);
  revenuesService = inject(RevenuesService);
  toastService = inject(MessageService);

  halfPayments = halfPayments;
  selectedCharges: any[] = [];
  selectedHalfPayment: number = 3;
  total: number = 0.0;
  lastSelectedIndex: number = -1;

  isLoading = false;
  isPaysVisible = false;
  isHalfPaymentSelected = false;
 

  refreshPage(): void {
    this.load.emit();
  }
  
  viewComponent(): void {
    this.lastSelectedIndex = -1;
    this.selectedHalfPayment = 3;
    this.selectedCharges = [];
    this.isHalfPaymentSelected = false;
    this.isPaysVisible = true;
  }

  onPay(): void {
    this.isLoading = true;
    if(this.selectedHalfPayment === -1 ){
      this.isHalfPaymentSelected = true;
      this.isLoading = false;
      return;
    }

    if(this.selectedCharges.length === 0){
      this.toastService.add({
        severity: 'error',
        life: 5000,
        summary: 'No hay cargos',
        detail: 'Debe seleccionar al menos un cargo.',
      });
      this.isLoading = false;
      return;
    }
    
    const request = {
      charges: this.selectedCharges,
      halfPayment: this.selectedHalfPayment,
      userId: 1,
      fileEconomicId: this.fileEconomic?.id
    }
    this.revenuesService.create(request).subscribe({
      next: (data) =>{
        this.toastService.add({
          severity: 'success',
          life: 5000,
          summary: 'Pago realizado',
          detail: 'El Pago se realizó correctamente.',
        });
        this.refreshPage();
        this.isLoading = false;
        this.isPaysVisible = false;
      },
      error:(err) => {
          this.isLoading = false;
      },
    })

  }

  onChangePay(charge: any, index: number): void {
    if (this.selectedCharges.length === 0) {
      this.lastSelectedIndex = -1;
    }

    if (this.selectedCharges.indexOf(charge) === -1) {
      if (index === 0) {
        this.lastSelectedIndex = -1;
      } else {
        this.lastSelectedIndex = this.selectedCharges.length > 0
          ? this.pays.findIndex(c => c === this.selectedCharges[this.selectedCharges.length - 1])
          : -1;
      }
    } else {
      if (index === this.lastSelectedIndex + 1) {
        this.lastSelectedIndex = index;
      }
    }
    this.total = this.selectedCharges.reduce((accum, cargo) => {
      return cargo.amount ? accum + cargo.amount : accum;
    }, 0);
  }

  isSelectable(index: number): boolean {
    if (this.selectedCharges.length === 0) {
      return index === 0;
    }
    return index <= this.lastSelectedIndex + 1;
  }
}
