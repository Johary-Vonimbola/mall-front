import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';
import { ApiReponse } from '../models/apiReponse';
import { DashboardShop } from '../models/shopDashboard';

@Injectable({
  providedIn: 'root'
})
export class ShopDashboardService {

  private http: HttpClient = inject(HttpClient);
  private apiUrl: string = `${environment.apiUrl}/dashboard-shop`;

  getDashboard(shopId: string): Observable<ApiReponse<DashboardShop>> {
    return this.http.get<ApiReponse<DashboardShop>>(
      `${this.apiUrl}/${shopId}`
    );
  }
}
