import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { 
  matBarChart, matFolder, matLayers
} from '@ng-icons/material-icons/baseline';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { markAllAsTouched } from '../../../shared/utils/reactive-form-utilities';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { DocumentsService } from './service/documents.service';
import { InputSwitchModule } from 'primeng/inputswitch';
@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ToolbarModule,
    ReactiveFormsModule,
    FormsModule,
    FormsModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputSwitchModule,
    TagModule,
    ProgressSpinnerModule,
    DialogModule,
    NgIconComponent,
    InputTextModule,
    InputNumberModule,
    CheckboxModule
  ],
  providers: [
    provideIcons({
      matBarChart,matLayers,matFolder
    }),
  ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss'
})
export default class DocumentsComponent implements OnInit{
  private readonly formBuilder = inject(FormBuilder);
  toastService = inject(MessageService);
  documentService = inject(DocumentsService);
  documentList: any[] = [];
  selectedDocument: any[] = [];

  isFormDocuments: boolean = false;
  isLoadingDocument: boolean = true;
  isLoadingButton: boolean = false;

  public formDocument: FormGroup = this.formBuilder.group({
    id: [''],
    name: ['', Validators.required],
    required: [false],
  });

  ngOnInit(): void {
    this.documentService.findAll().subscribe({
      next:(data) => {
        this.documentList = data;
        this.isLoadingDocument = false;
      },
      error:(data) => {
        this.isLoadingDocument = false;
      }
    })
  };

  openNew(): void {
    this.formDocument.reset();
    this.isFormDocuments = true;
  };

  save(): void {
    if (!this.formDocument.valid) {
      markAllAsTouched(this.formDocument)
      return;
    }
    this.create();
  };

  create(): void {
    this.isLoadingButton = true;
    this.documentService.create(this.formDocument
      .value).subscribe({
      next:(data) => {
        this.documentList = [...this.documentList, data];
        this.toastService.add({
          severity: 'success',
          life: 5000,
          summary: 'Documento creado',
          detail: 'El Documento se creo correctamente.',
        });
        this.isLoadingButton = false;
        this.isFormDocuments = false;
      },
      error:(err) => {
        this.isLoadingButton = false;
      },
    })
  }
  hasError(field: string, error: string): boolean | undefined {
    const control = this.formDocument.get(field);
    return control?.hasError(error) && (control.dirty || control.touched);
  };
}
