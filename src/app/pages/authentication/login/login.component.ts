import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { set } from '../../../utils/localStorage';
import { LoginResponse } from '../../../models/authentication';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';

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

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  errors = signal<string[]>([]);

  isInvalid(field: FormControl): boolean{
    return field.invalid && (field.touched || field.dirty);
  }

  onSubmit(): void{
    this.form.markAllAsTouched();
    if(this.form.invalid){
      return;
    }
    const formValue = this.form.value;
    this.authService.login(formValue).subscribe({
      next: res => {
        const loginReponse: LoginResponse | undefined = res.data;
        if(loginReponse){
          set('access_token', loginReponse.accessToken);
          set('refresh_token', loginReponse.refreshToken);
          this.router.navigateByUrl('shop-list');
        }
      },
      error: res => {
        this.errors.set(res.error.errors)
      }
    });
  }
}
