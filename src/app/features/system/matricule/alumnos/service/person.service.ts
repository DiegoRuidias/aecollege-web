import { Injectable } from '@angular/core';
import { AppService } from '../../../../../shared/services/app.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService extends AppService{
  findByDocumentNumber(documentNumber: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/v1/person/document-number/${documentNumber}`);
  }
}
