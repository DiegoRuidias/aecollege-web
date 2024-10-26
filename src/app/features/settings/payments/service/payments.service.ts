import { Injectable } from '@angular/core';
import { AppService } from '../../../../shared/services/app.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService extends AppService{
  
  findAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/v1/payments`);
  }
}
