import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { LoginResponse } from '../../../models/authentication';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { isInvalid } from '../../../utils/form';
import { set } from '../../../utils/localStorage';
import { User } from '../../../models/User';
import { ShopManagementService } from '../../../services/shop-management.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService: AuthenticationService = inject(AuthenticationService);
  private router: Router = inject(Router);
  private shopService: ShopManagementService = inject(ShopManagementService);
  isInvalid = isInvalid;

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  errors = signal<string[]>([]);

  onSignup(): void{
    this.router.navigateByUrl('register');
  }

  setShopIfAdmin(user: User): void{
    this.authService.currentUser.set(user);
    if(user.role === 'SHOP_ADMIN'){
      this.shopService.getShopByIdUser(user.id).subscribe(shop => {
        this.authService.currentShop.set(shop);
        set('current_shop', JSON.stringify(shop))
        this.router.navigateByUrl('admin-shop/products');
      });
    }else{
      if(user.role === 'MALL_ADMIN'){
        this.router.navigateByUrl('admin/shops');
      }else{
        this.router.navigateByUrl('shops');
      }
    }
  }

  onSubmit(): void{
    this.form.markAllAsTouched();
    if(this.form.invalid) return;
    const formValue = this.form.value;
    this.authService.login(formValue).subscribe({
      next: res => {
        const loginReponse: LoginResponse | undefined = res.data;
        if(loginReponse){
          this.authService.setToken({
            accessToken: loginReponse.accessToken,
            refreshToken: loginReponse.refreshToken
          });
          set('refresh_token', loginReponse.refreshToken);
          const payload = loginReponse.accessToken.split('.')[1];
          const content = JSON.parse(atob(payload));
          const user = new User(content.id, content.name, content.role);
          this.setShopIfAdmin(user);
        }
      },
      error: res => {
        this.errors.set(res.error.errors)
      }
    });
  }
}
