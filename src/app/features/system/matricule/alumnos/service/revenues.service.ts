import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from '../../../../../shared/services/app.service';

@Injectable({
  providedIn: 'root'
})
export class RevenuesService extends AppService{

  create(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/v1/revenues`, data);
  }
}
