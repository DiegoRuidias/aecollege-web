import { CommonModule, Location } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AvatarLabelPipe } from '../list/pipes/avatar-label.pipe';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { halfPayments } from '../alumnos/model/alumnos.model';

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [
    CommonModule,
    AvatarModule,
    AvatarGroupModule,
    AvatarLabelPipe,
    ToolbarModule,
    ButtonModule,
    RippleModule,
    CheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule
  ],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.scss'
})
export class PayComponent {
  location = inject(Location);
  total: number = 0.0;
  lastSelectedIndex: number = -1; 

  halfPayments = halfPayments;
  selectedCharges: any[] = [];
  charges: any[] = [
    {
      id:1,
      code: 'PAGO20241',
      charge: 'MATRICULA',
      amount: 135,
      expiry: '12-11-1999'
    },
    {
      id:2,
      charge: 'PENSIÓN - MARZO',
      code: 'PAGO20242',
      amount: 135,
      expiry: '12-11-1999'
    },
    {
      id:3,
      charge: 'PENSIÓN - ABRIL',
      code: 'PAGO20242',
      amount: 135,
      expiry: '12-11-1999'
    }
  ]
  onPay(): void{
    console.log(this.selectedCharges)
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
          ? this.charges.findIndex(c => c === this.selectedCharges[this.selectedCharges.length - 1])
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
