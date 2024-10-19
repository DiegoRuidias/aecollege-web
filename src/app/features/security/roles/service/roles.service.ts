import { Injectable } from '@angular/core';
import { AppService } from '../../../../shared/services/app.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService extends AppService{

  create(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/v1/roles`, data);
  }

  update(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/v1/roles/${data.id}`, data);
  }

  updateIsActive(id: string, isActive: boolean): Observable<any> {
    return this.http.patch(`${this.baseUrl}/v1/roles/${id}/${isActive}`,[]);
  }

  findAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/v1/roles`);
  }

}
