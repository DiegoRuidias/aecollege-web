import { Injectable } from '@angular/core';
import { AppService } from '../../../../shared/services/app.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService extends AppService{

  findAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/v1/employees`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/v1/employees`, data);
  }

}
