import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CheckboxModule } from 'primeng/checkbox';
import { NgIconComponent } from '@ng-icons/core';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RolesMenusComponent } from './roles-menus/roles-menus.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from 'primeng/messages';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { RolesService } from './service/roles.service';
import { MenusService } from '../../system/menus/service/menus.service';
import { of } from 'rxjs';
import RolesComponent from './roles.component';

describe('RolesComponent', () => {
  let component: RolesComponent;
  let fixture: ComponentFixture<RolesComponent>;
  let rolesServiceMock: any;
  let menusServiceMock: any;

  beforeEach(waitForAsync(() => {
    rolesServiceMock = {
      findAll: jest.fn(() => of([])),
      create: jest.fn(() => of({})),
      update: jest.fn(() => of({})),
      updateIsActive: jest.fn(() => of({}))
    };

    menusServiceMock = {
      findAll: jest.fn(() => of([]))
    };

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        ToastModule,
        TableModule,
        ButtonModule,
        RippleModule,
        CheckboxModule,
        NgIconComponent,
        DialogModule,
        InputTextModule,
        InputSwitchModule,
        InputGroupAddonModule,
        InputGroupModule,
        InputTextareaModule,
        RolesMenusComponent,
        ProgressSpinnerModule,
        MessagesModule,
        ToolbarModule,
        DropdownModule
      ],
      declarations: [RolesComponent],
      providers: [
        { provide: RolesService, useValue: rolesServiceMock },
        { provide: MenusService, useValue: menusServiceMock },
        MessageService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize formRoles correctly', () => {
    component.initFormRoles();
    expect(component.formRoles.value.id).toBeTruthy();
    expect(component.formRoles.value.isActive).toBe(true);
    expect(component.formRoles.value.sort).toBe(0);
  });

  it('should call load method on init', () => {
    const loadSpy = jest.spyOn(component, 'load');
    component.ngOnInit();
    expect(loadSpy).toHaveBeenCalled();
  });

  it('should open new role form', () => {
    component.openNew();
    expect(component.isFormRoles).toBe(true);
    expect(component.isEdit).toBe(false);
  });

  it('should validate and create a new role', () => {
    component.formRoles.controls['code'].setValue('TestCode');
    component.formRoles.controls['name'].setValue('TestName');
    component.formRoles.controls['typePerson'].setValue('TestType');
    component.save();
    expect(rolesServiceMock.create).toHaveBeenCalled();
  });

  it('should validate and update a role', () => {
    component.isEdit = true;
    component.formRoles.controls['code'].setValue('TestCode');
    component.formRoles.controls['name'].setValue('TestName');
    component.formRoles.controls['typePerson'].setValue('TestType');
    component.save();
    expect(rolesServiceMock.update).toHaveBeenCalled();
  });
});