import { Injectable } from '@angular/core';
import { AppService } from '../../../../shared/services/app.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRolesService extends AppService{

  create(userId: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/v1/user-roles/${userId}`, data);
  }
  findAll(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/v1/user-roles/${userId}`);
  }
}
