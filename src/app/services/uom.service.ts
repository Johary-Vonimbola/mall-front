import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiReponse } from '../models/apiReponse';
import { environment } from '../../environment';
import { Uom } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class UomService {
  private uomUrl: string = `${environment.apiUrl}/units`;
  private http: HttpClient = inject(HttpClient);

  save(data: any): Observable<ApiReponse<Uom>>{
    return this.http.post<ApiReponse<Uom>>(this.uomUrl, data);
  }

  getAll(): Observable<Uom[]>{
    return this.http.get<ApiReponse<Uom[]>>(this.uomUrl).pipe(
      map(response => {
        return response.data ?? [];
      })
    );
  }

  getById(id: string): Observable<Uom | undefined>{
    return this.http.get<ApiReponse<Uom>>(`${this.uomUrl}/${id}`).pipe(
      map(response => {
        return response.data ?? undefined;
      })
    );
  }

  update(id: string, payload: any): Observable<ApiReponse<any>>{
    return this.http.put<ApiReponse<any>>(`${this.uomUrl}/${id}`, payload);
  }

  delete(id: string): Observable<ApiReponse<any>>{
    return this.http.delete<ApiReponse<any>>(`${this.uomUrl}/${id}`);
  }
}
