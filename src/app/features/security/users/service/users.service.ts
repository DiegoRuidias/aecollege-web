import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from '../../../../shared/services/app.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends AppService{
  
  findAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/v1/users`);
  }
  
  create(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/v1/users`, data);
  }

  updateIsActive(id: string, isActive: boolean): Observable<any> {
    return this.http.patch(`${this.baseUrl}/v1/users/${id}/${isActive}`,[]);
  }

  updatePassword(data: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/v1/users/password`,data);
  }
  
  update(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/v1/users/${data.id}`, data);
  }
}
