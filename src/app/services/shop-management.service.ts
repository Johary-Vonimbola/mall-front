import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ApiReponse } from '../models/apiReponse';
import { ShopCategoryResponse, ShopResponse } from '../models/shop';

@Injectable({
  providedIn: 'root'
})
export class ShopManagementService {
  private apiUrl: String = `${environment.apiUrl}`;
  private http: HttpClient = inject(HttpClient);

  getAllShop(): Observable<ShopResponse[]> {
    return this.http.get<ApiReponse<any>>(`${this.apiUrl}/shops`)
      .pipe(
        map(response =>
          (response.data ?? []).map((shop: any): ShopResponse => ({
            id: shop._id,
            name: shop.name,
            isActive: shop.isActive,
            category: shop.category,
            categoryId: shop.categoryId,
            logo: shop.logo ?? ''
          }))
        )
      );
  }

  getShopById(id: string): Observable<ShopResponse> {
    return this.http
      .get<ApiReponse<any>>(`${this.apiUrl}/shops/${id}`)
      .pipe(
        map(response => {
          const shop = response.data;

          return {
            id: shop._id,
            name: shop.name,
            isActive: shop.isActive,
            category: shop.category,
            categoryId: shop.categoryId,
            logo: shop.logo ?? ''
          };
        })
      );
  }

  getShopByIdUser(id: string): Observable<ShopResponse> {
    return this.http
      .post<ApiReponse<any>>(`${this.apiUrl}/shops/admin`, { idUser: id })
      .pipe(
        map(response => {
          const shop = response.data;

          return {
            id: shop._id,
            name: shop.name,
            isActive: shop.isActive,
            category: shop.category,
            categoryId: shop.categoryId,
            logo: shop.logo ?? ''
          };
        })
      );
  }


  createShop(payload: any): Observable<ApiReponse<any>> {
    return this.http.post<ApiReponse<any>>(
      `${this.apiUrl}/shops`,
      payload
    );
  }

  updateShop(id: string, payload: any) {
    return this.http.put<ApiReponse<any>>(
      `${this.apiUrl}/shops/${id}`,
      payload
    );
  }

  deleteShop(id: string): Observable<ApiReponse<any>> {
    return this.http.delete<ApiReponse<any>>(
      `${this.apiUrl}/shops/${id}`
    );
  }
  
  activateShop(id: string): Observable<ApiReponse<any>> {
    return this.http.patch<ApiReponse<any>>(
      `${this.apiUrl}/shops/${id}/activate`,
      {}
    );
  }

  deactivateShop(id: string): Observable<ApiReponse<any>> {
    return this.http.patch<ApiReponse<any>>(
      `${this.apiUrl}/shops/${id}/deactivate`,
      {}
    );
  }

  uploadLogoShop(id: string, payload: any) {
    return this.http.post<ApiReponse<any>>(
      `${this.apiUrl}/shops/${id}/upload`,
      payload
    );
  }

  getAllShopCategory(): Observable<ShopCategoryResponse[]> {
    return this.http.get<ApiReponse<any>>(`${this.apiUrl}/shop-categories`)
      .pipe(
        map(response =>
          (response.data ?? []).map((shopCategory: any): ShopCategoryResponse => ({
            id: shopCategory._id,
            name: shopCategory.name
          }))
        )
      );
  }

  getShopCategoryById(id: string): Observable<ShopCategoryResponse> {
    return this.http
      .get<ApiReponse<any>>(`${this.apiUrl}/shop-categories/${id}`)
      .pipe(
        map(response => {
          const category = response.data;

          return {
            id: category._id,
            name: category.name
          };
        })
      );
  }


  updateShopCategory(id: string, payload: any) {
    return this.http.put<ApiReponse<any>>(
      `${this.apiUrl}/shop-categories/${id}`,
      payload
    );
  }

  createCategoryShop(payload: any): Observable<ApiReponse<any>> {
    return this.http.post<ApiReponse<any>>(
      `${this.apiUrl}/shop-categories`,
      payload
    );
  }

  deleteCategoryShop(id: string): Observable<ApiReponse<any>> {
    return this.http.delete<ApiReponse<any>>(
      `${this.apiUrl}/shop-categories/${id}`
    );
  }
}
