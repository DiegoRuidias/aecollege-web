import { Injectable } from '@angular/core';
import { AppService } from '../../../shared/services/app.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesPermissionsService extends AppService{

  findAll(menuId: string , roleId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/v1/roles-permissions/menus/${menuId}/${roleId}`);
  }
}
