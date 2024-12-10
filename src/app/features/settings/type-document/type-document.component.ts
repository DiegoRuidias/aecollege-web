import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { TypeDocumentService } from './service/type-document.service';
import { DialogModule } from 'primeng/dialog';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { 
  mat123,
  matBarChart, matLayers
} from '@ng-icons/material-icons/baseline';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { markAllAsTouched } from '../../../shared/utils/reactive-form-utilities';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-type-document',
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
    TagModule,
    ProgressSpinnerModule,
    DialogModule,
    NgIconComponent,
    InputTextModule,
    InputNumberModule,
    TooltipModule
  ],
  providers: [
    provideIcons({
      matBarChart,matLayers,mat123
    }),
  ],
  templateUrl: './type-document.component.html',
  styleUrl: './type-document.component.scss'
})
export default class TypeDocumentComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  toastService = inject(MessageService);
  typeDocumentService = inject(TypeDocumentService);
  confirmationService = inject(ConfirmationService);
  typeDocumentList: any[] = [];
  selectedDocumentList: any[] = [];

  isFormTypeDocument: boolean = false;
  isLoadingDocument: boolean = true;
  isLoadingButton: boolean = false;

  public formTypeDocument: FormGroup = this.formBuilder.group({
    id: [''],
    name: ['', Validators.required],
    length: ['', Validators.required],
  });

  ngOnInit(): void {
    this.typeDocumentService.findAll().subscribe({
      next:(data) => {
        this.typeDocumentList = data;
        this.isLoadingDocument = false;
        console.log(this.typeDocumentList)
      },
      error:(data) => {
        this.isLoadingDocument = false;
      }
    })
  };

  openNew(): void {
    this.formTypeDocument.reset();
    this.isFormTypeDocument = true;
  };

  openDelete(event: MouseEvent, item: any): void {
    this.selectedDocumentList = [item];
    this.confirmationService.confirm({
      message: '¿ Desea eliminar el tipo de documento ?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.updateDelete()
    });
    event.stopImmediatePropagation();
  }

  save(): void {
    if (!this.formTypeDocument.valid) {
      markAllAsTouched(this.formTypeDocument)
      return;
    }
    this.create();
  };

  create(): void {
    this.isLoadingButton = true;
    this.typeDocumentService.create(this.formTypeDocument.value).subscribe({
      next:(data) => {
        this.typeDocumentList = [...this.typeDocumentList, data];
        this.toastService.add({
          severity: 'success',
          life: 5000,
          summary: 'Tipo de Documento creado',
          detail: 'El Tipo de DOcumento se creo correctamente.',
        });
        this.isLoadingButton = false;
        this.isFormTypeDocument = false;
      },
      error:(err) => {
        this.isLoadingButton = false;
      },
    })
  }

  updateDelete(): void {
    this.typeDocumentService.deleted(this.selectedDocumentList[0].id).subscribe(data =>{
      this.toastService.add({ severity: 'success', life: 5000, summary: 'Documento Eliminado', detail: 'El documento se eliminó correctamente.' }); 
      this.typeDocumentList = this.typeDocumentList.filter(r => r.id !== this.selectedDocumentList[0]?.id);
    })
  }

  hasError(field: string, error: string): boolean | undefined {
    const control = this.formTypeDocument.get(field);
    return control?.hasError(error) && (control.dirty || control.touched);
  };
}
