import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../services/app.service';
import { Observable } from 'rxjs';
import { JwtToken } from '../model/jwtToken.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends AppService {
  private router = inject(Router);

  private readonly tokenSignal = signal<string | null>(null);
  private readonly userSignal = signal<string | null>(null);

  readonly currentUser = computed(() => this.userSignal());

  login(credentials: any): Observable<JwtToken> {
    return this.http.post<JwtToken>(`${this.baseUrl}/v1/auth/login`, credentials);
  }

  saveToken(token: string): void {
    this.tokenSignal.set(token);
  }

  getToken(): string | null {
    return this.tokenSignal();
  }

  private decodeToken(): any {
    const token = this.getToken();
    if (!token) return null;
    
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      this.logout();
      return null;
    }
  }

  getRole(): number {
    const payload = this.decodeToken();
    return payload?.role ?? 6;
  }

  getName(): string {
    const payload = this.decodeToken();
    return payload?.name ?? 'INVITADO';
  }

  getUser(): string {
    const payload = this.decodeToken();
    return payload?.sub ?? '';
  }

  getUserId(): number {
    const payload = this.decodeToken();
    return payload?.userId ?? 1;
  }

  isAuthenticated(): boolean {
    const payload = this.decodeToken();
    if (!payload) return false;

    const isExpired = Date.now() >= payload.exp * 1000;
    if (isExpired) {
      this.logout();
      return false;
    }
    return true;
  }

  logout(): void {
    this.tokenSignal.set(null);
    this.router.navigate(['/auth']);
  }
}

