import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompaniesInfoService {
  private baseUrl = 'https://raw.github.com/datasets/s-and-p-500-companies/main/data/constituents.csv';
  constructor(private http: HttpClient) { }

  fetchCompaniesInfo(): Observable<any> {
    return this.http.get(`${this.baseUrl}`, {responseType: 'text'});
  }
}
