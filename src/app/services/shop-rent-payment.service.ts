import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ShopRentPayment } from '../models/shopRent';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { AuthenticationService } from './authentication.service';
import { ApiReponse } from '../models/apiReponse';

@Injectable({
  providedIn: 'root'
})
export class ShopRentPaymentService {
  private apiUrl = `${environment.apiUrl}/rent-payments`;
  private http: HttpClient = inject(HttpClient);
  private authService: AuthenticationService = inject(AuthenticationService);

  constructor() { }

  getAll(year: number): Observable<ShopRentPayment[]>{
    const shopId = this.authService.currentShop()?.id;
    return this.http.get<ApiReponse<ShopRentPayment[]>>(`${this.apiUrl}/${shopId}/${year}`).pipe(
      map(res => {
        return res.data ?? []
      })
    );
  }

  create(data: any): Observable<ApiReponse<ShopRentPayment>>{
    return this.http.post<ApiReponse<ShopRentPayment>>(this.apiUrl, data);
  }


  update(id: string, data: any): Observable<ApiReponse<ShopRentPayment>>{
    return this.http.put<ApiReponse<ShopRentPayment>>(`${this.apiUrl}/${id}`, data);
  }
}
