import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { isInvalid } from '../../../utils/form';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { BackComponent } from "../../../components/back/back.component";

@Component({
  selector: 'app-product-category-form',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass,
    BackComponent
],
  templateUrl: './product-category-form.component.html',
  styleUrl: './product-category-form.component.scss'
})
export class ProductCategoryFormComponent {
  private router: Router = inject(Router);
  private productService: ProductService = inject(ProductService);
  private authService: AuthenticationService = inject(AuthenticationService);
  isInvalid = isInvalid;

  form = new FormGroup({
    name: new FormControl('', [Validators.required])
  });
  errors = signal<String[]>([]);

  onSubmit(): void{
    this.form.markAllAsTouched();
    if(this.form.invalid) return;
    const formValue = this.form.value;
    this.productService.saveProductCategory({...formValue, shopId: this.authService.currentShop()?.id}).subscribe({
      next: res => {
        alert(res.message);
        this.router.navigateByUrl('admin-shop/product-category-list');
      },
      error: res => {
        this.errors.set(res.error.errors);
      }
    });
  }
}
