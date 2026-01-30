import { NgClass, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShopManagementService } from '../../../services/shop-management.service';
import { isInvalid } from '../../../utils/form';

@Component({
  selector: 'app-shop-category-form',
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf
  ],
  templateUrl: './shop-category-form.component.html',
  styleUrl: './shop-category-form.component.scss'
})
export class ShopCategoryFormComponent {
  private shopManagementService: ShopManagementService = inject(ShopManagementService);
  isInvalid = isInvalid;

  form = new FormGroup({
    name: new FormControl('', [Validators.required])
  });
  errors = signal<String[]>([]);

  onSubmit(): void{
    this.form.markAllAsTouched();
    if(this.form.invalid) return;
    const formValue = this.form.value;
    this.shopManagementService.createShop(formValue).subscribe({
      next: res => {
        
      },
      error: res => {
        this.errors.set(res.error.errors)
      }
    });
  }
}
