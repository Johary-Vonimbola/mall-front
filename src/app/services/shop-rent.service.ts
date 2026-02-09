import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiReponse } from '../models/apiReponse';

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

}
