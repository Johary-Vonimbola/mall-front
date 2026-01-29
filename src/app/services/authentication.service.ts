import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { ApiReponse, LoginResponse } from '../models/authentication';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl: String = `${environment.apiUrl}`;
  private http: HttpClient = inject(HttpClient);

  login(formValue: Object): Observable<ApiReponse<LoginResponse>>{
    return <Observable<ApiReponse<LoginResponse>>> this.http.post(`${this.apiUrl}/login`, formValue);
  }
}
