import { Injectable } from '@angular/core';
import { AppService } from '../../../../../shared/services/app.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChargesService extends AppService{
  findPays(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/v1/charges/pays/${id}`);
  }
  findcharges(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/v1/charges/${id}`);
  }
}
