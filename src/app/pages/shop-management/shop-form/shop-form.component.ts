import { NgClass, NgIf } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShopManagementService } from '../../../services/shop-management.service';
import { isInvalid } from '../../../utils/form';
import { ShopCategoryResponse, ShopResponse } from '../../../models/shop';
import { Router } from '@angular/router';

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
  private router: Router = inject(Router);
  isInvalid = isInvalid;

  categories: ShopCategoryResponse[] = [];

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    categoryId: new FormControl('', [Validators.required])
  });

  errors = signal<String[]>([]);

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

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const categoryId = this.form.value.categoryId;

    const category = this.categories.find(
      cat => cat.id === categoryId
    );

    const payload = {
      name: this.form.value.name,
      category: category?.name,
      categoryId: categoryId
    };

    this.shopManagementService.createShop(payload).subscribe({
      next: res => {
        alert(res.message);
        this.router.navigateByUrl('admin/shops');
      },
      error: res => {
        this.errors.set(res.error.errors);
      }
    });
  }
}
