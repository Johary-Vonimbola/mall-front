import { NgClass, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShopManagementService } from '../../../services/shop-management.service';
import { isInvalid } from '../../../utils/form';
import { Router } from '@angular/router';
import { BackComponent } from '../../../components/back/back.component';

@Component({
  selector: 'app-shop-category-form',
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf,
    BackComponent
  ],
  templateUrl: './shop-category-form.component.html',
  styleUrl: './shop-category-form.component.scss'
})
export class ShopCategoryFormComponent {
  private shopManagementService: ShopManagementService = inject(ShopManagementService);
  private router: Router = inject(Router);
  isInvalid = isInvalid;

  form = new FormGroup({
    name: new FormControl('', [Validators.required])
  });
  errors = signal<String[]>([]);

  onSubmit(): void{
    this.form.markAllAsTouched();
    if(this.form.invalid) return;
    const formValue = this.form.value;
    this.shopManagementService.createCategoryShop(formValue).subscribe({
      next: res => {
        alert(res.message);
        this.router.navigateByUrl('admin/shopCategories');
      },
      error: res => {
        this.errors.set(res.error.errors);
      }
    });
  }
}
