import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { MenuChangeEvent } from '../api/menuchangeevent';
import { AppService } from '../../services/app.service';
import { MenusService } from '../../../features/system/menus/service/menus.service';


@Injectable({
    providedIn: 'root'
})
export class MenuService  extends AppService {
  menusService = inject(MenusService);
  constructor() {
    super();
    const storedMenus = localStorage.getItem('menus');
    if (storedMenus) {
      // Si los menús están en localStorage, los cargamos
      this.menusSubject.next(JSON.parse(storedMenus));
    }
  }
  private menusSubject = new BehaviorSubject<any[]>([]);

  private menuSource = new Subject<MenuChangeEvent>();
  private resetSource = new Subject();
  // Observable para que los componentes puedan subscribirse
  menus$ = this.menusSubject.asObservable();

  // Método para cargar los menús desde la API
  loadMenus(personId: number): void {
    if (this.menusSubject.value.length === 0) {
      this.menusService.findAllByTypePerson(personId).subscribe({
        next:(data) => {
            this.menusSubject.next(data);
            localStorage.setItem('menus', JSON.stringify(data));
        },
        error:(err) => {
            
        },
      })
    }
  }

  getMenus(): Observable<any[]> {
    return this.menus$;
  }

  clearMenus() {
    localStorage.removeItem('menus');
    this.menusSubject.next([]);
  }

  menuSource$ = this.menuSource.asObservable();
  resetSource$ = this.resetSource.asObservable();

  onMenuStateChange(event: MenuChangeEvent) {
      this.menuSource.next(event);
  }

  reset() {
      this.resetSource.next(true);
  }
}
