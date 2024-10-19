import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  protected readonly http = inject(HttpClient)

  protected readonly baseUrl: string = "http://localhost:8080/api"

  constructor() { }
  
}
