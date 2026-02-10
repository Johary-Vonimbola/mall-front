import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ApiReponse } from '../models/apiReponse';
import { ShopRent } from '../models/shopRent';

@Injectable({
  providedIn: 'root'
})
export class ShopRentService {
  private apiUrl: string = `${environment.apiUrl}/shop-rents`;
  private http: HttpClient = inject(HttpClient);

  getFrequencies(): Observable<ApiReponse<any>>{
    return this.http.get<ApiReponse<any>>(`${this.apiUrl}/frequencies`);
  }

  save(form: any): Observable<ApiReponse<any>>{
    return this.http.post<ApiReponse<any>>(this.apiUrl, form);
  }

  update(id: string, form: any): Observable<ApiReponse<any>>{
    return this.http.put<ApiReponse<any>>(`${this.apiUrl}/${id}`, form);
  }

  getById(id: any): Observable<ShopRent>{
    return this.http.get<ApiReponse<any>>(`${this.apiUrl}/${id}`).pipe(
      map(response => {
        return response.data;
      })
    );
  }

  getAll(): Observable<ShopRent[]>{
    return this.http.get<ApiReponse<ShopRent[]>>(this.apiUrl)
    .pipe(
      map(response => {
        const result = response.data ?? [];
        return result.map((shopRent): ShopRent => {
          shopRent.dueDate = shopRent.dueDate ?? -1;
          return shopRent;
        });
      })
    );
  }

  deactivate(body: any): Observable<ApiReponse<any>>{
    return this.http.patch<ApiReponse<any>>(`${this.apiUrl}/${body._id}/d`, body);
  }

  activate(body: any): Observable<ApiReponse<any>>{
    return this.http.patch<ApiReponse<any>>(`${this.apiUrl}/${body._id}/a`, body);
  }
}
