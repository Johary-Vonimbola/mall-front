import { NgClass, NgIf } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShopManagementService } from '../../../services/shop-management.service';
import { isInvalid } from '../../../utils/form';
import { ShopCategoryResponse } from '../../../models/shop';

@Component({
  selector: 'app-shop-form',
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf
  ],
  templateUrl: './shop-form.component.html',
  styleUrl: './shop-form.component.scss'
})
export class ShopFormComponent implements OnInit {
  private shopManagementService: ShopManagementService = inject(ShopManagementService);
  isInvalid = isInvalid;

  categories: ShopCategoryResponse[] = [];

  ngOnInit(): void {
    this.shopManagementService.getAllShopCategory().subscribe({
      next: (shopCategories) => {
        this.categories = shopCategories;
      },
      error: () => {
        console.error('Erreur lors du chargement des catégories');
      }
    });
  }

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    categoryId: new FormControl('', [Validators.required])
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
