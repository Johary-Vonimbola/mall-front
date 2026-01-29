import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { isInvalid } from '../../../utils/form';
import { NgClass, NgIf } from '@angular/common';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { CheckMarkComponent } from '../../../components/check-mark/check-mark.component';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf,
    CheckMarkComponent
],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private authService: AuthenticationService = inject(AuthenticationService);
  private router: Router = inject(Router);

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    contact: new FormControl('', [Validators.required]),
    passwordHash: new FormControl('', [Validators.required])
  });

  isInvalid = isInvalid;
  errors = signal<string[]>([]);
  accountCreated = signal<boolean>(false);

  onLogin(): void{
    this.router.navigateByUrl('login');
  }

  onSubmit(): void{
    this.form.markAllAsTouched();
    if(this.form.invalid) return;

    this.authService.register(this.form.value).subscribe({
      next: res => {
        this.accountCreated.set(true);
        setTimeout(() => {
          this.router.navigateByUrl('login');
        }, Math.random() * (3000 - 1500) + 1500)
      },
      error: res => {
        this.errors.set(res.error.errors);
      }
    });
  }
}
