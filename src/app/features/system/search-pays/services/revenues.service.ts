import { Injectable } from '@angular/core';
import { AppService } from '../../../../shared/services/app.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RevenuesService extends AppService{
  findAll(date: string): Observable<any> {
    let reqParams = {} as any;
    if (date) {
        reqParams.date = date;
    }
    return this.http.get<any>(`${this.baseUrl}/v1/revenues`, { params: reqParams });
  }
}
