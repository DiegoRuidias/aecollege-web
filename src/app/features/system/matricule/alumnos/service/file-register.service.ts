import { Injectable } from '@angular/core';
import { AppService } from '../../../../../shared/services/app.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileRegisterService extends AppService{

  create(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/v1/fileRegister`, data);
  }

  findAll(page: number, size: number, periodId: string, searchText?: string): Observable<any[]> {
    let reqParams = {} as any;
    reqParams.page = page;
    reqParams.size = size;
    reqParams.periodId = periodId
    if (searchText) {
        reqParams.searchText = searchText;
    }
    return this.http.get<any[]>(`${this.baseUrl}/v1/fileRegister`, { params: reqParams });
  }

  findById(id: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/v1/fileRegister/${id}`);
  }
}
