import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../services/app.service';
import { Observable } from 'rxjs';
import { JwtToken } from '../model/jwtToken.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends AppService {
  router = inject(Router);

  login(data: any):Observable<JwtToken> {
    return this.http.post<JwtToken>(`${this.baseUrl}/v1/auth/login`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRole(): number{
    const token = this.getToken();
    if (!token) return 6;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || 6;  
  }

  getName(): string{
    const token = this.getToken();
    if (!token) return 'INVITADO';

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.name || 'INVITADO';  
  }


  getUser(): string {
    const token = this.getToken();
    if (!token) return '';

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub || '';  
  }

  getUserId(): number{
    const token = this.getToken();
    if (!token) return 1;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.userId || 1;  
  }

  isAuthenticated(): boolean {
  const token = this.getToken();
  if (!token) return false;


  const payload = JSON.parse(atob(token.split('.')[1]));
  const isExpired = Date.now() >= payload.exp * 1000;
  if (isExpired) {
    this.logout(); // Si el token ha expirado, cierra la sesión
    return false;
  }
  return true;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth']);
  }
}

