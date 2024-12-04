import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { LayoutService } from '../../layout/service/app.layout.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { SettingsService } from '../../layout/service/settings.service';
import { MenuService } from '../../layout/service/app.menu.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { expiredSessionMessage, noLogout } from '../model/jwtToken.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    ProgressSpinnerModule,
    ToastModule,
    MessagesModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent implements OnInit{
  layoutService = inject(LayoutService);
  loginService = inject(LoginService);
  settingsService = inject(SettingsService);
  menuService = inject(MenuService);
  toastService = inject(MessageService);
  router = inject(Router);

  
  private readonly formBuilder = inject(FormBuilder);
  isLoading: boolean = false;
  public formAuth: FormGroup = this.formBuilder.group({
    username: [''],
    password: ['']
  });

  ngOnInit(): void {
    this.loginService.logout();
    this.layoutService.themeLigth();
    this.menuService.clearMenus();
  }

  async login(): Promise<void> {
    this.loginService.logout();
    this.isLoading = true;
    try {
      const loginData = await firstValueFrom(this.loginService.login(this.formAuth.value));

      this.loginService.saveToken(loginData.token);

      this.menuService.loadMenus(this.loginService.getRole());

      const settingsSuccess = await this.settingsService.fetchAndSaveSettings();
      
      if (!settingsSuccess) {
        this.isLoading = false;
        return;
      }
      
      this.router.navigate(['/home']);
      this.isLoading = false;
      
    } catch (error) {
      this.isLoading = false;
      console.error('Error during login or settings fetch', error);
    }
  }

}
