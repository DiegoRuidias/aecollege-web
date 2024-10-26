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
import { PeriodsService } from './service/periods.service';
import { TagModule } from 'primeng/tag';
import { PeriodoTagPipe } from './pipes/periodo.tag.pipe';
import { TagSevetityPipe } from './pipes/tag.sevetity.pipe';
import { ToolbarModule } from 'primeng/toolbar';
@Component({
  selector: 'app-periods',
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
    TagModule,
    PeriodoTagPipe,
    TagSevetityPipe,
    ToolbarModule
  ],
  templateUrl: './periods.component.html',
  styleUrl: './periods.component.scss'
})
export default class PeriodsComponent implements OnInit {
  toastService = inject(MessageService);
  periodsService = inject(PeriodsService);
  periodList: any[] = [];
  selectedPeriod: any;

  isLoadingPeriods: boolean = false;

  ngOnInit(): void {
    this.isLoadingPeriods = true;
    this.periodsService.findAll().subscribe({
      next: (data) => {
        this.isLoadingPeriods = false;
        this.periodList = data;
      },
      error: (data) => {
        this.isLoadingPeriods = false;
      }
    });
      
  }

  openEdit(event: any, item: any): void {
    
  }

}
