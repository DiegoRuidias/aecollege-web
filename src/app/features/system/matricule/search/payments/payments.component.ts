import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { PaysComponent } from './pays/pays.component';
import { LabelChargePipe } from './pipes/label-charge.pipe';
import { StatePipe } from './pipes/state.pipe';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [
    CommonModule,
    TagModule,
    TableModule,
    PaysComponent,
    LabelChargePipe,
    StatePipe
  ],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent {
  @Input() charges: any[] = [];
  @Input() person: any[] = [];
  @Input() pays: any[] = [];
  @Input() fileEconomic: any[] = [];
  @Input() admin: boolean = false
  @Output() load = new EventEmitter<void>();
  historial: any[] = [];

  refreshPage(): void {
    this.load.emit();
  }
}
