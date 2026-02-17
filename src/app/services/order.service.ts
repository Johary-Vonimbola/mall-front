import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment';
import { map, Observable } from 'rxjs';
import { ApiReponse } from '../models/apiReponse';
import { Order, OrderResponse } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private http : HttpClient = inject(HttpClient);
  private apiUrl : string = `${environment.apiUrl}/orders`;

  getOrders(shopId: string,clientId: string) : Observable<ApiReponse<Order[]>> {
    return this.http.get<ApiReponse<Order[]>>(`${this.apiUrl}/${shopId}/${clientId}`);
  }

  save(order : Order): Observable<ApiReponse<Order>> {
    return this.http.post<ApiReponse<Order>>(this.apiUrl, order);
  }

  getById(id: string): Observable<Order | null> {
    return this.http.get<ApiReponse<OrderResponse>>(`${this.apiUrl}/${id}`).pipe(
      map(res => {
        const result = res.data ?? null;
        let order = null;
        
        if (result) {
          order = result.order;
          order.details = result.orderDetails;
        }
        return order;
      })
    );
  }

  cancelOrder(): Observable<ApiReponse<Order>> {
    return this.http.put<ApiReponse<Order>>(this.apiUrl, {status : "CANCELED"});
  }

  deliverOrder(): Observable<ApiReponse<Order>> {
    return this.http.put<ApiReponse<Order>>(this.apiUrl, {status: "DELIVERED"});
  }

  putInProgressOrder(): Observable<ApiReponse<Order>> {
    return this.http.put<ApiReponse<Order>>(this.apiUrl, {status: "IN PROGRESS DELIVERY"});
  }
};
