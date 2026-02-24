import { computed, inject, Injectable, signal } from '@angular/core';
import { Cart, CartDetail } from '../models/Cart';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ApiReponse } from '../models/apiReponse';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl: string = `${environment.apiUrl}/cart`;
  private http: HttpClient = inject(HttpClient);

  // ================= GLOBAL STATE =================
  private _cart = signal<Cart | null>(null);
  cart = computed(() => this._cart());

  nbArticle = computed(() => {
    const cart = this._cart();
    if (!cart) return 0;
    return cart.nbArticles;
  });

  setCart(cart: Cart) {
    this._cart.set(cart);
  }

  clearCart() {
    this._cart.set(null);
  }

  getCart(id: string): Observable<ApiReponse<Cart>> {
    return this.http.get<ApiReponse<Cart>>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(res => this._cart.set(res.data ?? null))
      );
  }

  deleteCart(id: string): Observable<ApiReponse<any>> {
    this.clearCart();
    return this.http.delete<ApiReponse<any>>(`${this.apiUrl}/${id}`);
  }

  save(cart: Cart): Observable<ApiReponse<Cart>> {
    return this.http.post<ApiReponse<Cart>>(this.apiUrl, cart)
      .pipe(
        tap(res => this._cart.set(res.data ?? null))
      );
  }

  addProduct(cartId: string, product: CartDetail): Observable<ApiReponse<Cart>> {
    return this.http.post<ApiReponse<Cart>>(`${this.apiUrl}/${cartId}/product`, product)
      .pipe(
        tap(res => this._cart.set(res.data ?? null))
      );
  }

  updateQuantity(cartId: string, productId: string, detailQuantity: any): Observable<ApiReponse<Cart>> {
    return this.http.patch<ApiReponse<Cart>>(`${this.apiUrl}/${cartId}/product/${productId}`, detailQuantity)
      .pipe(
        tap(res => this._cart.set(res.data ?? null))
      );
  }

  removeProduct(cartId: string, productId: string): Observable<ApiReponse<Cart>> {
    return this.http.delete<ApiReponse<Cart>>(`${this.apiUrl}/${cartId}/product/${productId}`)
      .pipe(
        tap(res => this._cart.set(res.data ?? null))
      );
  }
}
