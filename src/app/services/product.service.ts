import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiReponse } from '../models/apiReponse';
import { Product, ProductCategory } from '../models/product';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl: string = `${environment.apiUrl}/products`;
  private productCategoryUrl: string = `${environment.apiUrl}/product-categories`;
  private http: HttpClient = inject(HttpClient);
  
  saveProductCategory(data: any): Observable<ApiReponse<Product>>{
    return this.http.post<ApiReponse<Product>>(this.productCategoryUrl, data);
  }

  getAllProductCategory(): Observable<ProductCategory[]>{
    return this.http.get<ApiReponse<ProductCategory[]>>(this.productCategoryUrl).pipe(
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

  getProductCategoryById(id: string): Observable<ProductCategory | undefined>{
    return this.http.get<ApiReponse<ProductCategory>>(`${this.productCategoryUrl}/${id}`).pipe(
      map(response => {
        return response.data ?? undefined;
      })
    );
  }
}
