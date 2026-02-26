import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiReponse } from '../models/apiReponse';
import { Product, ProductCategory } from '../models/product';
import { environment } from '../../environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl: string = `${environment.apiUrl}/products`;
  private productCategoryUrl: string = `${environment.apiUrl}/product-categories`;
  private http: HttpClient = inject(HttpClient);
  private authService: AuthenticationService = inject(AuthenticationService);
  
  saveProductCategory(data: any): Observable<ApiReponse<Product>>{
    return this.http.post<ApiReponse<Product>>(this.productCategoryUrl, data);
  }

  getAllProductCategory(shopId: string): Observable<ProductCategory[]>{
    return this.http.get<ApiReponse<ProductCategory[]>>(`${this.productCategoryUrl}/shops/${shopId}`).pipe(
      map(response => {
        return response.data ?? [];
      })
    );
  }

  deleteProductCategory(id: string): Observable<ApiReponse<any>>{
    return this.http.delete<ApiReponse<any>>(`${this.productCategoryUrl}/${id}`);
  }

  updateProductCategory(id: string, payload: any): Observable<ApiReponse<any>>{
    return this.http.put<ApiReponse<any>>(`${this.productCategoryUrl}/${id}`, payload);
  }

  uploadLogoproduct(id: string, payload: any) {
    return this.http.post<ApiReponse<any>>(
      `${this.productUrl}/${id}/upload`,
      payload
    );
  }

  getProductCategoryById(id: string): Observable<ProductCategory | undefined>{
    return this.http.get<ApiReponse<ProductCategory>>(`${this.productCategoryUrl}/${id}`).pipe(
      map(response => {
        return response.data ?? undefined;
      })
    );
  }

  save(data: FormData): Observable<ApiReponse<Product>>{
    return this.http.post<ApiReponse<Product>>(this.productUrl, data);
  }
  getAll(): Observable<Product[]>{
    const shopId = this.authService.currentShop()?.id;
    return this.http.get<ApiReponse<Product[]>>(`${this.productUrl}/${shopId}`).pipe(
      map(response => {
        return response.data ?? [];
      })
    );
  }
  getById(id: string): Observable<Product | undefined>{
    const shopId = this.authService.currentShop()?.id;
    return this.http.get<ApiReponse<Product>>(`${this.productUrl}/${shopId}/${id}`).pipe(
      map(response => {
        return response.data ?? undefined;
      })
    );
  }

  update(id: string, payload: any): Observable<ApiReponse<any>>{
    return this.http.put<ApiReponse<any>>(`${this.productUrl}/${id}`, payload);
  }

  activate(id: string): Observable<ApiReponse<any>>{
    return this.http.patch<ApiReponse<any>>(`${this.productUrl}/${id}/activate`, {});
  }

  deactivate(id: string): Observable<ApiReponse<any>>{
    return this.http.patch<ApiReponse<any>>(`${this.productUrl}/${id}/deactivate`, {});
  }

}
