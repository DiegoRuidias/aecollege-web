import { Injectable } from '@angular/core';
import { AppService } from '../../../../shared/services/app.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeriodsService extends AppService{
  
  findAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/v1/periods`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/v1/periods`, data);
  }

  update(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/v1/periods/${data.id}`, data);
  }
}
