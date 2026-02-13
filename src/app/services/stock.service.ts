import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environment';
import { StockMove, StockMoveLine, StockResponse } from '../models/Stock';
import { ApiReponse } from '../models/apiReponse';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private http: HttpClient = inject(HttpClient);
  private apiUrl: string = `${environment.apiUrl}/stock-moves`;

  save(data: any): Observable<StockResponse | undefined>{
    return this.http.post<ApiReponse<StockResponse>>(this.apiUrl, data).pipe(
      map(res => {
        return res.data ?? undefined;
      })
    )
  }

  getStockMoves(shopId: string): Observable<StockMove[]>{
    return this.http.get<ApiReponse<StockMove[]>>(`${this.apiUrl}/${shopId}`).pipe(
      map(res => {
        return res.data ?? []
      })
    )
  }

  getStockMoveLines(parentId: string): Observable<StockMoveLine[]>{
    return this.http.get<ApiReponse<StockMoveLine[]>>(`${this.apiUrl}/${parentId}/lines`).pipe(
      map(res => res.data ?? [])
    );
  }

  getStockMoveLinesByProduct(productId: string): Observable<StockMoveLine[]>{
    return this.http.get<ApiReponse<StockMoveLine[]>>(`${this.apiUrl}/product/${productId}/lines`).pipe(
      map(res => res.data ?? [])
    );
  }
}
