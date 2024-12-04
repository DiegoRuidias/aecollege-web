import { Injectable } from '@angular/core';
import { AppService } from '../../../../shared/services/app.service';
import { Observable } from 'rxjs';
import { Payments } from '../model/payments.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService extends AppService{
  
  findAll(): Observable<Payments[]> {
    return this.http.get<Payments[]>(`${this.baseUrl}/v1/payments`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/v1/payments`, data);
  }

  update(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/v1/payments/${data.id}`, data);
  }

  findData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/v1/periods`);
  }
}
