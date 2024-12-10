import { Injectable } from '@angular/core';
import { AppService } from '../../../../shared/services/app.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeDocumentService extends AppService{

  findAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/v1/documentType`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/v1/documentType`, data);
  }

  deleted(id: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/v1/documentType/${id}`,[]);
  }
}
