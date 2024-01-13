import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompaniesInfoService {
  private baseUrl = 'http://localhost:52001/visite/list-sp500-company';
  constructor(private http: HttpClient) { }

  fetchCompaniesInfo(): Observable<any> {
    return this.http.get(`${this.baseUrl}`, {responseType: 'text'});
  }
}
