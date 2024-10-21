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
}
