import { Injectable } from '@angular/core';
import { AppService } from '../../../../shared/services/app.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LevelsService extends AppService{

  findAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/v1/levels`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/v1/levels`, data);
  }

  update(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/v1/levels/${data.id}`, data);
  }
}
