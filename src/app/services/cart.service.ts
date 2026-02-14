import { inject, Injectable } from '@angular/core';
import { Cart, CartDetail } from '../models/Cart';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiReponse } from '../models/apiReponse';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl: string = `${environment.apiUrl}/cart`;
  private http: HttpClient = inject(HttpClient);

  getCart(id: string): Observable<ApiReponse<Cart>> {
    return this.http.get<ApiReponse<Cart>>(`${this.apiUrl}/${id}`);
  }

  deleteCart(id: string): Observable<ApiReponse<any>> {
    return this.http.delete<ApiReponse<any>>(`${this.apiUrl}/${id}`);
  }

  save(cart: Cart): Observable<ApiReponse<Cart>> {
    return this.http.post<ApiReponse<Cart>>(this.apiUrl, cart);
  }

  addProduct(cartId: string, product: CartDetail): Observable<ApiReponse<Cart>> {
    return this.http.post<ApiReponse<Cart>>(`${this.apiUrl}/${cartId}/product`, product);
  }

  updateQuantity(cartId: string, productId: string, detailQuantity: any): Observable<ApiReponse<Cart>> {
    return this.http.patch<ApiReponse<Cart>>(`${this.apiUrl}/${cartId}/product/${productId}`, detailQuantity );
  }

  removeProduct(cartId: string, productId: string): Observable<ApiReponse<Cart>> {
    return this.http.delete<ApiReponse<Cart>>(`${this.apiUrl}/${cartId}/product/${productId}`);
  }
}
