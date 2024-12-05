import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from '../../../../../shared/services/app.service';
import { Revenue } from '../model/revenues.model';

@Injectable({
  providedIn: 'root'
})
export class RevenuesService extends AppService{

  create(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/v1/revenues-detail`, data);
  }

  findAll(date?: string): Observable<Revenue[]> {
    let reqParams = {} as any;
    if (date) {
        reqParams.date = date;
    }
    return this.http.get<Revenue[]>(`${this.baseUrl}/v1/revenues`, { params: reqParams });
  }
}
