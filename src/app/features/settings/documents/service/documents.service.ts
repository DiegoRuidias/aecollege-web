import { Injectable } from '@angular/core';
import { AppService } from '../../../../shared/services/app.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService extends AppService{
  findAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/v1/documents`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/v1/documents`, data);
  }

  updateDeletedAt(id: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/v1/documents/${id}`,[]);
  }
}
