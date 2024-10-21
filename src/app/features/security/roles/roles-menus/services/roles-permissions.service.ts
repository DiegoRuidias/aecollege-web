import { Injectable } from '@angular/core';
import { AppService } from '../../../../../shared/services/app.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesPermissionsService extends AppService {

  create(roleId: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/v1/roles-permissions/${roleId}`, data);
  }
  findAll(menuId: string , roleId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/v1/roles-permissions/menus/${menuId}/${roleId}`);
  }
}
