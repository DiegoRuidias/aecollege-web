import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { RevenuesService } from '../matricule/alumnos/service/revenues.service';
import { Revenue } from '../matricule/alumnos/model/revenues.model';
import { LabelHalfPipe } from '../../pipes/label.half.pipe';


@Component({
  selector: 'app-search-pays',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    TableModule,
    ButtonModule,
    ToolbarModule,
    ProgressSpinnerModule,
    CalendarModule,
    CheckboxModule,
    LabelHalfPipe
  ],
  templateUrl: './search-pays.component.html',
  styleUrl: './search-pays.component.scss'
})
export default class SearchPaysComponent implements OnInit {
  revenuesService = inject(RevenuesService)
  paysList: Revenue[] = [];
  selectedPays: Revenue[] = [];
  datePays:  Date = new Date();

  isEdit: boolean = false;
  isLoading: boolean = false;
  isAllPays: boolean = true;
  

  ngOnInit(): void {
    this.isLoading = true;
    this.load();

  }
  load(date?: string): void {
    this.revenuesService.findAll(date).subscribe({
      next:(data) => {
        this.paysList = data;
        this.isLoading = false;
      },
      error:(err) => {
        this.isLoading = false;
      },
    });
  }

  onSearch(): void {
    if(this.isAllPays){
      this.load();
    }else{
      this.load(this.formatDate(this.datePays));
    }
  }
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');  // Asegura que el día tenga dos dígitos
    const month = (date.getMonth() + 1).toString().padStart(2, '0');  // Asegura que el mes tenga dos dígitos
    const year = date.getFullYear();  // Obtiene el año de 4 dígitos
    return `${day}/${month}/${year}`;
  }

 }
