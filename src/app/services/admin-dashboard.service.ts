import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';
import { ApiReponse } from '../models/apiReponse';
import { AdminDashboard } from '../models/adminDashboard';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
  private http: HttpClient = inject(HttpClient);
  private apiUrl: string = `${environment.apiUrl}/dashboard`;

  getDashboard(year?: number): Observable<ApiReponse<AdminDashboard>> {

    let url = this.apiUrl;

    if(year){
      url += `?year=${year}`;
    }

    return this.http.get<ApiReponse<AdminDashboard>>(url);
  }
}
