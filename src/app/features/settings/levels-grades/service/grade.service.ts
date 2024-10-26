import { Injectable } from '@angular/core';
import { AppService } from '../../../../shared/services/app.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GradeService extends AppService{

  create(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/v1/grades`, data);
  }

  update(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/v1/grades/${data.id}`, data);
  }
}
