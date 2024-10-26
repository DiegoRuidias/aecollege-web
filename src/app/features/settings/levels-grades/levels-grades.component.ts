import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { LevelsService } from './service/levels.service';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ToolbarModule } from 'primeng/toolbar';
import { 
  matBarChart, matLayers
} from '@ng-icons/material-icons/baseline';
import { GradeService } from './service/grade.service';
import { Levels } from './model/levels.model';
import { Grade } from './model/grade.model';

@Component({
  selector: 'app-levels-grades',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    InputSwitchModule,
    InputTextModule,
    InputGroupAddonModule,
    InputGroupModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    DialogModule,
    ProgressSpinnerModule,
    NgIconComponent,
    ToolbarModule
  ],
  providers: [
    provideIcons({
      matBarChart,
      matLayers,
    }),
  ],
  templateUrl: './levels-grades.component.html',
  styleUrl: './levels-grades.component.scss',
})
export default class LevelsGradesComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  toastService = inject(MessageService);
  levelsService = inject(LevelsService);
  gradesService = inject(GradeService);
  levelList: Levels[] = [];
  gradeList: Grade[] = [];
  selectedLevel: any;
  selectedGrade: any;

  isEdit: boolean = false;
  isFormLevels: boolean = false;
  isFormGrade: boolean = false;
  isLoadingGrade: boolean = false;
  isLoadingLevel: boolean = false;
  isLoadingButton: boolean = false;

  public formLevels: FormGroup = this.formBuilder.group({
    id: [''],
    name: ['', Validators.required],
    createdAt: [''],
  });

  public formGrade: FormGroup = this.formBuilder.group({
    id: [''],
    name: ['', Validators.required],
    levelId: [''],
    createdAt: [''],
  });

  ngOnInit(): void {
    this.isLoadingLevel = true;
    this.levelsService.findAll().subscribe({
      next: (data) => {
        this.levelList = data;
        this.isLoadingLevel = false;
      },
      error: (data) => {
        this.isLoadingLevel = false;
      },
    });
  }

  openNew(): void {
    this.formLevels.reset();
    this.isEdit = false;
    this.isFormLevels = true;
  }

  openEdit(event: any, item: any): void {
    this.formLevels.reset();
    event.stopPropagation();
    event.preventDefault();

    this.selectedLevel = [item];
    this.formLevels.controls['id'].setValue(item.id);
    this.formLevels.controls['name'].setValue(item.name);
    this.formLevels.controls['createdAt'].setValue(item.createdAt);
    this.isEdit = true;
    this.isFormLevels = true;
  }

  save(): void {
    this.isLoadingButton = true;
    if (this.isEdit) {
      this.update();
    } else {
      this.create();
    }
  }

  create(): void {
    this.levelsService.create(this.formLevels.value).subscribe({
      next: (data) => {
        this.levelList = [...this.levelList, data];
        this.isLoadingButton = false;
        this.toastService.add({
          severity: 'success',
          life: 5000,
          summary: 'Nivel Creado',
          detail: 'El Nivel se creo correctamente.',
        });
        this.selectedLevel = undefined;
        this.isLoadingButton = false;
        this.isFormLevels = false;
      },
      error: (err) => {
        this.isLoadingButton = false;
      },
    });
  }

  update(): void {
    this.levelsService.update(this.formLevels.value).subscribe({
      next: (data) => {
        this.levelList.forEach((item, index) => {
          if (item.id === data.id) {
            this.levelList[index] = data;
          }
        });
        this.toastService.add({
          severity: 'success',
          life: 5000,
          summary: 'Nivel Editado',
          detail: 'El Nivel se edito correctamente.',
        });
        this.selectedLevel = undefined;
        this.isLoadingButton = false;
        this.isFormLevels = false;
      },
      error: (err) => {
        this.isLoadingButton = false;
      },
    });
  }

  openNewGrade(): void {
    this.formGrade.reset();
    this.isEdit = false;
    this.isFormGrade = true;
    this.formGrade.controls['levelId'].setValue(this.selectedLevel?.id);
  }

  openEditGrade(event: any, item: any): void {
    this.formGrade.reset();
    event.stopPropagation();
    event.preventDefault();

    this.selectedGrade = [item];
    this.formGrade.controls['name'].setValue(item.name);
    this.formGrade.controls['id'].setValue(item.id);
    this.formGrade.controls['levelId'].setValue(this.selectedLevel?.id);
    this.formGrade.controls['createdAt'].setValue(item.createdAt);
    this.isEdit = true;
    this.isFormGrade = true;
  }
  saveGrade(): void {
    this.isLoadingButton = true;
    if (this.isEdit) {
      this.updateGrade();
    } else {
      this.createGrade();
    }
  }

  createGrade(): void {
    this.gradesService.create(this.formGrade.value).subscribe({
      next: (data) => {
        this.levelList.forEach((item, index) => {
          if (item.id === this.formGrade.value.levelId) {
            this.levelList[index].grades = [
              ...this.levelList[index].grades,
              data,
            ];
          }
        });
        this.toastService.add({
          severity: 'success',
          life: 5000,
          summary: 'Grado Creado',
          detail: 'El Grado se creo correctamente.',
        });
        this.isLoadingButton = false;
        this.isFormGrade = false;
      },
      error: (err) => {
        this.isLoadingButton = false;
      },
    });
  }

  updateGrade(): void {
    this.gradesService.update(this.formGrade.value).subscribe({
      next: (data) => {
        this.levelList.forEach((item, index) => {
          if (item.id === this.formGrade.value.levelId) {
            const gradeIndex = this.levelList[index].grades.findIndex(
              (g) => g.id === data.id
            );
            if (gradeIndex !== -1) {
              this.levelList[index].grades[gradeIndex] = data;
            }
          }
        });
        this.toastService.add({
          severity: 'success',
          life: 5000,
          summary: 'Nivel Editado',
          detail: 'El Nivel se edito correctamente.',
        });
        this.isLoadingButton = false;
        this.isFormGrade = false;
      },
      error: (err) => {
        this.isLoadingButton = false;
      },
    });
  }

  @HostListener('document:keydown.enter', ['$event'])
  handleKeyboardEvent() {
    if (this.isFormGrade) {
      this.saveGrade();
    } else if (this.isFormLevels) {
      this.save();
    }
  }
}
