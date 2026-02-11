import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { LoginResponse } from '../models/authentication';
import { ApiReponse } from '../models/apiReponse';
import { Router } from '@angular/router';
import { clear, get, set } from '../utils/localStorage';
import { ShopResponse } from '../models/shop';
import { User } from '../models/User';
import { getCurrentShop, getUser } from '../utils/userUtils';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl: string = `${environment.apiUrl}`;
  private http: HttpClient = inject(HttpClient);
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private router: Router = inject(Router);
  public currentUser = signal<User|null>(getUser());
  public currentShop = signal<ShopResponse|null>(getCurrentShop());

  setToken({ accessToken, refreshToken }: { accessToken: string, refreshToken: string}): void{
    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);
  }

  setAccessToken(accessToken: string): void{
    this.accessToken = accessToken;
    set('access_token', accessToken);
  }
  setRefreshToken(refreshToken: string): void{
    this.refreshToken = refreshToken;
  }
  getToken(): any{
    return {
      accessToken: get('access_token'),
      refreshToken: this.refreshToken
    }
  }
  getAccessToken(): string | null{
    return get('access_token');
  }
  getRefreshToken(): string | null{
    return this.refreshToken;
  }

  clear(): void{
    this.accessToken = null;
    this.refreshToken = null;
    clear();
  }

  refreshTokenFn(): void{
    (<Observable<ApiReponse<string>>>this.http.post(`${this.apiUrl}/refresh-token`, { refreshToken: get('refresh_token') })).subscribe({
      next: res => {
        if(res.data){
          this.setAccessToken(res.data)
        }
      },
      error: res => {
        this.router.navigateByUrl('login');
      }
    })
  }

  login(formValue: Object): Observable<ApiReponse<LoginResponse>>{
    return <Observable<ApiReponse<LoginResponse>>> this.http.post(`${this.apiUrl}/login`, formValue);
  }

  register(formValue: Object): Observable<ApiReponse<any>>{
    return <Observable<ApiReponse<any>>> this.http.post(`${this.apiUrl}/users`, formValue);
  }
}
