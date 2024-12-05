import { Injectable, signal } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Settings } from '../api/settings.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService extends AppService{
  _config: Settings = {
    id:0,
    periodId:'',
    studentRole:'',
    employeeRole:''
  }
  private config = signal<Settings>(this._config);

  constructor() {
    super();
    this.loadFromLocalStorage();
  }

  create(data: any): Observable<Settings> {
    return this.http.post<Settings>(`${this.baseUrl}/v1/settings`, data);
  }

  private loadFromLocalStorage(): void {
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      this.config.set(JSON.parse(savedSettings));
    }
  }

  private saveToLocalStorage(settings: Settings): void {
    localStorage.setItem('settings', JSON.stringify(settings));
  }

  async fetchAndSaveSettings(): Promise<boolean> {
    try {
      const data = await this.http.get<Settings>(`${this.baseUrl}/v1/settings`).toPromise();
  
      // Validamos si `data` es definido antes de usarlo
      if (data) {
        this.config.set(data);
        this.saveToLocalStorage(data);
        return true;
      } else {
        return false; // Si data es undefined, manejamos el error adecuadamente
      }
    } catch (error) {
      return false;
    }
  }

  // fetchAndSaveSettings(): boolean {
  //   this.http.get<Settings>(`${this.baseUrl}/v1/settings`).subscribe({
  //     next: (data) => {
  //       this.config.set(data);
  //       this.saveToLocalStorage(data);
  //       return true;
  //     },
  //     error: (err) => {
  //       return false;
  //     }
  //   });
  //   return false;
  // }

  getSettings(): Settings {
    return this.config();
  }
}
